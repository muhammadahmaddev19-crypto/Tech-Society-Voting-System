"use client";

import { useState } from "react";
import { castVote } from "@/actions/votes";
import { Check, Vote } from "lucide-react";

export default function VoteButton({voterId,projectId,disabled,alreadyVoted,onVoted}:{voterId?:string;projectId:string;disabled?:boolean;alreadyVoted?:boolean;onVoted?:()=>void}) {
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");
  const vote = async () => {
    if(!voterId || disabled || busy) return;
    setBusy(true); setError("");
    const result=await castVote(voterId,projectId);
    if(!result.ok) setError(result.error || "Vote failed.");
    else onVoted?.();
    setBusy(false);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:5}}>
    <button className="btn btn-primary btn-small" disabled={!voterId || disabled || busy} onClick={vote}>
      {alreadyVoted ? <><Check size={13}/> Vote Locked</> : <><Vote size={13}/> {busy ? "Submitting..." : "Vote"}</>}
    </button>
    {error && <span style={{fontSize:9,color:"#ff8197"}}>{error}</span>}
  </div>;
}
