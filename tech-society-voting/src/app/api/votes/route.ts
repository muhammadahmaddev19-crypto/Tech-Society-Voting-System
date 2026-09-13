import { NextResponse } from "next/server";
import { castVote } from "@/actions/votes";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await castVote(body.voterId, body.projectId);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
