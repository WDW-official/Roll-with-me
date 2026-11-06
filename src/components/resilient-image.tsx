"use client";

import { getImageProps, type ImageProps } from "next/image";
import { preload } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  cloudinaryLoader,
  cloudinaryRetryLoader,
  imageFallback,
  isPublicCloudinaryImage,
  resolveImageSource,
} from "@/lib/image-delivery";

type Props = Omit<ImageProps, "src" | "loader" | "onError" | "overrideSrc"> & {
  src: string;
  mobileSrc?: string;
  pictureClassName?: string;
  onUnavailable?: () => void;
};

export function ResilientImage(props: Props) {
  const src = resolveImageSource(props.src);
  const mobileSrc = props.mobileSrc
    ? resolveImageSource(props.mobileSrc)
    : undefined;
  return (
    <RecoveringImage
      key={`${src}|${mobileSrc}|${props.unoptimized ?? false}`}
      {...props}
      src={src}
      mobileSrc={mobileSrc}
    />
  );
}

function RecoveringImage({
  src,
  mobileSrc,
  pictureClassName,
  onUnavailable,
  ...props
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const picture = useRef<HTMLPictureElement>(null);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const loadTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const unavailable = attempt >= 2;
  const imageSrc = unavailable ? imageFallback : src;
  const loaderFor = (source: string) =>
    !unavailable && isPublicCloudinaryImage(source) && !props.unoptimized
      ? attempt === 0
        ? cloudinaryLoader
        : cloudinaryRetryLoader
      : undefined;
  const loader = loaderFor(imageSrc);
  const unoptimized =
    unavailable || props.unoptimized || (attempt > 0 && !loader);
  const mobile =
    mobileSrc && !unavailable
      ? getImageProps({
          ...props,
          src: mobileSrc,
          loader: loaderFor(mobileSrc),
          unoptimized,
        }).props
      : undefined;
  const image = getImageProps({
    ...props,
    src: imageSrc,
    loader,
    unoptimized,
    alt:
      unavailable && props.alt ? `${props.alt} (image unavailable)` : props.alt,
  }).props;
  if ((props.priority || props.preload) && attempt === 0 && !mobileSrc) {
    preload(image.src, {
      as: "image",
      imageSrcSet: image.srcSet,
      imageSizes: image.sizes,
      fetchPriority: "high",
    });
  }
  const recover = useCallback(() => {
    if (unavailable) return;
    clearTimeout(retryTimer.current);
    clearTimeout(loadTimer.current);
    if (attempt === 0) {
      retryTimer.current = setTimeout(() => setAttempt(1), 400);
    } else {
      setAttempt(2);
      onUnavailable?.();
    }
  }, [attempt, unavailable, onUnavailable]);
  useEffect(() => {
    const image = picture.current?.querySelector("img");
    if (!image || unavailable) return;
    // Include failures that happened before hydration without re-requesting
    // the failed URL to replay an error event.
    image.addEventListener("error", recover);
    if (image.complete && image.naturalWidth === 0) recover();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!(image.complete && image.naturalWidth > 0))
        loadTimer.current = setTimeout(recover, 12000);
    });
    observer.observe(image);
    return () => {
      observer.disconnect();
      image.removeEventListener("error", recover);
      clearTimeout(retryTimer.current);
      clearTimeout(loadTimer.current);
    };
  }, [unavailable, recover]);
  return (
    <picture ref={picture} className={pictureClassName}>
      {mobile && (
        <source
          media="(max-width: 700px)"
          srcSet={mobile.srcSet ?? mobile.src}
          sizes={mobile.sizes}
        />
      )}
      <img
        {...image}
        key={attempt}
        fetchPriority={
          props.priority || props.preload ? "high" : props.fetchPriority
        }
        data-image-state={
          unavailable ? "fallback" : attempt === 1 ? "retry" : "primary"
        }
        onLoad={(event) => {
          clearTimeout(retryTimer.current);
          clearTimeout(loadTimer.current);
          props.onLoad?.(event);
        }}
      />
    </picture>
  );
}
