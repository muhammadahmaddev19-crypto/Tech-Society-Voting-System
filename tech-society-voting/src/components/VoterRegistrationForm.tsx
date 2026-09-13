"use client";

import { useState } from "react";
import { registerVoter } from "@/actions/voters";
import { ArrowRight, ShieldCheck } from "lucide-react";

export type Voter = {id:string;name:string;semester:string;department:string;section:string;rollNo:string};

export default function VoterRegistrationForm({onRegistered}:{onRegistered:(v:Voter)=>void}) {
  const [form,setForm]=useState({name:"",semester:"Semester 1",department:"Computer Science",section:"A",rollNo:""});
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);

  async function submit(e:React.FormEvent){
    e.preventDefault();setBusy(true);setError("");
    const r=await registerVoter(form);setBusy(false);
    if(!r.ok){setError(r.error||"Registration failed.");return;}
    onRegistered({...form,id:r.voterId!});
  }
  const update=(k:string,v:string)=>setForm(f=>({...f,[k]:v}));

  return <div className="panel voter-box">
    <div className="eyebrow">SECURE VOTER ACCESS</div>
    <h1 className="form-title">Voter Registration</h1>
    <p className="form-subtitle">Enter your student information to continue to the live project voting dashboard.</p>
    <form onSubmit={submit}>
      <div className="field-grid">
        <div className="field"><label>FULL NAME *</label><input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Enter your full name" required/></div>
        <div className="field"><label>SEMESTER *</label><select value={form.semester} onChange={e=>update("semester",e.target.value)}>{Array.from({length:8},(_,i)=><option key={i}>Semester {i+1}</option>)}</select></div>
        <div className="field"><label>DEPARTMENT *</label><select value={form.department} onChange={e=>update("department",e.target.value)}><option>Computer Science</option><option>Artificial Intelligence</option><option>Software Engineering</option><option>Data Science</option><option>Cyber Security</option><option>FinTech</option></select></div>
        <div className="field"><label>SECTION *</label><select value={form.section} onChange={e=>update("section",e.target.value)}><option>A</option><option>B</option><option>C</option><option>D</option></select></div>
      </div>
      <div className="field"><label>ROLL NUMBER *</label><input value={form.rollNo} onChange={e=>update("rollNo",e.target.value)} placeholder="Must start with B or b (e.g. B12345)" pattern="^[Bb][0-9]+$" required/></div>
      {error && <div className="notice" style={{color:"#ff8298",marginBottom:13}}>{error}</div>}
      <button className="btn btn-primary" disabled={busy} style={{width:"100%"}}>{busy?"CHECKING...":"CONTINUE TO VOTING →"} <ArrowRight size={15}/></button>
    </form>
    <div className="notice" style={{marginTop:15}}><ShieldCheck size={15} style={{verticalAlign:"middle",marginRight:6}}/><strong>One vote only:</strong> your vote is locked permanently after submission.</div>
  </div>;
}
