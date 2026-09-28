import { NextResponse } from 'next/server';
import { getDb, isDbConfigured } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cleanEmail = (body.email || '').trim().toLowerCase();
    const cleanPassword = (body.password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 });
    }

    if (!isDbConfigured()) {
      return NextResponse.json({
        success: true,
        user: {
          id: 'usr-local',
          email: cleanEmail,
          name: cleanEmail.includes('marcos') ? 'Marcos Antonio' : 'Vendedor VIP',
          role: 'admin'
        }
      });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT id, email, password_hash, name, role, created_at 
      FROM users 
      WHERE LOWER(email) = ${cleanEmail}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }

    const user = rows[0];
    if (user.password_hash !== cleanPassword) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (err: any) {
    console.error('Login API error:', err);
    return NextResponse.json({ error: err.message || 'Erro interno no servidor' }, { status: 500 });
  }
}
