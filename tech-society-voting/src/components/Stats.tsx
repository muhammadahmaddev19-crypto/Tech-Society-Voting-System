"use client";

import { useEffect, useState } from "react";
import { Boxes, Users, Vote } from "lucide-react";

type StatsData = { projects:number; participants:number; votes:number };

export default function Stats() {
  const [stats, setStats] = useState<StatsData>({projects:0,participants:0,votes:0});

  useEffect(() => {
    const load = async () => {
      try { setStats(await fetch("/api/stats", {cache:"no-store"}).then(r=>r.json())); } catch {}
    };
    load();
    const id = setInterval(load, 4000);
    return () => clearInterval(id);
  }, []);

  const cards = [
    [Boxes, "Total Projects", stats.projects],
    [Users, "Total Participants", stats.participants],
    [Vote, "Total Votes", stats.votes]
  ] as const;

  return <div className="stats-grid">{cards.map(([Icon,label,value]) =>
    <div className="stat-card" key={label}>
      <div className="stat-icon"><Icon size={21}/></div>
      <div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div>
    </div>
  )}</div>;
}
