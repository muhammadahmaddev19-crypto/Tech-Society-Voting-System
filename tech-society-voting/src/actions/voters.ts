"use server";

import { prisma } from "@/lib/prisma";
import { voterSchema } from "@/lib/validation";

export async function registerVoter(input: unknown) {
  const parsed = voterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid voter details." };
  }

  const v = parsed.data;
  const rollNo = v.rollNo.toUpperCase();

  try {
    const existing = await prisma.voter.findUnique({ where: { rollNo } });
    if (existing?.vote) {
      return { ok: false, error: "This roll number has already voted." };
    }

    const voter = await prisma.voter.upsert({
      where: { rollNo },
      update: { name: v.name, semester: v.semester, department: v.department, section: v.section },
      create: { ...v, rollNo }
    });

    return { ok: true, voterId: voter.id };
  } catch {
    return { ok: false, error: "Could not register voter." };
  }
}
