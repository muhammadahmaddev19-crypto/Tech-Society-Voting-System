"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const [secret,setSecret]=useState(""); const [error,setError]=useState(""); const router=useRouter();
  async function login(e:React.FormEvent){
    e.preventDefault();setError("");
    const r=await fetch("/api/admin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",secret})});
    const data=await r.json();
    if(!data.ok){setError(data.error);return;}
    router.push("/admin");
  }
  return <section className="form-shell"><div className="container" style={{maxWidth:500}}>
    <form className="panel" onSubmit={login}>
      <div className="stat-icon"><LockKeyhole size={20}/></div>
      <h1 className="form-title" style={{marginTop:15}}>Admin Login</h1>
      <p className="form-subtitle">Private competition management area.</p>
      <div className="field"><label>ADMIN SECRET</label><input type="password" value={secret} onChange={e=>setSecret(e.target.value)} required placeholder="Enter admin secret"/></div>
      {error && <div className="notice" style={{color:"#ff8197",marginBottom:14}}>{error}</div>}
      <button className="btn btn-primary" style={{width:"100%"}}>ENTER DASHBOARD</button>
    </form>
  </div></section>;
}
