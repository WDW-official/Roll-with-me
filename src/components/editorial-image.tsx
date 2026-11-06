"use client";

import { ResilientImage } from "./resilient-image";
import { useEffect, useRef, useState } from "react";
import type { EditorialAsset } from "@/lib/editorial-media";

export function EditorialImage({
  asset,
  sizes = "(max-width: 700px) 100vw, 1100px",
  animate = false,
}: {
  asset: EditorialAsset;
  sizes?: string;
  animate?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!asset.animationSrc || !container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setPlaying(false);
    });
    observer.observe(container.current);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (preference.matches) setPlaying(false);
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
    };
  }, [asset.animationSrc]);
  return (
    <div ref={container} className="editorial-image">
      <ResilientImage
        src={playing && asset.animationSrc ? asset.animationSrc : asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        style={{ objectPosition: asset.position }}
        unoptimized={playing}
        onUnavailable={playing ? () => setPlaying(false) : undefined}
      />
      {animate && asset.animationSrc && (
        <button
          type="button"
          className="editorial-animation-toggle"
          aria-pressed={playing}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? "Pause animation" : "Play animation"}
        </button>
      )}
    </div>
  );
}
