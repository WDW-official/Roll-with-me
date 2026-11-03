import { notFound } from "next/navigation";
import { SwipeFeed } from "@/components/swipe-feed";
import { getAreaBoroughs, getOpportunities } from "@/lib/content";
import { londonAreas, discoveryState } from "@/lib/structure";
export default async function BoroughPage({
  params,
  searchParams
}: {
  params: Promise<{
    area: string;
    borough: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [p, query, areas, opportunities] = await Promise.all([params, searchParams, getAreaBoroughs(), getOpportunities()]);
  const area = londonAreas.find(a => a.toLowerCase() === p.area);
  const borough = area ? areas[area].find(b => b.toLowerCase().replaceAll(" ", "-") === p.borough) : undefined;
  if (!area || !borough) notFound();
  const state = discoveryState({
    ...query,
    area,
    borough
  });
  return <SwipeFeed key={JSON.stringify(state)} kind="local" opportunities={opportunities} areaBoroughs={areas} initialDiscovery={state} />;
}
