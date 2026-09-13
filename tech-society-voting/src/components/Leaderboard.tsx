"use client";

import { useEffect, useState } from "react";
import ProjectModal from "./ProjectModal";

type Project = {
  id:string; name:string; teamName:string; description:string; imageUrl:string;
  department:string|null; semester:string|null; section:string|null;
  members:{id:string;name:string;rollNo:string;semester:string;section:string;department:string}[];
  voteCount:number;
};

export default function Leaderboard() {
  const [projects,setProjects] = useState<Project[]>([]);
  const [selected,setSelected] = useState<Project|null>(null);

  const load = async () => {
    try { setProjects(await fetch("/api/projects",{cache:"no-store"}).then(r=>r.json())); } catch {}
  };
  useEffect(()=>{ load(); const id=setInterval(load,4000); return()=>clearInterval(id)},[]);

  const top = projects.slice(0,3);
  return <>
    <div className="leaderboard">
      {top.length === 0 && <div className="panel empty" style={{gridColumn:"1/-1"}}>Projects will appear here after submission.</div>}
      {top.map((p,i)=>(
        <button className="project-card rank-card" key={p.id} onClick={()=>setSelected(p)} style={{textAlign:"left"}}>
          <span className="rank-number">{i+1}</span>
          <img className="project-image" src={p.imageUrl} alt={p.name}/>
          <div className="rank-content">
            <h3 className="project-title">{p.name}</h3>
            <div className="project-team">{p.teamName}</div>
            <div className="meta-row"><span className="tag">{p.department}</span><span className="tag">{p.semester}</span><span className="tag">{p.section}</span></div>
            <div className="vote-count"><span>{p.voteCount} votes</span><span>Rank #{i+1}</span></div>
            <div className="progress"><span style={{width:`${Math.min(100, Math.max(8, p.voteCount / Math.max(1, top[0]?.voteCount || 1) * 100))}%`}}/></div>
          </div>
        </button>
      ))}
    </div>
    {selected && <ProjectModal project={selected} onClose={()=>setSelected(null)}/>}
  </>;
}
