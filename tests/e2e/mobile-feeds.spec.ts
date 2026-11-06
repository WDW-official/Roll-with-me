import { test, expect } from "@playwright/test";
test("old branch URLs redirect to The Street and retain query parameters", async ({ page, request }) => {
  const branchRedirect = await request.get("/know-the-rules/the-terrain", { maxRedirects: 0 });
  expect(branchRedirect.status()).toBe(308);
  expect(branchRedirect.headers().location).toBe("/know-the-rules/the-street");
  const response = await request.get("/know-the-rules/the-terrain/read-the-situation?from=legacy", { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/know-the-rules/the-street/read-the-situation?from=legacy");
  await page.goto("/know-the-rules/the-terrain/read-the-situation?from=legacy");
  await expect(page).toHaveURL(/the-street\/read-the-situation\?from=legacy/);
  await expect(page.getByRole("link", { name: "THE STREET.", exact: true })).toBeVisible();
  await expect(page.locator(".has-editorial-image img")).toHaveCount(1);
});
test("the law and street lead to distinct topic pages", async ({
  page
}) => {
  await page.goto("/know-the-rules");
  await expect(page.getByRole("article", {
    name: /THE LAW/
  })).toBeInViewport();
  await page.getByRole("button", {
    name: "THE STREET",
    exact: true
  }).click();
  await expect(page.getByRole("article", {
    name: /READ THE SITUATION/
  })).toBeInViewport();
  await page.getByRole("link", {
    name: "Explore the topic",
    exact: true
  }).first().click();
  await expect(page).toHaveURL(/the-street\/read-the-situation/);
  await expect(page.getByRole("heading", {
    level: 1
  })).toHaveText("READ THE SITUATION.");
  await page.getByRole("link", {
    name: "I’m a parent or carer",
    exact: true
  }).click();
  await expect(page.getByLabel("Who is asking? *")).toHaveValue("parent_carer");
  await expect(page.getByText("READ THE SITUATION.", {
    exact: true
  })).toBeVisible();
});
test("learning branches lead to fields and existing introductory articles", async ({
  page
}) => {
  await page.goto("/choose-a-path");
  await page.getByRole("button", {
    name: "Tech & Engineering",
    exact: true
  }).click();
  await expect(page.getByRole("article", {
    name: /WEB DEVELOPMENT/
  })).toBeInViewport();
  await page.getByRole("link", {
    name: "See where to start",
    exact: true
  }).first().click();
  await expect(page).toHaveURL(/tech-engineering\/web-development/);
  await expect(page.getByRole("heading", {
    name: "START WITH THE BASICS."
  })).toBeVisible();
  await expect(page.getByRole("link", {
    name: /AN IDEA. A SCREEN. A START/
  })).toBeVisible();
  await page.goto("/choose-a-path/vocational-practical/motor-vehicle-mechanics");
  await expect(page.getByRole("heading", {
    level: 1
  })).toHaveText("MOTOR VEHICLE MECHANICS.");
});
test("area, age and category choices survive opening a local listing", async ({
  page
}) => {
  await page.goto("/roll-with-me");
  await page.getByRole("button", {
    name: /^East(?: London)?$/
  }).click();
  await page.getByLabel("Choose your borough").selectOption("Hackney");
  await page.getByLabel("Choose age band").selectOption("16–17");
  await page.getByRole("link", { name: "Explore Sport & Movement", exact: true }).click();
  await page.getByRole("checkbox", { name: /Show demo previews/ }).check();
  await expect(page).toHaveURL(/category=sport-movement/);
  await page.getByRole("link", {
    name: "See the session",
    exact: true
  }).first().click();
  await expect(page.getByRole("navigation", {
    name: "Your local discovery selection"
  })).toBeVisible();
  await page.getByRole("link", {
    name: "← Back to Hackney",
    exact: true
  }).click();
  await expect(page.getByLabel("Choose age band")).toHaveValue("16–17");
  await expect(page.getByLabel("Choose activity category")).toHaveValue("sport-movement");
});
test("ten story spaces are distinguished from supplied real stories", async ({
  page
}) => {
  await page.goto("/the-real/collection");
  await expect(page.getByRole("link", {
    name: /^STORY \d/
  })).toHaveCount(10);
  await page.goto("/the-real/collection/st01");
  await expect(page.getByRole("heading", {
    level: 1
  })).toHaveText("THIS STORY STARTS WITH ITS VOICE.");
  await expect(page.getByText("No account, identity, event or outcome is being invented", {
    exact: false
  })).toBeVisible();
});
test("parent reply preferences remain explicit and the preview does not submit", async ({
  page
}) => {
  await page.goto("/ask-rwm?topic=pathways&context=paths&requester=parent_carer");
  await page.getByLabel("Your relationship *").selectOption("parent");
  await page.getByLabel("A short, general question *").fill("A general question about a learning path.");
  await page.getByLabel("I would like a reply by email.").check();
  await page.getByLabel("A safe email address *").fill("parent@example.org");
  await page.getByRole("checkbox", {
    name: /This is a safe address/
  }).check();
  await page.getByRole("checkbox", {
    name: /I have read how this request/
  }).check();
  await page.getByRole("button", {
    name: "Try preview submission"
  }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Nothing has been submitted or saved" })).toBeVisible();
});
