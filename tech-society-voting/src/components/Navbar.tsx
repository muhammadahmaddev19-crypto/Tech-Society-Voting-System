"use client";

import Link from "next/link";
import { Menu, Vote, Upload } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <img src="/assets/logo.svg" alt="Tech Society" />
          <span>TECH SOCIETY</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/vote">Projects</Link>
          <Link href="/#leaderboard">Leaderboard</Link>
          <Link href="/#about">About</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/submit" className="btn btn-small">
            <Upload size={13} /> Project Owner
          </Link>
          <Link href="/vote" className="btn btn-primary btn-small">
            <Vote size={13} /> Vote for Projects
          </Link>
          <button className="btn btn-small mobile-menu" aria-label="Menu"><Menu size={16}/></button>
        </div>
      </div>
    </header>
  );
}
