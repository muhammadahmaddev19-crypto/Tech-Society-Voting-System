"use client";

import VoteButton from "./VoteButton";
import { X } from "lucide-react";
import type { ProjectData } from "./ProjectCard";

export default function ProjectModal({project,voterId,votedProjectId,onClose,onVoted}:{project:ProjectData;voterId?:string;votedProjectId?:string;onClose:()=>void;onVoted?:()=>void}) {
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="panel modal" onMouseDown={e=>e.stopPropagation()}>
      <div style={{display:"flex",justifyContent:"space-between",gap:15,marginBottom:16}}>
        <div><div className="eyebrow">PROJECT DETAILS</div><h2 className="form-title">{project.name}</h2><div className="project-team">{project.teamName} · {project.voteCount} votes</div></div>
        <button className="btn btn-small" onClick={onClose}><X size={15}/></button>
      </div>
      <div className="modal-grid">
        <img className="modal-image" src={project.imageUrl} alt={project.name}/>
        <div>
          <p style={{color:"#8ea2ba",lineHeight:1.7,fontSize:13}}>{project.description}</p>
          <div className="meta-row"><span className="tag">{project.department}</span><span className="tag">{project.semester}</span><span className="tag">{project.section}</span></div>
          <h4 style={{margin:"22px 0 10px",fontFamily:"var(--font-space)"}}>Group Members</h4>
          <div className="member-list">{project.members.map(m=><div className="member" key={m.id}><div className="avatar">{m.name.slice(0,2).toUpperCase()}</div><div><div style={{fontSize:12}}>{m.name}</div><small>{m.rollNo} · {m.department} · {m.semester} · {m.section}</small></div></div>)}</div>
          {voterId && <div style={{marginTop:18}}><VoteButton voterId={voterId} projectId={project.id} disabled={!!votedProjectId} alreadyVoted={!!votedProjectId} onVoted={onVoted}/></div>}
        </div>
      </div>
    </div>
  </div>;
}
