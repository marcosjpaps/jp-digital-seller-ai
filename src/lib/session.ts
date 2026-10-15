// Sessões assinadas no servidor. Nenhuma senha ou chave vai para o navegador.
export const SESSION_COOKIE = "jp_seller_session";
export interface SessionUser { id: string; email: string; name: string; role: string; exp: number; }
const encoder = new TextEncoder();
function encode(bytes: Uint8Array): string {
  let text = "";
  for (const byte of bytes) text += String.fromCharCode(byte);
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decode(text: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(text)) throw Error("Token inválido");
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}
async function key(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET || "";
  if (secret.length < 32) throw Error("SESSION_SECRET ausente ou inseguro");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function signSession(user: Omit<SessionUser, "exp">): Promise<string> {
  const payload: SessionUser = { ...user, exp: Date.now() + 12 * 60 * 60 * 1000 };
  const data = encode(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", await key(), encoder.encode("v1." + data));
  return "v1." + data + "." + encode(new Uint8Array(signature));
}
export async function verifySession(token: string | undefined): Promise<SessionUser | null> {
  if (!token || token.length > 4096) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || parts[0] !== "v1") return null;
    const valid = await crypto.subtle.verify("HMAC", await key(), decode(parts[2]), encoder.encode(parts[0] + "." + parts[1]));
    if (!valid) return null;
    const payload = JSON.parse(new TextDecoder().decode(decode(parts[1]))) as SessionUser;
    if (typeof payload.id !== "string" || typeof payload.email !== "string" ||
        typeof payload.name !== "string" || !["admin", "seller"].includes(payload.role) ||
        !Number.isFinite(payload.exp) || payload.exp < Date.now() || payload.exp > Date.now() + 12 * 60 * 60 * 1000) return null;
    return payload;
  } catch { return null; }
}
