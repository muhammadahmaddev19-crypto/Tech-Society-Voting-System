import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [projects, voters, votes] = await Promise.all([
    prisma.project.count({ where: { status: "APPROVED" } }),
    prisma.voter.count(),
    prisma.vote.count()
  ]);
  return NextResponse.json({ projects, participants: voters, votes, updatedAt: new Date().toISOString() });
}
