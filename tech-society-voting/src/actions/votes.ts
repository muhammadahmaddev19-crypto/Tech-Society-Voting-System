"use server";

import { prisma } from "@/lib/prisma";

export async function castVote(voterId: string, projectId: string) {
  if (!voterId || !projectId) return { ok: false, error: "Invalid vote request." };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const voter = await tx.voter.findUnique({ where: { id: voterId }, include: { vote: true } });
      if (!voter) throw new Error("Voter not found.");
      if (voter.vote) throw new Error("You have already voted. Your vote cannot be changed.");

      const project = await tx.project.findUnique({ where: { id: projectId } });
      if (!project || project.status !== "APPROVED") throw new Error("Project is not available.");

      return tx.vote.create({ data: { voterId, projectId } });
    });

    return { ok: true, voteId: result.id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Vote failed." };
  }
}
