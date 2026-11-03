"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Opportunity, Story, Guide } from "@/lib/types";
import { OpportunityCard, StoryCard, EmptyState } from "./ui";
import Link from "next/link";
import { ruleTopics, ruleTopicHref, pathFields, pathFieldHref } from "@/lib/structure";
import { pathLessons } from "@/lib/paths";
export function Discovery({
  items,
  initialZone = "",
  initialBorough = "",
  event = false
}: {
  items: Opportunity[];
  initialZone?: string;
  initialBorough?: string;
  event?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState(initialZone);
  const [borough, setBorough] = useState(initialBorough);
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [free, setFree] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [sort, setSort] = useState("date");
  const filtered = useMemo(() => items.filter(o => (!query || `${o.title} ${o.category} ${o.description} ${o.borough}`.toLowerCase().includes(query.toLowerCase())) && (!zone || o.zone === zone) && (!borough || o.borough === borough) && (!age || o.ageBands.includes(age as Opportunity["ageBands"][number])) && (!category || o.category === category) && (!free || o.cost === 0) && (!holiday || o.holiday) && (!accessible || o.accessibility.includes("Step-free access"))).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) : a.date.localeCompare(b.date)), [items, query, zone, borough, age, category, free, holiday, accessible, sort]);
  function reset() {
    setQuery("");
    setZone("");
    setBorough("");
    setAge("");
    setCategory("");
    setFree(false);
    setHoliday(false);
    setAccessible(false);
    setSort("date");
  }
  return <><div className="filter-bar"><div className="field"><label htmlFor="activity-search">What’s your next move?</label><input id="activity-search" type="search" placeholder="Try basketball, music, coding…" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="field"><label htmlFor="zone">Area</label><select id="zone" value={zone} onChange={e => {
          setZone(e.target.value);
          setBorough("");
        }}><option value="">All London</option>{["North", "South", "East", "West"].map(z => <option key={z}>{z}</option>)}</select></div><div className="field"><label htmlFor="borough">Borough</label><select id="borough" value={borough} onChange={e => setBorough(e.target.value)}><option value="">All boroughs</option>{Array.from(new Set(items.filter(o => !zone || o.zone === zone).map(o => o.borough))).sort().map(b => <option key={b}>{b}</option>)}</select></div><div className="field"><label htmlFor="age">Your age band</label><select id="age" value={age} onChange={e => setAge(e.target.value)}><option value="">All ages</option>{["13–15", "16–17", "18–20"].map(a => <option key={a}>{a}</option>)}</select></div><div className="field"><label htmlFor="interest">Interest</label><select id="interest" value={category} onChange={e => setCategory(e.target.value)}><option value="">All interests</option>{Array.from(new Set(items.map(o => o.category))).sort().map(c => <option key={c}>{c}</option>)}</select></div><label className="check-label"><input type="checkbox" checked={free} onChange={e => setFree(e.target.checked)} />Free</label><label className="check-label"><input type="checkbox" checked={holiday} onChange={e => setHoliday(e.target.checked)} />School holidays</label><label className="check-label"><input type="checkbox" checked={accessible} onChange={e => setAccessible(e.target.checked)} />Step-free</label></div><div className="filter-results"><span className="mono" aria-live="polite">{filtered.length} {filtered.length === 1 ? "POSSIBILITY" : "POSSIBILITIES"} / BOROUGH-LEVEL DISCOVERY</span><div className="flex items-center gap-4"><select aria-label="Sort opportunities" value={sort} onChange={e => setSort(e.target.value)} style={{
          fontSize: 9,
          minHeight: 32,
          padding: 5,
          width: 110
        }}><option value="date">Soonest first</option><option value="title">A–Z</option></select><button className="filter-reset" onClick={reset}>Reset filters</button></div></div>{filtered.length ? <div className="cards-grid">{filtered.map(o => <OpportunityCard key={o.slug} item={o} event={event} />)}</div> : <EmptyState title="LET’S TRY ANOTHER MOVE." description="No activities match those filters. Try another area or interest, or clear the filters to see everything." />}</>;
}
export function StoryExplorer({
  stories
}: {
  stories: Story[];
}) {
  const [theme, setTheme] = useState("");
  return <><div className="topic-pills" aria-label="Filter story themes">{["", ...new Set(stories.map(s => s.theme))].map(t => <button key={t} className={`topic-pill ${theme === t ? "selected" : ""}`} aria-pressed={theme === t} onClick={() => setTheme(t)}>{t || "All stories"}</button>)}</div><div className="stories-grid">{stories.filter(s => !theme || s.theme === theme).map(s => <StoryCard key={s.slug} story={s} />)}</div>{!stories.length && <EmptyState />}</>;
}
export function SiteSearch({
  opportunities,
  stories,
  guides
}: {
  opportunities: Opportunity[];
  stories: Story[];
  guides: Guide[];
}) {
  const [query, setQuery] = useState("");
  const all = [...opportunities.map(o => ({
    title: o.title,
    description: o.description,
    kind: "Opportunity",
    href: `/opportunities/${o.slug}`
  })), ...stories.map(s => ({
    title: s.title,
    description: s.excerpt,
    kind: "Story",
    href: `/stories/${s.slug}`
  })), ...guides.map(g => ({
    title: g.title,
    description: g.summary,
    kind: g.demo ? "Legal guide / awaiting review" : "Legal guide",
    href: `/know-the-game/${g.slug}`
  }))];
  all.push(...ruleTopics.map(t => ({
    title: t.title,
    description: t.purpose,
    kind: "Topic outline",
    href: ruleTopicHref(t)
  })), ...pathFields.map(f => ({
    title: f.title,
    description: f.purpose,
    kind: "Learning field",
    href: pathFieldHref(f)
  })), ...pathLessons.map(l => ({
    title: l.title,
    description: l.description,
    kind: "Learning introduction",
    href: `/choose-a-path/${l.slug}`
  })));
  const results = query.trim() ? all.filter(r => (r.title + " " + r.description).toLowerCase().includes(query.toLowerCase())) : [];
  return <><form className="search-box" onSubmit={e => e.preventDefault()} role="search"><label className="sr-only" htmlFor="site-search">Search RWM</label><input autoFocus id="site-search" type="search" placeholder="Stories, activities, rights…" value={query} onChange={e => setQuery(e.target.value)} /><button className="button" type="submit"><Search size={18} />Search</button></form><p className="mono" aria-live="polite">{query ? `${results.length} RESULTS FOR “${query}”` : "WHAT’S ON YOUR MIND? TYPE SOMETHING TO START."}</p>{results.map(r => <article className="search-result" key={r.href}><span className="mono">{r.kind.toUpperCase()}</span><h2><Link href={r.href}>{r.title} ↗</Link></h2><p>{r.description}</p></article>)}{query && !results.length && <EmptyState title="NO MATCH YET." description="Try a different word, like basketball, code, rights or support." />}</>;
}
