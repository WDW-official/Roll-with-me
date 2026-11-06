"use client";

import { ResilientImage } from "./resilient-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { MapPin } from "lucide-react";
import { SwipeFeed, type FeedCard } from "./swipe-feed";
import {
  activityCategories,
  discoveryQuery,
  londonAreas,
  vocationTypes,
  type DiscoveryState,
} from "@/lib/structure";
import { boroughSlug, visibleLocalOpportunities } from "@/lib/local-discovery";
import type { Opportunity } from "@/lib/types";

export function LocalActivities({
  state: initialState,
  areaBoroughs,
  opportunities = [],
  demosEnabled = false,
  boroughCleared = false,
}: {
  state: DiscoveryState;
  areaBoroughs: Record<string, string[]>;
  opportunities?: Opportunity[];
  demosEnabled?: boolean;
  boroughCleared?: boolean;
}) {
  const router = useRouter();
  const [state, setOptimisticState] = useOptimistic(initialState);
  const [pending, startTransition] = useTransition();
  const category = activityCategories.find((c) => c.slug === state.category);
  const results = category
    ? visibleLocalOpportunities(opportunities, state, demosEnabled)
    : [];
  function href(next: DiscoveryState, cleared = false) {
    const p = new URLSearchParams(discoveryQuery(next));
    if (next.borough) p.set("borough", boroughSlug(next.borough));
    if (cleared) p.set("notice", "borough-cleared");
    return `${next.category ? `/roll-with-me/categories/${next.category}` : "/roll-with-me"}?${p}`;
  }
  function update(patch: Partial<DiscoveryState>, cleared = false) {
    const next = { ...state, ...patch };
    startTransition(() => {
      setOptimisticState(next);
      router.push(href(next, cleared), { scroll: false });
    });
  }
  const directoryHref = href({ ...state, category: "", vocation: undefined });
  const cards: FeedCard[] = !state.area
    ? []
    : category
      ? results.map((o) => ({
          id: o.slug,
          title: o.title,
          kicker: o.category.toUpperCase(),
          description: o.description,
          art: o.art,
          href: `/opportunities/${o.slug}?${discoveryQuery(state)}`,
          cta: "See the session",
          meta: `${o.borough.toUpperCase()} / AGES ${o.ageBands.join(" · ")}`,
          note: o.demo
            ? "DEMO / NOT VERIFIED OR BOOKABLE"
            : `VERIFIED / ${o.cost === 0 ? "FREE" : "£" + o.cost}`,
        }))
      : activityCategories.map((c, i) => ({
          id: c.slug,
          title: c.title,
          kicker: `${state.area.toUpperCase()} LONDON / ${String(i + 1).padStart(2, "0")}`,
          description: c.purpose,
          art: c.art,
          image: c.image,
          imageAlt: c.imageAlt,
          neutralArt: !c.image,
          href: href({ ...state, category: c.slug, vocation: undefined }),
          cta: "Explore category",
          ctaLabel: `Explore ${c.label}`,
          meta: `SEVEN CATEGORIES / ${state.borough || state.area + " LONDON"}${state.age ? " / AGES " + state.age : ""}`,
        }));
  const tabs = (
    <div className="hub-tabs" role="group" aria-label="Choose your London area">
      {londonAreas.map((area) => (
        <button
          key={area}
          disabled={pending}
          className={state.area === area ? "selected" : ""}
          aria-pressed={state.area === area}
          onClick={() => {
            const keepBorough = (areaBoroughs[area] ?? []).includes(
              state.borough,
            );
            update(
              { area, borough: keepBorough ? state.borough : "" },
              !!state.borough && !keepBorough,
            );
          }}
        >
          {area}
          <span className="area-tab-suffix"> London</span>
        </button>
      ))}
    </div>
  );
  const controls = (
    <>
      {boroughCleared && (
        <p className="local-feed-notice" role="status">
          The borough filter was cleared because it is not available in the
          selected area.
        </p>
      )}
      {state.area && (
        <>
          <div className="hub-local-filters">
            <label>
              <MapPin size={12} />
              <select
                disabled={pending}
                aria-label="Choose your borough"
                value={state.borough}
                onChange={(e) => update({ borough: e.target.value })}
              >
                <option value="">All {state.area} London</option>
                {(areaBoroughs[state.area] ?? []).map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <select
              disabled={pending}
              aria-label="Choose age band"
              value={state.age}
              onChange={(e) => update({ age: e.target.value })}
            >
              <option value="">All ages</option>
              {["13–15", "16–17", "18–20"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            {category && (
              <select
                disabled={pending}
                aria-label="Choose activity category"
                value={state.category}
                onChange={(e) =>
                  update({ category: e.target.value, vocation: undefined })
                }
              >
                {activityCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {category && (
            <>
              <div className="local-feed-options">
                <Link href={directoryHref}>
                  ← All seven categories in {state.area} London
                </Link>
                <select
                  disabled={pending}
                  aria-label="Sort activities"
                  value={state.sort ?? "date"}
                  onChange={(e) => update({ sort: e.target.value })}
                >
                  <option value="date">Soonest first</option>
                  <option value="title">A–Z</option>
                </select>
                {category.slug === "pick-a-vocation" && (
                  <select
                    disabled={pending}
                    aria-label="Vocational specialism"
                    value={state.vocation ?? ""}
                    onChange={(e) => update({ vocation: e.target.value })}
                  >
                    <option value="">All practical skills</option>
                    {vocationTypes.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {demosEnabled && (
                <label className="local-feed-demo">
                  <input
                    disabled={pending}
                    type="checkbox"
                    checked={state.preview === "demo"}
                    onChange={(e) =>
                      update({ preview: e.target.checked ? "demo" : undefined })
                    }
                  />
                  Show demo previews — not verified or bookable
                </label>
              )}
            </>
          )}
        </>
      )}
    </>
  );
  const empty = (
    <div className="feed-empty local-empty">
      {state.area && category?.image && (
        <div className="local-empty-art">
          <ResilientImage
            src={category.image}
            alt={category.imageAlt ?? category.label}
            width={1024}
            height={1024}
            sizes="200px"
          />
        </div>
      )}
      <h2>{state.area ? "NO LOCAL ACTIVITIES YET." : "CHOOSE YOUR AREA."}</h2>
      <p role={!state.area ? "status" : undefined}>
        {!state.area
          ? "Choose North, East, South or West London to browse all seven categories. Your live location is never used."
          : `No verified activities match this category and your selection in ${state.area} London.`}
      </p>
      {state.area && (
        <>
          <button
            className="button"
            onClick={() =>
              update({ borough: "", age: "", vocation: undefined })
            }
          >
            Clear locality and age filters ↗
          </button>
          <Link className="text-link" href={directoryHref}>
            Back to {state.area} categories ↗
          </Link>
        </>
      )}
    </div>
  );
  return (
    <SwipeFeed
      kind="local"
      title={category?.title ?? "ROLL WITH ME."}
      description={
        category?.purpose ?? "Your area. Your people. Something to get into."
      }
      initialDiscovery={state}
      localView={{
        cards,
        tabs,
        controls,
        empty,
        directoryHref,
        feedLabel: category ? "Local activities" : "Activity categories",
      }}
    />
  );
}
