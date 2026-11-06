import type { Opportunity } from "./types";
import {
  activityMatchesCategory,
  discoveryState,
  type DiscoveryState,
} from "./structure";
import { publishableOpportunity } from "./policy";

export const boroughSlug = (name: string) =>
  name.toLowerCase().replaceAll(" ", "-");

export function localDiscoveryState(
  query: Record<string, string | string[] | undefined>,
  areas: Record<string, string[]>,
) {
  const state = discoveryState(query);
  const borough = (areas[state.area] ?? []).find(
    (b) => b === state.borough || boroughSlug(b) === state.borough,
  );
  const boroughCleared =
    (!!state.borough && !borough) || query.notice === "borough-cleared";
  return { state: { ...state, borough: borough ?? "" }, boroughCleared };
}

export function inCatchment(o: Opportunity, area: string) {
  return !!area && (o.catchments ?? [o.zone]).some((a) => a === area);
}

export function eligibleForAge(o: Opportunity, age: string) {
  return !age || o.ageBands.some((a) => a === age);
}

export function bookableOpportunity(o: Opportunity, age = "") {
  return (
    publishableOpportunity(o) &&
    eligibleForAge(o, age) &&
    (!o.ageBands.some((a) => a !== "18–20") || o.guardianConsent)
  );
}

export function visibleLocalOpportunities(
  items: Opportunity[],
  state: DiscoveryState,
  demosEnabled = false,
) {
  return items
    .filter(
      (o) =>
        inCatchment(o, state.area) &&
        activityMatchesCategory(o, state.category) &&
        (!state.borough ||
          (o.boroughs ?? [o.borough]).includes(state.borough)) &&
        eligibleForAge(o, state.age) &&
        (!state.vocation || o.vocation === state.vocation) &&
        (o.demo
          ? demosEnabled && state.preview === "demo"
          : bookableOpportunity(o)),
    )
    .sort((a, b) =>
      state.sort === "title"
        ? a.title.localeCompare(b.title)
        : a.date.localeCompare(b.date),
    );
}
