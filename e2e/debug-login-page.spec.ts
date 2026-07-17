import { test } from "@playwright/test";

test("Debug login page structure", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({
    path: ".e2e/screenshots/debug-login-page.png",
    fullPage: true,
  });

  // Get page HTML
  const html = await page.content();
  console.log("=== LOGIN PAGE HTML ===");
  console.log(html.substring(0, 5000));

  // Check for form elements
  const forms = await page.locator("form").count();
  console.log(`Found ${forms} form elements`);

  const emailInputs = await page.locator('input[type="email"]').count();
  console.log(`Found ${emailInputs} email inputs`);

  const allButtons = await page.locator("button").count();
  console.log(`Found ${allButtons} buttons`);

  const submitButtons = await page.locator('button[type="submit"]').count();
  console.log(`Found ${submitButtons} submit buttons`);

  // List all buttons
  const buttons = await page.locator("button").all();
  for (let i = 0; i < buttons.length && i < 10; i++) {
    const text = await buttons[i].textContent();
    const type = await buttons[i].getAttribute("type");
    const classes = await buttons[i].getAttribute("class");
    console.log(
      `Button ${i}: type="${type}", text="${text?.trim()}", class="${classes}"`,
    );
  }
});
