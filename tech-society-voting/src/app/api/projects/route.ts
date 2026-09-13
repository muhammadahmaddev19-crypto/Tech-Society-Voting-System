import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: "APPROVED" },
    include: { members: true, _count: { select: { votes: true } } },
    orderBy: { createdAt: "desc" }
  });

  const data = projects
    .map(p => ({ ...p, voteCount: p._count.votes }))
    .sort((a,b) => b.voteCount - a.voteCount);

  return NextResponse.json(data);
}
