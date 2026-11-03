import { SwipeFeed } from "@/components/swipe-feed";
import { getOpportunities, getAreaBoroughs } from "@/lib/content";
import { discoveryState } from "@/lib/structure";
export const metadata = {
  title: "Roll With Me — Your area"
};
export default async function Local({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [query, opportunities, areaBoroughs] = await Promise.all([searchParams, getOpportunities(), getAreaBoroughs()]);
  const state = discoveryState(query);
  if (!(areaBoroughs[state.area] ?? []).includes(state.borough)) state.borough = "";
  return <SwipeFeed key={JSON.stringify(state)} kind="local" opportunities={opportunities} initialDiscovery={state} areaBoroughs={areaBoroughs} />;
}
