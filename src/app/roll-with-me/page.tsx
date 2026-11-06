import { redirect } from "next/navigation";
import { LocalActivities } from "@/components/local-activities";
import { getAreaBoroughs } from "@/lib/content";
import { localDiscoveryState } from "@/lib/local-discovery";
import { discoveryHref } from "@/lib/structure";
export const metadata = { title: "Roll With Me — Your area" };
export default async function Local({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  if (!query.area) {
    const params = new URLSearchParams({ area: "North" });
    for (const [key, value] of Object.entries(query)) {
      if (key === "area" || value === undefined) continue;
      for (const entry of Array.isArray(value) ? value : [value]) params.append(key, entry);
    }
    redirect(`/roll-with-me?${params}`);
  }
  const areaBoroughs = await getAreaBoroughs();
  const { state, boroughCleared } = localDiscoveryState(query, areaBoroughs);
  if (state.category) redirect(discoveryHref(state));
  return <LocalActivities state={state} areaBoroughs={areaBoroughs} boroughCleared={boroughCleared} />;
}
