import { test, expect } from "@playwright/test";

const sample =
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="#ff5500"/></svg>';

test("home images use responsive CDN URLs and retain the mobile artwork", async ({
  page,
}, testInfo) => {
  await page.route("https://res.cloudinary.com/**", (route) =>
    route.fulfill({ contentType: "image/svg+xml", body: sample }),
  );
  await page.goto("/");
  await page.locator(".pillar-launcher-grid").scrollIntoViewIfNeeded();
  await expect(page.locator(".pillar-card-image img")).toHaveCount(4);
  await expect
    .poll(() =>
      page
        .locator(".pillar-card-image img")
        .evaluateAll((images) =>
          images.every(
            (img) =>
              (img as HTMLImageElement).complete &&
              (img as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  const sources = await page
    .locator(".pillar-card-image img")
    .evaluateAll((images) =>
      images.map((img) => (img as HTMLImageElement).currentSrc),
    );
  for (const src of sources) {
    expect(src).toContain("res.cloudinary.com/");
    expect(src).toContain("f_auto,q_auto,c_limit,w_");
    expect(src).not.toContain("/_next/image");
    expect(src).toContain(
      testInfo.project.name === "mobile" ? "Mobile" : "Desktop",
    );
  }
});

test("a failed image retries with a smaller JPEG", async ({ page }) => {
  let attempts = 0;
  const candidates = new Set<string>();
  await page.route("https://res.cloudinary.com/**", async (route) => {
    if (route.request().url().includes("lbuhuh")) {
      attempts++;
      candidates.add(route.request().url());
      if (route.request().url().includes("f_auto"))
        return route.abort("timedout");
    }
    return route.fulfill({ contentType: "image/svg+xml", body: sample });
  });
  await page.goto("/know-the-rules");
  const image = page.getByRole("article", { name: /THE LAW/ }).locator("img");
  await expect(image).toHaveAttribute("data-image-state", "retry");
  await expect(image).toHaveAttribute("src", /f_jpg,q_auto:eco,c_limit,w_640/);
  await expect
    .poll(() => image.evaluate((img) => (img as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  // Chromium can repeat a failed srcset candidate while replacing an image.
  // The app must use only the primary candidate and one recovery candidate.
  expect(candidates.size).toBe(2);
  expect(attempts).toBeLessThanOrEqual(4);
});

test("persistent network failure shows a local image without a retry loop", async ({
  page,
}) => {
  let attempts = 0;
  const candidates = new Set<string>();
  await page.route("https://res.cloudinary.com/**", (route) => {
    attempts++;
    candidates.add(route.request().url());
    return route.abort("failed");
  });
  await page.goto("/know-the-rules");
  const image = page.getByRole("article", { name: /THE LAW/ }).locator("img");
  await expect(image).toHaveAttribute("data-image-state", "fallback");
  await expect(image).toHaveAttribute(
    "src",
    /\/images\/image-unavailable\.svg$/,
  );
  await expect
    .poll(() => image.evaluate((img) => (img as HTMLImageElement).naturalWidth))
    .toBe(1200);
  await expect(page.locator('img[data-image-state="fallback"]')).toHaveCount(2);
  expect(candidates.size).toBeLessThanOrEqual(4);
  expect(attempts).toBeLessThanOrEqual(8);
  const finishedAttempts = attempts;
  // Verify that recovery has stopped after the fallback, beyond the retry delay.
  await page.waitForTimeout(1000);
  expect(attempts).toBe(finishedAttempts);
  await expect(
    page.getByRole("link", { name: "Choose this route", exact: true }).first(),
  ).toHaveAttribute("href", "/know-the-rules/the-law");
});
