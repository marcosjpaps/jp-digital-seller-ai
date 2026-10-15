import { NextResponse } from "next/server";
import { currentSession } from "@/lib/server-auth";

export async function GET() {
  const user = await currentSession();
  if (!user) return NextResponse.json({ authenticated: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json({ authenticated: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    { headers: { "Cache-Control": "no-store" } });
}
