import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export async function currentSession() {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}
