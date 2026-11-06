import Link from "next/link";
import { discoveryState, discoveryHref, londonAreas } from "@/lib/structure";
import { boroughSlug } from "@/lib/local-discovery";
export function LocalContext({
  query,
}: {
  query: Record<string, string | string[] | undefined>;
}) {
  if (!query.area) return null;
  const state = discoveryState(query);
  if (!state.area) return null;
  const boroughLabel = state.borough
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
  return (
    <nav className="local-context" aria-label="Your local discovery selection">
      <Link
        href={discoveryHref({
          ...state,
          borough: state.borough ? boroughSlug(state.borough) : "",
        })}
      >
        ← Back to {boroughLabel || `${state.area} London`}
      </Link>
      <div aria-label="Change London area">
        {londonAreas.map((area) => (
          <Link
            key={area}
            href={
              discoveryHref({
                ...state,
                area,
                borough: "",
              }) + (state.borough ? "&notice=borough-cleared" : "")
            }
            aria-current={area === state.area ? "page" : undefined}
          >
            {area}
          </Link>
        ))}
      </div>
    </nav>
  );
}
