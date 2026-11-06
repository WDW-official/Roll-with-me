import { describe, expect, it } from "vitest";
import {
  cloudinaryBase,
  cloudinaryLoader,
  cloudinaryRetryLoader,
  isPublicCloudinaryImage,
  resolveImageSource,
} from "../../src/lib/image-delivery";
import { editorialMedia } from "../../src/lib/editorial-media";

const original = `${cloudinaryBase}v1794001366/Conflict_Resolution_1_csqjwm.png`;

describe("responsive image delivery", () => {
  it("accepts full URLs without appending a second Cloudinary prefix", () => {
    expect(resolveImageSource(original)).toBe(original);
    expect(
      resolveImageSource("v1794001366/Conflict_Resolution_1_csqjwm.png"),
    ).toBe(original);
    expect(resolveImageSource("/images/categories/creative.png")).toBe(
      "/images/categories/creative.png",
    );
    for (const asset of Object.values(editorialMedia)) {
      expect(isPublicCloudinaryImage(asset.src)).toBe(true);
      expect(asset.src.match(/https:\/\//g)).toHaveLength(1);
    }
  });
  it("requests resized and automatically compressed images directly from the CDN", () => {
    const url = cloudinaryLoader({ src: original, width: 960 });
    expect(url).toBe(
      `${cloudinaryBase}f_auto,q_auto,c_limit,w_960/v1794001366/Conflict_Resolution_1_csqjwm.png`,
    );
    expect(url).not.toContain("/_next/image");
  });
  it("preserves existing still-frame transforms before optimizing delivery", () => {
    const source = `${cloudinaryBase}pg_1,f_png/v123/animation.png`;
    expect(cloudinaryLoader({ src: source, width: 640 })).toBe(
      `${cloudinaryBase}pg_1,f_png/f_auto,q_auto,c_limit,w_640/v123/animation.png`,
    );
  });
  it("leaves local files and signed/private image URLs intact", () => {
    for (const src of [
      "/images/categories/creative.png",
      "https://example.com/image.png",
      `${cloudinaryBase}s--signature--/v123/image.png`,
      `${cloudinaryBase}v123/image.png?__cld_token__=private`,
    ]) {
      expect(isPublicCloudinaryImage(src)).toBe(false);
      expect(cloudinaryLoader({ src, width: 640 })).toBe(src);
    }
  });
  it("uses a smaller JPEG for the bounded recovery attempt", () => {
    expect(cloudinaryRetryLoader({ src: original, width: 1920 })).toContain(
      "f_jpg,q_auto:eco,c_limit,w_640/",
    );
    expect(cloudinaryLoader({ src: original, width: 3840 })).toContain(
      "w_2560/",
    );
  });
});
