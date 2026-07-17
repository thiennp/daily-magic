import { test } from "@playwright/test";

test("Debug test-login API response", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.waitForLoadState("networkidle");

  // Listen for API responses
  page.on("response", (response) => {
    if (response.url().includes("/api/auth/test-login")) {
      console.log(`Test-login API status: ${response.status()}`);
      response
        .json()
        .then((body) => {
          console.log(`Test-login API response:`, JSON.stringify(body));
        })
        .catch(() => {
          console.log("Could not parse response as JSON");
        });
    }
  });

  // Listen for navigation
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) {
      console.log(`Navigated to: ${frame.url()}`);
    }
  });

  // Fill and submit
  const emailInput = page.locator('input[type="email"]');
  await emailInput.fill("test-debug@agentwitch.com");

  console.log("Clicking submit button...");
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();

  // Wait a bit to see what happens
  await page.waitForTimeout(5000);

  console.log(`Final URL: ${page.url()}`);

  // Take screenshot
  await page.screenshot({
    path: ".e2e/screenshots/debug-after-login.png",
    fullPage: true,
  });
});
