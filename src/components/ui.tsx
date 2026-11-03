import Link from "next/link";
import { ArrowUpRight, ArrowRight, MapPin, Clock3, ShieldCheck } from "lucide-react";
import type { Opportunity, Story } from "@/lib/types";
import { TileArt } from "./art";
export function ButtonLink({
  href,
  children,
  secondary = false,
  className = ""
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return <Link href={href} className={`button ${secondary ? "button-secondary" : ""} ${className}`}>{children}<ArrowUpRight size={18} /></Link>;
}
export function Eyebrow({
  children
}: {
  children: React.ReactNode;
}) {
  return <p className="eyebrow mono"><span />{children}</p>;
}
export function SectionTitle({
  number,
  title,
  link,
  href
}: {
  number: string;
  title: string;
  link?: string;
  href?: string;
}) {
  return <div className="section-heading"><div><span className="mono section-number">{number} /</span><h2>{title}</h2></div>{href && <Link className="text-link" href={href}>{link ?? "Explore all"}<ArrowUpRight size={18} /></Link>}</div>;
}
export function DemoNotice({
  legal = false
}: {
  legal?: boolean;
}) {
  return <div className={`notice ${legal ? "notice-legal" : ""}`}><ShieldCheck size={19} /><p><strong>{legal ? "PRE-LAUNCH / REQUIRES LAWYER REVIEW" : "EXPLORER PREVIEW"}</strong><br />{legal ? "Illustrative content for England and Wales. No qualified legal review has taken place. Use the official sources; this is not legal advice." : "All activities shown are demo entries, not verified or bookable. Real listings will appear only after provider and safeguarding checks."}</p></div>;
}
export function OpportunityCard({
  item,
  event = false
}: {
  item: Opportunity;
  event?: boolean;
}) {
  return <article className="opportunity-card"><Link href={`/${event ? "events" : "opportunities"}/${item.slug}`} className="card-art-link" aria-label={`Explore ${item.title}`}><TileArt kind={item.art} label={item.title} /><span className="card-tag mono">{item.category}</span><span className="card-arrow"><ArrowUpRight size={21} /></span></Link><div className="card-meta mono"><span><MapPin size={13} />{item.borough} / {item.zone}</span><span className="demo-tag">{item.demo ? "DEMO" : "VERIFIED"}</span></div><h3><Link href={`/${event ? "events" : "opportunities"}/${item.slug}`}>{item.title}</Link></h3><p>{item.description}</p><div className="card-bottom mono"><span>AGES {item.ageBands.join(" / ")}</span><span>{item.cost === 0 ? item.demo ? "FREE CONCEPT" : "FREE" : `£${item.cost}${item.demo ? " DEMO" : ""}`}</span></div></article>;
}
export function StoryCard({
  story,
  featured = false
}: {
  story: Story;
  featured?: boolean;
}) {
  return <article className={`story-card ${featured ? "featured-story" : ""}`}><Link href={`/stories/${story.slug}`} className="story-art"><TileArt kind={story.art} /><span className="story-series mono">{story.series}</span><span className="story-play"><ArrowUpRight size={24} /></span></Link><div className="card-meta mono"><span><Clock3 size={13} />{story.duration}</span><span>{story.demo ? "ILLUSTRATIVE STORY" : story.type.toUpperCase()}</span></div><h3><Link href={`/stories/${story.slug}`}>{story.title}</Link></h3><p>{story.excerpt}</p></article>;
}
export function PageIntro({
  label,
  title,
  description,
  children
}: {
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return <div className="page-intro"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{description}</p>{children}</div>;
}
export function EmptyState({
  title = "A new chapter is coming.",
  description = "There’s nothing published here yet. Come back soon or explore another part of RWM."
}: {
  title?: string;
  description?: string;
}) {
  return <div className="empty-state"><ArrowRight size={32} /><h2>{title}</h2><p>{description}</p><ButtonLink href="/your-area">Explore your area</ButtonLink></div>;
}
