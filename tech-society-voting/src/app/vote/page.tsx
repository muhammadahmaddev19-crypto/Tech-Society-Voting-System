"use client";

import { useEffect, useState } from "react";
import VoterRegistrationForm, { Voter } from "@/components/VoterRegistrationForm";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";
import VoteConfirmation from "@/components/VoteConfirmation";
import LoadingState from "@/components/LoadingState";
import { Search } from "lucide-react";

export default function VotePage() {
  const [voter,setVoter]=useState<Voter|null>(null);
  const [projects,setProjects]=useState<ProjectData[]>([]);
  const [loading,setLoading]=useState(true);
  const [query,setQuery]=useState("");
  const [dept,setDept]=useState("All Departments");
  const [sem,setSem]=useState("All Semesters");
  const [section,setSection]=useState("All Sections");
  const [votedProjectId,setVotedProjectId]=useState<string|undefined>();

  const load=async()=>{
    try {
      const data=await fetch("/api/projects",{cache:"no-store"}).then(r=>r.json());
      setProjects(data);
      if(voter){
        // UI lock is persisted in localStorage for this browser; the database remains the source of truth.
        const saved=localStorage.getItem(`voted:${voter.rollNo}`);
        if(saved) setVotedProjectId(saved);
      }
    } finally {setLoading(false)}
  };
  useEffect(()=>{load();const id=setInterval(load,4000);return()=>clearInterval(id)},[voter]);

  const filtered=projects.filter(p=>
    (p.name.toLowerCase().includes(query.toLowerCase())||p.teamName.toLowerCase().includes(query.toLowerCase())) &&
    (dept==="All Departments"||p.department===dept) &&
    (sem==="All Semesters"||p.semester===sem) &&
    (section==="All Sections"||p.section===section)
  );

  const onVoted=()=>{
    if(voter){
      const project=projects.find(p=>p.id);
      if(project) {
        // VoteButton is rendered on the selected project; server is authoritative.
        load();
      }
      // The exact selected project is captured by modal/card in the button callback below.
    }
  };

  return <section className="vote-layout">
    <div className="container">
      {!voter ? <VoterRegistrationForm onRegistered={v=>{setVoter(v);localStorage.setItem("voter",JSON.stringify(v))}}/> :
      <>
        {votedProjectId && <VoteConfirmation projectName={projects.find(p=>p.id===votedProjectId)?.name || "your selected project"}/>}
        <div className="voting-header">
          <div><div className="eyebrow">LIVE VOTING ARENA</div><h1 className="form-title" style={{marginTop:6}}>Choose One Project</h1><p className="form-subtitle" style={{marginBottom:0}}>Welcome, {voter.name}. Your vote cannot be changed after submission.</p></div>
          <span className="live">Live · Auto refresh</span>
        </div>
        <div className="filters">
          <div style={{position:"relative"}}><Search size={15} style={{position:"absolute",left:11,top:12,color:"#71869e"}}/><input style={{paddingLeft:34,width:"100%"}} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects..."/></div>
          <select value={dept} onChange={e=>setDept(e.target.value)}><option>All Departments</option><option>Computer Science</option><option>Artificial Intelligence</option><option>Software Engineering</option><option>Data Science</option><option>Cyber Security</option><option>FinTech</option></select>
          <select value={sem} onChange={e=>setSem(e.target.value)}><option>All Semesters</option>{Array.from({length:8},(_,i)=><option key={i}>Semester {i+1}</option>)}</select>
          <select value={section} onChange={e=>setSection(e.target.value)}><option>All Sections</option><option>A</option><option>B</option><option>C</option><option>D</option></select>
        </div>
        {loading ? <LoadingState text="Loading live projects..." /> :
          filtered.length ? <div className="project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p} voterId={voter.id} votedProjectId={votedProjectId} onVoted={()=>{setVotedProjectId(p.id);localStorage.setItem(`voted:${voter.rollNo}`,p.id);load()}}/>)}</div>
          : <div className="panel empty">No matching projects.</div>}
      </>}
    </div>
  </section>;
}
