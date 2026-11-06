import { test, expect } from "@playwright/test";
import { activityCategories, londonAreas } from "../../src/lib/structure";

test("entry asks for an explicit catchment", async ({ page }) => {
  await page.goto("/roll-with-me");
  await expect(page.getByRole("group", { name: "Choose your London area" }).getByRole("button")).toHaveCount(4);
  await expect(page.getByRole("region", { name: "Activity categories" })).toHaveCount(0);
  await page.goto("/roll-with-me?area=Unknown");
  await expect(page.getByRole("status")).toContainText("Choose North, East, South or West");
});

test("tablet directory keeps its artwork, layout and keyboard navigation", async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.goto("/roll-with-me?area=North");
  const feed = page.getByRole("region", { name: "Activity categories" });
  await feed.focus();
  await feed.press("ArrowDown");
  await expect(page.getByRole("article", { name: /2 of 7: TECH & ENGINEERING/ })).toBeInViewport();
  await feed.press("ArrowUp");
  await expect(page.getByRole("article", { name: /1 of 7: SPORT & MOVEMENT/ })).toBeInViewport();
  const firstCategory = page.getByRole("link", { name: "Explore Sport & Movement", exact: true });
  await firstCategory.focus();
  await expect(firstCategory).toBeFocused();
  await firstCategory.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("SPORT & MOVEMENT.");
  const image = page.locator(".local-empty-art img");
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

for (const area of londonAreas) test(`${area} has all seven categories and all seven category routes`, async ({ page }, testInfo) => {
  await page.goto(`/roll-with-me?area=${area}`);
  const directory = page.getByRole("region", { name: "Activity categories" });
  await expect(directory.locator("h2")).toHaveText(activityCategories.map(c => c.title));
  await expect(page.locator(".opportunity-card")).toHaveCount(0);
  await expect(directory.locator("img")).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  if (area === "North") await page.screenshot({ path: `/private/tmp/rwm-directory-${testInfo.project.name}.png`, fullPage: true });
  for (const category of activityCategories) {
    await page.goto(`/roll-with-me/categories/${category.slug}?area=${area}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(category.title);
    await expect(page.getByText("NO LOCAL ACTIVITIES YET.", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: `← All seven categories in ${area} London` })).toHaveAttribute("href", new RegExp(`area=${area}`));
    await expect(page.locator(".opportunity-card")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("changing catchment retains category and age, clears invalid locality, and supports vocational discovery", async ({ page }) => {
  await page.goto("/roll-with-me/categories/pick-a-vocation?area=North&borough=camden&age=16%E2%80%9317&vocation=carpentry");
  await expect(page.getByLabel("Vocational specialism")).toHaveValue("carpentry");
  await page.getByRole("button", { name: /^West(?: London)?$/ }).click();
  await expect(page).toHaveURL(/categories\/pick-a-vocation\?area=West/);
  await expect(page.getByLabel("Choose age band")).toHaveValue("16–17");
  await expect(page.getByLabel("Choose your borough")).toHaveValue("");
  await expect(page.getByRole("status")).toContainText("borough filter was cleared");
  await expect(page.getByLabel("Vocational specialism")).toHaveValue("carpentry");
  await page.getByLabel("Vocational specialism").selectOption("plumbing");
  await expect(page).toHaveURL(/vocation=plumbing/);
});

test("demos require opting in, stay in their region and remain non-bookable", async ({ page }) => {
  await page.goto("/roll-with-me/categories/tech-engineering?area=West");
  await page.getByRole("checkbox", { name: /Show demo previews/ }).check();
  await expect(page.getByRole("heading", { name: "MAKE YOUR MARK", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "BUILD SOMETHING.", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "See the session", exact: true }).click();
  await expect(page.getByRole("button", { name: "Preview — booking not open" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "Register your interest", exact: true })).toHaveCount(0);
  await page.goto("/opportunities/build-something?area=West&age=13%E2%80%9315");
  await expect(page.getByText(/not available in your selected area/)).toBeVisible();
  await expect(page.getByText(/not eligible for your selected age band/)).toBeVisible();
});

test("legacy directory and area links preserve the location-first hierarchy", async ({ page }) => {
  await page.goto("/roll-with-me/categories?area=South&age=16%E2%80%9317");
  await expect(page.getByRole("region", { name: "Activity categories" }).locator("h2")).toHaveCount(7);
  await page.goto("/roll-with-me/east/hackney?age=16%E2%80%9317");
  await expect(page).toHaveURL(/roll-with-me\?area=East/);
  await expect(page.getByLabel("Choose your borough")).toHaveValue("Hackney");
  await expect(page.getByRole("region", { name: "Activity categories" }).locator("h2")).toHaveCount(7);
});
