import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminToken, adminCookieName, isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { action, secret } = body;

  if (action === "login") {
    if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ ok: false, error: "Invalid admin secret." }, { status: 401 });
    }

    const store = await cookies();
    store.set(adminCookieName, createAdminToken(process.env.ADMIN_SECRET), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8
    });

    return NextResponse.json({ ok: true });
  }

  if (action === "logout") {
    const store = await cookies();
    store.delete(adminCookieName);
    return NextResponse.json({ ok: true });
  }

  if (action === "delete-project") {
    if (!(await isAdmin())) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
    const id = String(body.id);
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
}
