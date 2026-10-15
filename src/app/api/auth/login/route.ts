import { NextResponse } from 'next/server';
import { getDb, isDbConfigured } from '@/lib/db';
import { SESSION_COOKIE, signSession } from '@/lib/session';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
function verifyPassword(input: string, stored: string): { valid: boolean; legacy: boolean } {
  if (stored.startsWith('scrypt$')) {
    const parts = stored.split('$');
    if (parts.length !== 3 || !/^[a-f0-9]{32}$/.test(parts[1]) || !/^[a-f0-9]{128}$/.test(parts[2])) return { valid: false, legacy: false };
    const candidate = scryptSync(input, Buffer.from(parts[1], 'hex'), 64);
    return { valid: timingSafeEqual(candidate, Buffer.from(parts[2], 'hex')), legacy: false };
  }
  const original = Buffer.from(stored);
  const supplied = Buffer.from(input);
  return { valid: original.length === supplied.length && timingSafeEqual(original, supplied), legacy: true };
}
function hashPassword(input: string): string {
  const salt = randomBytes(16);
  return 'scrypt$' + salt.toString('hex') + '$' + scryptSync(input, salt, 64).toString('hex');
}
const fail = () => NextResponse.json({ success: false, error: 'E-mail ou senha incorretos.' }, { status: 401 });
export async function POST(req: Request) {
  if (!isDbConfigured() || !process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    return NextResponse.json({ success: false, error: 'Autenticação indisponível. Contate o administrador.' }, { status: 503 });
  }
  try {
    const length = Number(req.headers.get('content-length') || 0);
    if (length > 4096) return NextResponse.json({ error: 'Entrada muito grande.' }, { status: 413 });
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password.trim() : '';
    if (!email || email.length > 255 || !password || password.length > 256) return fail();
    const sql = getDb();
    await sql`CREATE TABLE IF NOT EXISTS auth_login_attempts (bucket_key VARCHAR(64) PRIMARY KEY, attempts INTEGER NOT NULL, started_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
    const bucket = createHash('sha256').update(email).digest('hex');
    const counts = await sql`
      INSERT INTO auth_login_attempts (bucket_key, attempts, started_at) VALUES (${bucket}, 1, now())
      ON CONFLICT (bucket_key) DO UPDATE
      SET attempts = CASE WHEN auth_login_attempts.started_at < now() - interval '15 minutes' THEN 1 ELSE auth_login_attempts.attempts + 1 END,
          started_at = CASE WHEN auth_login_attempts.started_at < now() - interval '15 minutes' THEN now() ELSE auth_login_attempts.started_at END
      RETURNING attempts`;
    if (Number(counts[0]?.attempts) > 20) return NextResponse.json({ error: 'Muitas tentativas. Tente novamente mais tarde.' }, { status: 429 });
    const rows = await sql`SELECT id, email, password_hash, name, role FROM users WHERE LOWER(email) = ${email} LIMIT 1`;
    if (rows.length === 0) return fail();
    const user = rows[0];
    const stored = typeof user.password_hash === 'string' ? user.password_hash : '';
    const check = verifyPassword(password, stored);
    if (!check.valid) return fail();
    if (check.legacy) {
      const secureHash = hashPassword(password);
      await sql`UPDATE users SET password_hash = ${secureHash} WHERE id = ${user.id} AND password_hash = ${stored}`;
    }
    await sql`DELETE FROM auth_login_attempts WHERE bucket_key = ${bucket}`;
    const safeUser = { id: String(user.id), email: String(user.email), name: String(user.name), role: user.role === 'admin' ? 'admin' : 'seller' };
    const token = await signSession(safeUser);
    const response = NextResponse.json({ success: true, user: safeUser }, { headers: { 'Cache-Control': 'no-store' } });
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 12 * 60 * 60 });
    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Falha de autenticação. Tente novamente.' }, { status: 503 });
  }
}
