import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TileArt } from "./art";
import type { ArtKind } from "@/lib/structure";
export function SectionNav({
  links,
  label = "Explore this section"
}: {
  links: {
    title: string;
    href: string;
  }[];
  label?: string;
}) {
  return <nav className="section-nav" aria-label={label}>{links.map(l => <Link key={l.href} href={l.href}>{l.title}<ArrowUpRight size={14} /></Link>)}</nav>;
}
export function OutlineNotice({
  legal = false
}: {
  legal?: boolean;
}) {
  return <div className="content-note"><strong>{legal ? "GUIDE IN PREPARATION / " : "THIS PAGE IS TAKING SHAPE / "}</strong>{legal ? "This is a topic outline, not reviewed legal guidance. Full content and examples need qualified review before publication." : "The purpose and first questions are here. The full guide and reviewed resources will be added as this section develops."}</div>;
}
export function TopicCard({
  title,
  purpose,
  href,
  art,
  caption
}: {
  title: string;
  purpose: string;
  href: string;
  art?: ArtKind;
  caption?: string;
}) {
  return <article className="structure-card">{art && <Link href={href} className="structure-card-art" aria-label={`Explore ${title}`}><TileArt kind={art} /></Link>}<div className="structure-card-copy">{caption && <span className="mono">{caption}</span>}<h2><Link href={href}>{title}</Link></h2><p>{purpose}</p><Link href={href} className="text-link">Explore <ArrowUpRight size={16} /></Link></div></article>;
}
export function LearningSections({
  questions
}: {
  questions: string[];
}) {
  return <section className="prose"><h2>WHAT WE’LL EXPLORE.</h2><ul>{questions.map(q => <li key={q}>{q}</li>)}</ul><h2>A MOMENT TO THINK.</h2><p>You can think about what would help you, without sharing a personal experience. No answer is required.</p><label className="field-label" htmlFor="private-thought">A private note — stays on this page and is never submitted</label><textarea id="private-thought" maxLength={1500} placeholder="A question or next step I want to think about…" /></section>;
}
