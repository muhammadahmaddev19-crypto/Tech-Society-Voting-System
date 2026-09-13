import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "admin_token";

export function createAdminToken(secret: string) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export async function isAdmin() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const store = await cookies();
  return store.get(COOKIE)?.value === createAdminToken(secret);
}

export const adminCookieName = COOKIE;
