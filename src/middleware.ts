import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const user = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  const isApi = path.startsWith("/api/");
  const isLogin = path === "/auth" || path.startsWith("/api/auth/login");
  if (isApi && !["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const origin = req.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).host !== req.nextUrl.host) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
      } catch { return NextResponse.json({ error: "Origem inválida." }, { status: 403 }); }
    }
  }
  if (isLogin) return NextResponse.next();
  if (!user) {
    if (isApi) return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"] };
