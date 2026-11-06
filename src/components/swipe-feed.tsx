"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Bookmark, BookOpen, Compass, MapPin, Play, ShieldCheck, HeartHandshake } from "lucide-react";
import { TileArt } from "./art";
import type { Guide, Opportunity, Story } from "@/lib/types";
import { ruleBranches, ruleTopics, ruleTopicHref, pathBranches, pathFields, pathFieldHref, activityCategories, activityMatchesCategory, discoveryState, discoveryHref, discoveryQuery, supportHref, type DiscoveryState } from "@/lib/structure";
export type FeedKind = "rules" | "paths" | "local" | "stories";
export interface FeedCard {
  image?: string;
  imageAlt?: string;
  neutralArt?: boolean;
  ctaLabel?: string;
  id: string;
  title: string;
  kicker: string;
  description: string;
  art: string;
  href: string;
  cta: string;
  meta: string;
  note?: string;
}
interface FeedProps {
  localView?: {
    cards: FeedCard[];
    controls: ReactNode;
    tabs: ReactNode;
    empty: ReactNode;
    feedLabel: string;
    directoryHref: string;
  };
  kind: FeedKind;
  opportunities?: Opportunity[];
  stories?: Story[];
  guides?: Guide[];
  initialFilter?: string;
  initialDiscovery?: DiscoveryState;
  areaBoroughs?: Record<string, string[]>;
  title?: string;
  description?: string;
}
export function SwipeFeed({
  kind,
  opportunities = [],
  stories = [],
  guides = [],
  initialFilter,
  initialDiscovery,
  areaBoroughs = {},
  title,
  description,
  localView
}: FeedProps) {
  const initial = initialDiscovery ?? discoveryState({});
  const [filter, setFilter] = useState(initialFilter ?? (kind === "local" ? initial.area : kind === "stories" ? "all" : "explore"));
  const [borough, setBorough] = useState(initial.borough);
  const [age, setAge] = useState(initial.age);
  const [category, setCategory] = useState(initial.category);
  const [position, setPosition] = useState({ key: "", index: 0 });
  const [saved, setSaved] = useState<string[]>([]);
  const feed = useRef<HTMLDivElement>(null);
  const headings = {
    rules: {
      title: "KNOW THE RULES.",
      description: "Know your rights. Read the situation. Roll safe.",
      icon: BookOpen
    },
    paths: {
      title: "CHOOSE A PATH.",
      description: "Find an interest. Learn the basics. See where it goes.",
      icon: Compass
    },
    local: {
      title: "ROLL WITH ME.",
      description: "Your area. Your people. Something to get into.",
      icon: MapPin
    },
    stories: {
      title: "THE REAL.",
      description: "Honest perspectives. Turning points. Another route forward.",
      icon: Play
    }
  };
  const heading = headings[kind];
  let cards: FeedCard[] = [];
  let options: {
    value: string;
    label: string;
  }[] = [];
  if (kind === "rules") {
    options = [{
      value: "explore",
      label: "Start here"
    }, ...ruleBranches.map(b => ({
      value: b.slug,
      label: b.title.replace(/\.$/, "")
    })), ...(guides.length ? [{
      value: "guides",
      label: "Guide examples"
    }] : [])];
    if (filter === "explore") cards = ruleBranches.map(b => ({
      id: b.slug,
      title: b.title,
      kicker: "KNOW THE RULES",
      description: b.purpose,
      art: b.art,
      href: `/know-the-rules/${b.slug}`,
      cta: "Choose this route",
      meta: b.slug === "the-law" ? "RIGHTS / CONSEQUENCES / COMMON SENSE" : "AWARENESS / RESPECT / COMMON SENSE"
    }));else if (filter === "guides") cards = guides.map(g => ({
      id: g.slug,
      title: g.title,
      kicker: g.category.toUpperCase(),
      description: g.summary,
      art: "route",
      href: `/know-the-game/${g.slug}`,
      cta: "Read the explainer",
      meta: "ENGLAND & WALES",
      note: g.demo ? "DEMO / REQUIRES LAWYER REVIEW" : "QUALIFIED LEGAL REVIEW"
    }));else cards = ruleTopics.filter(t => t.branch === filter).map(t => ({
      id: t.slug,
      title: t.title,
      kicker: filter === "the-law" ? "THE LAW" : "THE TERRAIN",
      description: t.purpose,
      art: t.art,
      href: ruleTopicHref(t),
      cta: "Explore the topic",
      meta: "YOUR RIGHTS. YOUR CHOICES.",
      note: filter === "the-law" ? "TOPIC OUTLINE / FULL GUIDE NEEDS LEGAL REVIEW" : "TOPIC OUTLINE / FULL GUIDE IN PREPARATION"
    }));
  }
  if (kind === "paths") {
    options = [{
      value: "explore",
      label: "Start here"
    }, ...pathBranches.map(b => ({
      value: b.slug,
      label: b.label
    }))];
    cards = filter === "explore" ? pathBranches.map(b => ({
      id: b.slug,
      title: b.title,
      kicker: "CHOOSE A PATH",
      description: b.purpose,
      art: b.art,
      href: `/choose-a-path/${b.slug}`,
      cta: "Explore this route",
      meta: "AN INTEREST IS A START."
    })) : pathFields.filter(f => f.branch === filter).map(f => ({
      id: f.slug,
      title: f.title,
      kicker: pathBranches.find(b => b.slug === f.branch)!.label.toUpperCase(),
      description: f.purpose,
      art: f.art,
      href: pathFieldHref(f),
      cta: "See where to start",
      meta: "BASICS / LEARNING / A NEXT STEP",
      note: "FIELD OVERVIEW / RESOURCE SHORTLISTS IN PREPARATION"
    }));
  }
  if (kind === "local") {
    options = ["North", "East", "West", "South"].map(a => ({
      value: a,
      label: a
    }));
    const state = {
      area: filter,
      borough,
      age,
      category
    };
    cards = opportunities.filter(o => o.zone === filter && (!borough || o.borough === borough) && (!age || o.ageBands.includes(age as Opportunity["ageBands"][number])) && activityMatchesCategory(o, category)).map(o => ({
      id: o.slug,
      title: o.title,
      kicker: o.category.toUpperCase(),
      description: o.description,
      art: o.art,
      href: `/opportunities/${o.slug}?${discoveryQuery(state)}`,
      cta: "See the session",
      meta: `${o.borough.toUpperCase()} / AGES ${o.ageBands.join(" · ")}`,
      note: o.demo ? "DEMO / NOT VERIFIED OR BOOKABLE" : `VERIFIED / ${o.cost === 0 ? "FREE" : "£" + o.cost}`
    }));
  }
  if (kind === "stories") {
    options = [{
      value: "all",
      label: "All stories"
    }, ...[...new Set(stories.map(s => s.theme))].map(theme => ({
      value: theme,
      label: theme
    }))];
    const collection: FeedCard = {
      id: "collection",
      title: "THE NEXT CHAPTER.",
      kicker: "THE STORY COLLECTION",
      description: "Ten story spaces are waiting for the experiences we will develop with their contributors. Explore the collection plan.",
      art: "route",
      href: "/the-real/collection",
      cta: "See the collection",
      meta: "TEN SPACES / NO INVENTED TESTIMONIES",
      note: "REAL STORY MATERIAL AWAITED"
    };
    cards = [...(filter === "all" ? [collection] : []), ...stories.filter(s => filter === "all" || s.theme === filter).map(s => ({
      id: s.slug,
      title: s.title,
      kicker: s.series,
      description: s.excerpt,
      art: s.art,
      href: `/stories/${s.slug}`,
      cta: "Read the story",
      meta: s.duration + " / " + s.type.toUpperCase(),
      note: s.demo ? "ILLUSTRATIVE STORY / NO REAL PERSON DEPICTED" : s.contentNote
    }))];
  }
  if (localView) cards = localView.cards;
  const cardKey = cards.map(card => card.id).join("|");
  const index = position.key === cardKey ? position.index : 0;
  const setIndex = (next: number) => setPosition({ key: cardKey, index: next });
  function rewind() {
    setIndex(0);
    if (feed.current) feed.current.scrollTop = 0;
  }
  function updateLocal(next: DiscoveryState) {
    window.history.replaceState(null, "", discoveryHref(next));
  }
  function choose(value: string) {
    setFilter(value);
    setBorough("");
    rewind();
    if (kind === "local") updateLocal({
      area: value,
      borough: "",
      age,
      category
    });
  }
  function move(direction: number) {
    if (!feed.current) return;
    const next = Math.max(0, Math.min(cards.length - 1, index + direction));
    feed.current.children[next]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "nearest"
    });
    setIndex(next);
  }
  const source = kind === "rules" ? "/know-the-rules" : kind === "paths" ? "/choose-a-path" : kind === "local" ? "/roll-with-me" : "/the-real";
  const extras = kind === "rules" ? [{
    title: "Facts, Context & Myths",
    href: "/know-the-rules/facts-and-myths"
  }] : kind === "paths" ? [{
    title: "All fields",
    href: "/choose-a-path/directory"
  }] : kind === "local" ? [{
    title: "Activity categories",
    href: localView?.directoryHref ?? "/roll-with-me/categories"
  }] : [{
    title: "Themes",
    href: "/the-real/themes"
  }, {
    title: "Share a story",
    href: "/the-real/share-your-story"
  }];
  const boroughChoices = areaBoroughs[filter] ?? [...new Set(opportunities.filter(o => o.zone === filter).map(o => o.borough))];
  return <section className={`social-hub hub-${kind}`} aria-label={title ?? heading.title}><div className="hub-intro"><div className="hub-heading"><heading.icon size={16} /><span className="mono">FOUR WAYS IN. YOUR OWN NEXT STEP.</span></div><h1>{title ?? heading.title}</h1><p>{description ?? heading.description}</p><div className="hub-desktop-note"><span className="mono">MADE TO EXPLORE AT YOUR PACE.</span><p>Swipe up or use the arrows. Open a card to go deeper.</p>{extras.map(l => <Link className="text-link" href={l.href} key={l.href}>{l.title}<ArrowUpRight size={14} /></Link>)}</div></div>
  <div className="hub-player">{localView ? localView.tabs : <div className="hub-tabs" role="group" aria-label={kind === "local" ? "Choose your London area" : kind === "paths" ? "Choose a learning path" : "Choose a topic"}>{options.map(o => <button key={o.value} onClick={() => choose(o.value)} className={filter === o.value ? "selected" : ""} aria-pressed={filter === o.value}>{o.label}{kind === "local" && <span className="area-tab-suffix"> London</span>}</button>)}</div>}
  {kind === "local" && (localView ? localView.controls : <div className="hub-local-filters"><label><MapPin size={12} /><select aria-label="Choose your borough" value={borough} onChange={e => {
            const v = e.target.value;
            setBorough(v);
            rewind();
            updateLocal({
              area: filter,
              borough: v,
              age,
              category
            });
          }}><option value="">All {filter} London</option>{boroughChoices.map(b => <option key={b}>{b}</option>)}</select></label><select aria-label="Choose age band" value={age} onChange={e => {
          const v = e.target.value;
          setAge(v);
          rewind();
          updateLocal({
            area: filter,
            borough,
            age: v,
            category
          });
        }}><option value="">All ages</option>{["13–15", "16–17", "18–20"].map(a => <option key={a}>{a}</option>)}</select><select aria-label="Choose activity category" value={category} onChange={e => {
          const v = e.target.value;
          setCategory(v);
          rewind();
          updateLocal({
            area: filter,
            borough,
            age,
            category: v
          });
        }}><option value="">All activities</option>{activityCategories.map(c => <option value={c.slug} key={c.slug}>{c.title.replace(/\.$/, "")}</option>)}</select></div>)}
  {cards.length ? <><div key={cardKey} className="swipe-feed" ref={feed} tabIndex={0} role={localView ? "region" : undefined} aria-label={localView?.feedLabel ?? "Swipe up or down to explore cards"} onKeyDown={e => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            move(-1);
          }
        }} onScroll={() => {
          if (feed.current && feed.current.clientHeight) setIndex(Math.min(cards.length - 1, Math.round(feed.current.scrollTop / feed.current.clientHeight)));
        }}>{cards.map((card, i) => <article className="swipe-card" key={card.id} aria-label={`${i + 1} of ${cards.length}: ${card.title}`}><div className="swipe-art" data-image-slot={kind === "rules" ? filter === "the-terrain" || card.id === "the-terrain" ? "terrain-banner" : "rules-law-banner" : kind === "paths" ? filter === "sports" || card.id === "sports" ? "path-sports-banner" : filter === "vocational-practical" || card.id === "vocational-practical" ? "path-vocation-banner" : "path-tech-banner" : kind === "local" ? "provider-activity-image" : "story-poster-st01-st10"}>{card.image ? <Image src={card.image} alt={card.imageAlt ?? card.kicker} width={1024} height={1024} sizes="(max-width: 700px) 100vw, 460px" /> : card.neutralArt ? <div className="vocation-placeholder" role="img" aria-label="Vocational skills — category artwork coming soon"><span aria-hidden="true">07</span><span>VOCATIONAL SKILLS</span></div> : <TileArt kind={card.art} label={card.kicker} />}</div><div className="swipe-card-overlay" /><div className="swipe-top"><span className="swipe-category mono">{card.kicker}</span><span className="mono">{String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}</span></div><div className="swipe-card-body"><span className="swipe-meta mono">{card.meta}</span><h2>{card.title}</h2><p>{card.description}</p><div className="swipe-actions"><Link className="button" href={card.href} aria-label={card.ctaLabel}>{card.cta}<ArrowUpRight size={17} /></Link><button className={`feed-save ${saved.includes(card.id) ? "is-saved" : ""}`} aria-label={saved.includes(card.id) ? "Remove from this session’s saved cards" : "Save card for this session"} aria-pressed={saved.includes(card.id)} onClick={() => setSaved(s => s.includes(card.id) ? s.filter(id => id !== card.id) : [...s, card.id])}><Bookmark size={20} fill={saved.includes(card.id) ? "currentColor" : "none"} /></button></div>{card.note && <p className="swipe-notice mono"><ShieldCheck size={11} />{card.note}</p>}</div></article>)}</div><div className="feed-controls"><span className="mono" aria-live="polite">{index + 1} / {cards.length}<span className="feed-controls-hint"> — SWIPE TO EXPLORE</span></span><div className="feed-progress" aria-hidden="true">{cards.map((c, i) => <span key={c.id} className={i === index ? "active" : ""} />)}</div><div><button onClick={() => move(-1)} disabled={index === 0} aria-label="Previous card"><ArrowUp size={16} /></button><button onClick={() => move(1)} disabled={index === cards.length - 1} aria-label="Next card"><ArrowDown size={16} /></button></div></div></> : localView ? localView.empty : <div className="feed-empty"><h2>ANOTHER MOVE<br />IS ON ITS WAY.</h2><p>No published activities match this selection. Try another area or clear your filters.</p><button className="button" onClick={() => {
          setBorough("");
          setAge("");
          setCategory("");
          rewind();
          updateLocal({
            area: filter,
            borough: "",
            age: "",
            category: ""
          });
        }}>Clear filters ↗</button><Link className="text-link" href="/opportunities">See all activities ↗</Link></div>}
  <div className="hub-help-bar"><Link href={supportHref(source)}><HeartHandshake size={15} />Get help with this</Link><Link href={supportHref(source, true)}>Parent / carer</Link>{extras.slice(0, 1).map(l => <Link key={l.href} href={l.href}>{kind === "local" ? "Categories" : kind === "rules" ? "Facts & myths" : kind === "paths" ? "All fields" : "Themes"}<ArrowUpRight size={12} /></Link>)}</div></div><p className="hub-session-note mono">{saved.length ? `${saved.length} SAVED FOR THIS VISIT / CLEARED WHEN YOU LEAVE` : kind === "local" ? "YOUR LIVE LOCATION IS NEVER USED." : "NO AUTOPLAY. EXPLORE IN YOUR OWN TIME."}</p></section>;
}
