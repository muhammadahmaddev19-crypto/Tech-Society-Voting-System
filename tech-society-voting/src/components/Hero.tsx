import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return <section className="hero">
    <div className="container hero-grid">
      <div>
        <div className="eyebrow"><Sparkles size={13} style={{verticalAlign:"middle",marginRight:6}}/> TECH SOCIETY 2026</div>
        <h1>PROJECT <span className="gradient-text">COMPETITION</span></h1>
        <p>Discover innovative student projects, explore the ideas behind them, and vote for the team you believe deserves the top position.</p>
        <div className="hero-actions">
          <Link href="/submit" className="btn btn-primary">Submit Your Project <ArrowRight size={15}/></Link>
          <Link href="/vote" className="btn">Go For Vote <ArrowRight size={15}/></Link>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="holo-card">
          <div style={{color:"#6deaff",fontSize:11,letterSpacing:".2em"}}>LIVE COMPETITION</div>
          <div style={{font:"700 31px var(--font-space)",marginTop:10}}>DISCOVER<br/>EXPLORE<br/>VOTE.</div>
          <div className="holo-lines"><span/><span/><span/></div>
        </div>
      </div>
    </div>
  </section>;
}
