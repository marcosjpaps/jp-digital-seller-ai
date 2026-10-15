import { NextResponse } from 'next/server';
import { isDbConfigured } from '@/lib/db';
import { currentSession } from '@/lib/server-auth';

// Inicialização de usuários e redefinições de senha não devem ser feitas via HTTP.
export async function GET() {
  const user = await currentSession();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
  return NextResponse.json({ success: true, databaseConfigured: isDbConfigured(), message: 'Configuração existente preservada. Nenhuma senha foi alterada.' }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST() {
  return NextResponse.json({ error: 'Inicialização remota desativada por segurança.' }, { status: 405 });
}
