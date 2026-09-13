"use client";

import { useEffect, useState } from "react";
import { Trash2, LogOut, Boxes, Users, Vote } from "lucide-react";
import { useRouter } from "next/navigation";

type P={id:string;name:string;teamName:string;voteCount:number;status:string;createdAt:string};
export default function AdminDashboard(){
  const [projects,setProjects]=useState<P[]>([]);const [stats,setStats]=useState({projects:0,participants:0,votes:0});const router=useRouter();
  const load=async()=>{const [p,s]=await Promise.all([fetch("/api/projects",{cache:"no-store"}).then(r=>r.json()),fetch("/api/stats",{cache:"no-store"}).then(r=>r.json())]);setProjects(p);setStats(s)};
  useEffect(()=>{load()},[]);
  async function del(id:string){if(!confirm("Delete this project permanently?"))return;await fetch("/api/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"delete-project",id})});load()}
  async function logout(){await fetch("/api/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logout"})});router.push("/admin/login")}
  return <section className="admin-wrap"><div className="container">
    <div className="admin-grid">
      <aside className="panel admin-side"><div className="brand" style={{marginBottom:20}}><img src="/assets/logo.svg" alt=""/><span>ADMIN</span></div><nav className="admin-nav"><a className="active" href="#">Dashboard</a><a href="/vote">Voting View</a><a href="/#leaderboard">Leaderboard</a></nav><button className="btn btn-small" style={{width:"100%",marginTop:20}} onClick={logout}><LogOut size={13}/> Logout</button></aside>
      <div>
        <div className="section-head"><div><div className="eyebrow">CONTROL CENTER</div><h1 className="form-title">Admin Dashboard</h1><p className="section-subtitle">Monitor projects, students and live votes.</p></div><span className="live">System online</span></div>
        <div className="stats-grid" style={{marginTop:0}}>
          {[["Projects",stats.projects,Boxes],["Students",stats.participants,Users],["Votes",stats.votes,Vote]].map(([l,v,I])=><div className="stat-card" key={String(l)}><div className="stat-icon"><I size={19}/></div><div><div className="stat-label">{l}</div><div className="stat-value">{v as number}</div></div></div>)}
        </div>
        <div className="panel"><div className="section-head" style={{marginBottom:8}}><div><h2 className="section-title" style={{fontSize:20}}>Recent Projects</h2></div><span className="live">Live data</span></div>
          <div className="table-wrap"><table className="table"><thead><tr><th>#</th><th>Project</th><th>Team</th><th>Status</th><th>Votes</th><th>Action</th></tr></thead><tbody>
          {projects.map((p,i)=><tr key={p.id}><td>{i+1}</td><td>{p.name}</td><td>{p.teamName}</td><td><span className={`status ${p.status.toLowerCase()}`}>{p.status}</span></td><td>{p.voteCount}</td><td><button className="btn btn-danger btn-small" onClick={()=>del(p.id)}><Trash2 size={12}/> Delete</button></td></tr>)}
          </tbody></table></div>
        </div>
      </div>
    </div>
  </div></section>;
}
