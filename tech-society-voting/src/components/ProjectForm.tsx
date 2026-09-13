"use client";

import { useState } from "react";
import { createProject } from "@/actions/projects";
import { Plus, Trash2 } from "lucide-react";

const emptyMember = {name:"",rollNo:"",semester:"",section:"",department:""};

export default function ProjectForm() {
  const [form,setForm]=useState({name:"",teamName:"",description:"",imageUrl:"",department:"Computer Science",semester:"Semester 1",section:"A",members:[emptyMember]});
  const [message,setMessage]=useState("");
  const [busy,setBusy]=useState(false);

  const update=(key:string,value:string)=>setForm(f=>({...f,[key]:value}));
  const updateMember=(i:number,key:string,value:string)=>setForm(f=>({...f,members:f.members.map((m,idx)=>idx===i?{...m,[key]:value}:m)}));

  async function submit(e:React.FormEvent){
    e.preventDefault(); setBusy(true); setMessage("");
    const result=await createProject(form);
    setBusy(false);
    if(!result.ok){setMessage(result.error || "Submission failed.");return;}
    setMessage("PROJECT SUBMITTED — it is now visible on the competition dashboard.");
    setForm({name:"",teamName:"",description:"",imageUrl:"",department:"Computer Science",semester:"Semester 1",section:"A",members:[emptyMember]});
  }

  return <form className="panel" onSubmit={submit}>
    <div className="eyebrow">PROJECT OWNER PORTAL</div>
    <h1 className="form-title">Submit Your Project</h1>
    <p className="form-subtitle">Share your innovative idea with the Tech Society community. Add a public image URL for the project preview.</p>

    <div className="field-grid">
      <div className="field"><label>PROJECT NAME *</label><input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="e.g. AI Study Assistant" required/></div>
      <div className="field"><label>TEAM NAME *</label><input value={form.teamName} onChange={e=>update("teamName",e.target.value)} placeholder="e.g. Team Alpha" required/></div>
    </div>
    <div className="field"><label>PROJECT DESCRIPTION *</label><textarea value={form.description} onChange={e=>update("description",e.target.value)} placeholder="Describe your project, problem, solution and technologies..." required/></div>
    <div className="field"><label>PROJECT IMAGE URL *</label><input type="url" value={form.imageUrl} onChange={e=>update("imageUrl",e.target.value)} placeholder="https://.../project-image.jpg" required/></div>

    <div className="field-grid">
      <div className="field"><label>DEPARTMENT *</label><select value={form.department} onChange={e=>update("department",e.target.value)}><option>Computer Science</option><option>Artificial Intelligence</option><option>Software Engineering</option><option>Data Science</option><option>Cyber Security</option><option>FinTech</option><option>Other</option></select></div>
      <div className="field"><label>SEMESTER *</label><select value={form.semester} onChange={e=>update("semester",e.target.value)}>{Array.from({length:8},(_,i)=><option key={i}>Semester {i+1}</option>)}</select></div>
    </div>

    <div className="field"><label>SECTION *</label><select value={form.section} onChange={e=>update("section",e.target.value)}><option>A</option><option>B</option><option>C</option><option>D</option></select></div>

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"22px 0 10px"}}><h3 style={{fontFamily:"var(--font-space)",margin:0}}>Group Members</h3><button type="button" className="btn btn-small" onClick={()=>setForm(f=>({...f,members:[...f.members,{...emptyMember}]}))}><Plus size={13}/> Add Member</button></div>

    {form.members.map((m,i)=><div className="member-row" key={i}>
      <input value={m.name} onChange={e=>updateMember(i,"name",e.target.value)} placeholder={`Member ${i+1} name`} required/>
      <input value={m.rollNo} onChange={e=>updateMember(i,"rollNo",e.target.value)} placeholder="B12345" pattern="^[Bb][0-9]+$" required/>
      <button type="button" className="btn btn-small btn-danger" disabled={form.members.length===1} onClick={()=>setForm(f=>({...f,members:f.members.filter((_,idx)=>idx!==i)}))}><Trash2 size={13}/></button>
    </div>)}

    <div className="notice" style={{margin:"18px 0"}}><strong>Voting rule:</strong> every registered student can vote for only ONE project. Once submitted, the vote is permanent and cannot be erased or changed.</div>
    {message && <div className="notice" style={{marginBottom:15,color:message.startsWith("PROJECT")?"#62efbd":"#ff879c"}}>{message}</div>}
    <button className="btn btn-primary" disabled={busy} style={{width:"100%"}}>{busy ? "SUBMITTING..." : "SUBMIT PROJECT →"}</button>
  </form>;
}
