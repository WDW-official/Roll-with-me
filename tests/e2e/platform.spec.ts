import { test, expect } from "@playwright/test";
test("home supports keyboard navigation and a persistent theme", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
    }),
  ).toContainText("YOUR CITY.");
  const before = await page.locator("html").getAttribute("data-theme");
  await page
    .getByRole("button", {
      name: "Toggle colour theme",
    })
    .click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", before!);
  await page.reload();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", before!);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", {
      name: "Skip to content",
    }),
  ).toBeFocused();
});
test("manual filters narrow activities without requesting location", async ({
  page,
}) => {
  await page.goto("/opportunities");
  await page
    .getByLabel("Area", {
      exact: true,
    })
    .selectOption("North");
  await page.getByLabel("Your age band").selectOption("16–17");
  await page.getByLabel("What’s your next move?").fill("code");
  await expect(
    page.getByRole("heading", {
      name: "BUILD SOMETHING.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "COURT CULTURE",
    }),
  ).toHaveCount(0);
  await page
    .getByRole("button", {
      name: "Reset filters",
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "COURT CULTURE",
    }),
  ).toBeVisible();
});
test("demo submissions fail closed and explain that nothing was saved", async ({
  request,
}) => {
  const r = await request.post("/api/ask", {
    headers: {
      origin: "http://localhost:3000",
    },
    data: {
      topic: "general",
      ageBand: "16–17",
      message: "A general question",
      privacyAccepted: true,
    },
  });
  expect(r.status()).toBe(503);
  expect((await r.json()).error).toContain(
    "Nothing has been submitted or saved",
  );
});
test("writes reject other origins", async ({ request }) => {
  const r = await request.post("/api/auth/sign-in", {
    headers: {
      origin: "https://untrusted.example",
    },
    data: {
      email: "x@example.org",
      password: "examplepassword",
    },
  });
  expect(r.status()).toBe(403);
});
test("private endpoints expose no records in demo mode", async ({
  request,
}) => {
  for (const route of [
    "/api/admin/safeguarding",
    "/api/admin/audit",
    "/api/admin/surveys/000000000000000000000001/export",
  ]) {
    const r = await request.get(route);
    expect(r.status()).toBe(503);
    expect(await r.text()).not.toContain("records");
  }
});
test("legal previews show the actual review status", async ({ page }) => {
  await page.goto("/know-the-game/knives-and-consequences");
  await expect(
    page.getByText("PRE-LAUNCH / REQUIRES LAWYER REVIEW"),
  ).toBeVisible();
  await expect(page.getByText("Not yet appointed")).toBeVisible();
  await expect(
    page.getByText("not a general right to carry a knife", {
      exact: false,
    }),
  ).toBeVisible();
});
test("shop bag works while payment stays unavailable", async ({ page }) => {
  await page.goto("/shop/the-everyday-hoodie");
  await page
    .getByRole("button", {
      name: "M",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "Add to demo bag",
    })
    .click();
  await page.goto("/cart");
  await expect(
    page.getByRole("heading", {
      name: "THE EVERYDAY HOODIE",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", {
      name: "Checkout information",
    })
    .click();
  await expect(
    page.getByText("no payment information is collected", {
      exact: false,
    }),
  ).toBeVisible();
});
test("page routes render without horizontal overflow", async ({ page }) => {
  for (const route of [
    "/",
    "/your-area/east",
    "/stories/the-other-route",
    "/parents",
    "/surveys/your-next-move",
    "/admin/content",
    "/privacy",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
  }
});
