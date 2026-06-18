import { chromium, test, expect } from "@playwright/test";

test("Launch amazon", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://amazon.in/");
  await expect(page).toHaveTitle(/India/i);

  const searchBar = page.getByPlaceholder("Search Amazon.in");
  await searchBar.click();
  await searchBar.pressSequentially("Iphone 17 pro", { delay: 50 });
  await searchBar.press("Enter");
  await page.waitForLoadState();
  await expect(page).toHaveTitle(/Iphone 17 pro/i);

  const [newpage] = await Promise.all([
    context.waitForEvent("page"),
    await page.getByText("iPhone 17 Pro").nth(1).click(),
  ]);
  await newpage.waitForLoadState();
  await expect(newpage).toHaveTitle(/Iphone 17 pro/i);
});
