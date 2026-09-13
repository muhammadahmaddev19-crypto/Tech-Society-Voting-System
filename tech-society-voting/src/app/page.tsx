import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Leaderboard from "@/components/Leaderboard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return <>
    <Hero />
    <div className="container"><Stats /></div>
    <section className="section" id="leaderboard">
      <div className="container">
        <div className="section-head">
          <div><h2 className="section-title">🏆 Top 3 Leaderboard</h2><p className="section-subtitle">Rankings change automatically as new votes arrive.</p></div>
          <span className="live">Live standings</span>
        </div>
        <Leaderboard />
        <div style={{textAlign:"center",marginTop:25}}><Link href="/vote" className="btn">View All Projects <ArrowRight size={14}/></Link></div>
      </div>
    </section>
    <section className="section" id="about">
      <div className="container">
        <div className="panel" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:30}}>
          <div><div className="eyebrow">HOW IT WORKS</div><h2 className="section-title" style={{marginTop:8}}>A fair, simple student voting system.</h2></div>
          <div style={{color:"#8296ad",fontSize:13,lineHeight:1.8}}>
            Project owners submit their project and group information. Voters register using their student details. The server enforces one vote per roll number, and the leaderboard refreshes automatically so everyone sees the current competition.
          </div>
        </div>
      </div>
    </section>
  </>;
}
