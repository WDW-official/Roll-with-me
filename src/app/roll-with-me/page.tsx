import { redirect } from "next/navigation";
import { LocalActivities } from "@/components/local-activities";
import { getAreaBoroughs } from "@/lib/content";
import { localDiscoveryState } from "@/lib/local-discovery";
import { discoveryHref } from "@/lib/structure";
export const metadata = { title: "Roll With Me — Your area" };
export default async function Local({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [query, areaBoroughs] = await Promise.all([searchParams, getAreaBoroughs()]);
  const { state, boroughCleared } = localDiscoveryState(query, areaBoroughs);
  if (state.category) redirect(discoveryHref(state));
  return <LocalActivities state={state} areaBoroughs={areaBoroughs} boroughCleared={boroughCleared} />;
}
