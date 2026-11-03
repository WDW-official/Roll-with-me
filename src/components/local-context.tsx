import Link from "next/link";
import { discoveryState, discoveryHref, londonAreas } from "@/lib/structure";
export function LocalContext({
  query
}: {
  query: Record<string, string | string[] | undefined>;
}) {
  if (!query.area) return null;
  const state = discoveryState(query);
  return <nav className="local-context" aria-label="Your local discovery selection"><Link href={discoveryHref(state)}>← Back to {state.borough || `${state.area} London`}</Link><div aria-label="Change London area">{londonAreas.map(area => <Link key={area} href={discoveryHref({
        ...state,
        area,
        borough: ""
      })} aria-current={area === state.area ? "page" : undefined}>{area}</Link>)}</div></nav>;
}
