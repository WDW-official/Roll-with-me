import { notFound, redirect } from "next/navigation";
import { getAreaBoroughs } from "@/lib/content";
import { londonAreas, discoveryState, discoveryHref } from "@/lib/structure";
import { boroughSlug } from "@/lib/local-discovery";
export default async function BoroughPage({
  params,
  searchParams,
}: {
  params: Promise<{ area: string; borough: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [p, query, areas] = await Promise.all([
    params,
    searchParams,
    getAreaBoroughs(),
  ]);
  const area = londonAreas.find(
    (a) => a.toLowerCase() === p.area.toLowerCase(),
  );
  const borough = area
    ? (areas[area] ?? []).find((b) => boroughSlug(b) === p.borough)
    : undefined;
  if (!area || !borough) notFound();
  redirect(discoveryHref(discoveryState({ ...query, area, borough })));
}
