import { notFound } from "next/navigation";
import { SwipeFeed } from "@/components/swipe-feed";
import { activityCategories, discoveryState } from "@/lib/structure";
import { getOpportunities, getAreaBoroughs } from "@/lib/content";
export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{
    category
  }, query, opportunities, areaBoroughs] = await Promise.all([params, searchParams, getOpportunities(), getAreaBoroughs()]);
  const item = activityCategories.find(c => c.slug === category);
  if (!item) notFound();
  const state = discoveryState({
    ...query,
    category
  });
  if (!(areaBoroughs[state.area] ?? []).includes(state.borough)) state.borough = "";
  return <SwipeFeed key={JSON.stringify(state)} kind="local" opportunities={opportunities} areaBoroughs={areaBoroughs} initialDiscovery={state} description={item.purpose} />;
}
