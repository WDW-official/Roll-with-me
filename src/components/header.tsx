"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, Search, Moon, Sun, ShoppingBag, BookOpen, Compass, MapPin, Play } from "lucide-react";
import { BrandMark } from "./icons";
const nav = [["Know the Rules", "/know-the-rules"], ["Choose a Path", "/choose-a-path"], ["Roll With Me", "/roll-with-me"], ["The Real", "/the-real"]];
const mobilePillars = [{
  name: "Know the Rules",
  href: "/know-the-rules",
  Icon: BookOpen
}, {
  name: "Choose a Path",
  href: "/choose-a-path",
  Icon: Compass
}, {
  name: "Roll With Me",
  href: "/roll-with-me",
  Icon: MapPin
}, {
  name: "The Real",
  href: "/the-real",
  Icon: Play
}];
export function MobilePillarNav() {
  const path = usePathname();
  return <nav className="mobile-pillar-nav" aria-label="Four main sections">{mobilePillars.map(({
      name,
      href,
      Icon
    }) => <Link href={href} key={href} className={path.startsWith(href) || href === "/know-the-rules" && path.startsWith("/know-the-game") || href === "/the-real" && path.startsWith("/stories") || href === "/roll-with-me" && (path.startsWith("/opportunities") || path.startsWith("/your-area") || path.startsWith("/events")) ? "active" : ""}><Icon size={19} /><span>{name}</span></Link>)}</nav>;
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      let saved = "system";
      try {
        saved = localStorage.getItem("rwm-theme") ?? "system";
      } catch {}
      document.documentElement.dataset.theme = saved === "system" ? media.matches ? "dark" : "light" : saved;
      setTheme(saved);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  function changeTheme() {
    const dark = document.documentElement.dataset.theme === "dark";
    const next = dark ? "light" : "dark";
    try {
      localStorage.setItem("rwm-theme", next);
    } catch {}
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }
  return <><div className="utility-bar"><span className="mono"><span className="live-dot" /> LONDON ROOTS. LIMITLESS POSSIBILITIES.</span><div><Link href="/parents">For parents & carers <ArrowUpRight size={12} /></Link><Link href="/help">Need a hand?</Link></div></div><header className="site-header"><Link className="brand" href="/" aria-label="Roll With Me home" onClick={() => setOpen(false)}><BrandMark /><span>ROLL<br />WITH ME<span className="brand-dot">.</span></span></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([name, href]) => <Link key={href} href={href} className={(href === "/" ? path === "/" : path.startsWith(href)) ? "active" : ""}>{name}</Link>)}</nav><div className="header-actions"><Link href="/search" aria-label="Search RWM" className="icon-button"><Search size={19} /></Link><button aria-label="Toggle colour theme" title={`Theme: ${theme}. Toggle light or dark.`} onClick={changeTheme} className="icon-button"><Sun size={19} className="sun-icon" /><Moon size={19} className="moon-icon" /></button><Link href="/account" className="join-link">Your space <ArrowUpRight size={15} /></Link><button className="icon-button mobile-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...nav, ["All activities", "/opportunities"], ["Ask RWM", "/ask-rwm"], ["The Circle", "/the-circle"], ["Parents & carers", "/parents"], ["Shop", "/shop"], ["Help & support", "/help"], ["Your space", "/account"]].map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}<ArrowUpRight size={22} /></Link>)}</nav>}</>;
}
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><Link href="/" className="footer-wordmark">ROLL<br />WITH ME<span>.</span></Link><div className="footer-mission"><p className="mono">MOVE TOGETHER.<br />BECOME MORE.</p><p>Your city. Your people. Your next move.<br />Built with young people, for young people.</p><span className="mono">LONDON, UNITED KINGDOM ↗</span></div><div className="footer-links">{[["EXPLORE", [["The Real — stories", "/the-real"], ["Choose a Path", "/choose-a-path"], ["Roll With Me — local", "/roll-with-me"], ["Know the Rules", "/know-the-rules"], ["RWM Shop", "/shop"]]], ["OUR CIRCLE", [["Ask RWM", "/ask-rwm"], ["Parents & carers", "/parents"], ["About the movement", "/about"], ["Partners & impact", "/partners"]]], ["HERE FOR YOU", [["Help & support", "/help"], ["Safety at RWM", "/safety"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"]]]].map(([title, links]) => <div key={title as string}><span className="mono">{title as string}</span>{(links as string[][]).map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}</div>)}</div></div><div className="footer-bottom mono"><span>© {new Date().getFullYear()} ROLL WITH ME / LONDON</span><span>DIFFERENT START. SAME GAME. BETTER ENDING.</span><div><Link href="/terms">Terms</Link><Link href="/admin">Staff access</Link><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={15} /></Link></div></div></footer>;
}
