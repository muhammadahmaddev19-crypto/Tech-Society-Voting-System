"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";

export async function createProject(input: unknown) {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid project data." };
  }

  const p = parsed.data;

  try {
    const project = await prisma.project.create({
      data: {
        name: p.name,
        teamName: p.teamName,
        description: p.description,
        imageUrl: p.imageUrl,
        department: p.department,
        semester: p.semester,
        section: p.section,
        status: "APPROVED",
        members: { create: p.members }
      }
    });

    return { ok: true, projectId: project.id };
  } catch {
    return { ok: false, error: "Could not save the project." };
  }
}
