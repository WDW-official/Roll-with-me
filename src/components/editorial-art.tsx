import { TileArt } from "./art";
import { imageSlots } from "@/lib/image-plan";
import type { ArtKind } from "@/lib/structure";
/** Original artwork until a rights-cleared asset is assigned through the media workflow. */
export function EditorialArt({
  slot,
  kind
}: {
  slot: string;
  kind?: ArtKind;
}) {
  const plan = imageSlots.find(s => s.id === slot);
  return <div className="editorial-art" data-image-slot={plan?.id}><TileArt kind={kind ?? plan?.fallback ?? "route"} /></div>;
}
