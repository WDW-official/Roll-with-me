import { notFound } from "next/navigation";
import { LocalActivities } from "@/components/local-activities";
import { activityCategories } from "@/lib/structure";
import { localDiscoveryState } from "@/lib/local-discovery";
import { getOpportunities, getAreaBoroughs } from "@/lib/content";
import { isDemo } from "@/lib/env";
export default async function CategoryPage({ params, searchParams }: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ category }, query, opportunities, areaBoroughs] = await Promise.all([params, searchParams, getOpportunities(), getAreaBoroughs()]);
  if (!activityCategories.some(c => c.slug === category)) notFound();
  const { state, boroughCleared } = localDiscoveryState({ ...query, category }, areaBoroughs);
  return <LocalActivities state={state} opportunities={opportunities} areaBoroughs={areaBoroughs} demosEnabled={isDemo} boroughCleared={boroughCleared} />;
}
