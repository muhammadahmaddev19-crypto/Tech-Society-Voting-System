"use client";

import { useState } from "react";
import ProjectModal from "./ProjectModal";
import VoteButton from "./VoteButton";

export type ProjectData = {
  id:string; name:string; teamName:string; description:string; imageUrl:string;
  department:string|null; semester:string|null; section:string|null;
  members:{id:string;name:string;rollNo:string;semester:string;section:string;department:string}[];
  voteCount:number;
};

export default function ProjectCard({project, voterId, votedProjectId, onVoted}:{project:ProjectData;voterId?:string;votedProjectId?:string;onVoted:()=>void}) {
  const [open,setOpen]=useState(false);
  return <>
    <article className="project-card">
      <button onClick={()=>setOpen(true)} style={{display:"block",width:"100%",padding:0,border:0,background:"none",color:"inherit",textAlign:"left"}}>
        <img className="project-image" src={project.imageUrl} alt={project.name}/>
      </button>
      <div className="card-body">
        <h3 className="project-title">{project.name}</h3>
        <div className="project-team">{project.teamName}</div>
        <div className="meta-row">
          <span className="tag">{project.department}</span><span className="tag">{project.semester}</span><span className="tag">{project.section}</span>
          <span className="tag">{project.members.length} members</span>
        </div>
        <p style={{color:"#7f93aa",fontSize:12,lineHeight:1.55,minHeight:38}}>{project.description}</p>
        <div className="vote-count"><span>{project.voteCount} votes</span></div>
        <div className="progress"><span style={{width:`${Math.min(100,project.voteCount*4+8)}%`}}/></div>
        <div className="card-actions">
          <button className="btn btn-small" onClick={()=>setOpen(true)}>View</button>
          <VoteButton voterId={voterId} projectId={project.id} disabled={!voterId || !!votedProjectId} alreadyVoted={!!votedProjectId} onVoted={onVoted}/>
        </div>
      </div>
    </article>
    {open && <ProjectModal project={project} voterId={voterId} votedProjectId={votedProjectId} onClose={()=>setOpen(false)} onVoted={onVoted}/>}
  </>;
}
