import { TileArt } from "./art";
import { imageSlots } from "@/lib/image-plan";
import type { ArtKind } from "@/lib/structure";
import { editorialAssetForRoute } from "@/lib/editorial-media";
import { EditorialImage } from "./editorial-image";
/** Supplied page artwork with original RWM art as the fallback. */
export function EditorialArt({
  slot,
  kind,
  route,
}: {
  slot: string;
  kind?: ArtKind;
  route?: string;
}) {
  const plan = imageSlots.find((s) => s.id === slot);
  const asset = route ? editorialAssetForRoute(route) : undefined;
  return (
    <div
      className={`editorial-art${asset ? " has-editorial-image" : ""}`}
      data-image-slot={route ?? plan?.id}
    >
      {asset ? (
        <EditorialImage key={asset.src} asset={asset} animate />
      ) : (
        <TileArt kind={kind ?? plan?.fallback ?? "route"} />
      )}
    </div>
  );
}
