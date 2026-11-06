import type { ImageLoaderProps } from "next/image";

export const cloudinaryBase =
  "https://res.cloudinary.com/dzn1k1z8r/image/upload/";
export const imageFallback = "/images/image-unavailable.svg";

/** Accept either a complete URL or a versioned Cloudinary asset path. */
export function resolveImageSource(src: string): string {
  const source = src.trim();
  if (/^https?:\/\//i.test(source) || source.startsWith("/")) return source;
  return cloudinaryBase + source;
}

export function isPublicCloudinaryImage(src: string): boolean {
  try {
    const url = new URL(src);
    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      /^\/[^/]+\/image\/upload\//.test(url.pathname) &&
      !/\/s--[^/]+--\//.test(url.pathname) &&
      !url.searchParams.has("__cld_token__")
    );
  } catch {
    return false;
  }
}

function deliveryUrl(
  src: string,
  width: number,
  compatibility = false,
  quality?: number,
): string {
  if (!isPublicCloudinaryImage(src)) return src;
  const url = new URL(src);
  const marker = "/image/upload/";
  const [prefix, resource] = url.pathname.split(marker);
  const parts = resource.split("/");
  const version = parts.findIndex((part) => /^v\d+$/.test(part));
  const limit = compatibility ? 640 : 2560;
  const requestedWidth = Number.isFinite(width) ? width : 640;
  const size = Math.max(32, Math.min(limit, Math.round(requestedWidth)));
  const compression = compatibility
    ? "auto:eco"
    : quality
      ? String(Math.max(1, Math.min(100, Math.round(quality))))
      : "auto";
  // Apply delivery optimization after existing transforms, such as a GIF's still frame.
  parts.splice(
    version >= 0 ? version : 0,
    0,
    `f_${compatibility ? "jpg" : "auto"},q_${compression},c_limit,w_${size}`,
  );
  url.pathname = prefix + marker + parts.join("/");
  return url.toString();
}

export function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  return deliveryUrl(src, width, false, quality);
}

export function cloudinaryRetryLoader({
  src,
  width,
}: ImageLoaderProps): string {
  return deliveryUrl(src, width, true);
}
