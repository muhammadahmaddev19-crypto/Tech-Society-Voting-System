import ProjectForm from "@/components/ProjectForm";
import Link from "next/link";

export default function SubmitPage() {
  return <section className="form-shell">
    <div className="container form-grid">
      <ProjectForm />
      <aside className="panel">
        <div className="eyebrow">PROJECT OWNER</div>
        <h2 style={{font:"700 22px var(--font-space)",margin:"10px 0"}}>Submission checklist</h2>
        <div className="notice" style={{marginTop:15}}>
          <strong>01 — Project image</strong><br/>Use a clear landscape image or screenshot of your project.
        </div>
        <div className="notice" style={{marginTop:10}}>
          <strong>02 — Team information</strong><br/>Every member must have a valid roll number beginning with B/b.
        </div>
        <div className="notice" style={{marginTop:10}}>
          <strong>03 — Competition</strong><br/>Once submitted, your project appears on the live voting dashboard.
        </div>
        <Link href="/vote" className="btn btn-cyan" style={{width:"100%",marginTop:16}}>See Voting Dashboard →</Link>
      </aside>
    </div>
  </section>;
}
