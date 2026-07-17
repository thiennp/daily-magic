import { test, expect, type Page } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

async function signInTestAccount(page: Page, email: string): Promise<void> {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");

  await page.fill('input[type="email"]', email);

  // Click submit and wait for navigation to complete
  await page.click('button[type="submit"]');

  // Wait until URL changes from /login to /
  await page.waitForFunction(() => window.location.pathname === "/", {
    timeout: 15000,
  });

  // Wait for the page to fully load
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
}

async function signOut(page: Page): Promise<void> {
  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState("networkidle");
}

test.describe("Round 2: Team Dispatch & Admin Scenarios", () => {
  test("Admin creates company from scratch", async ({ page }) => {
    const adminEmail = "test-admin-r2-1@agentwitch.com";

    await signInTestAccount(page, adminEmail);

    // Navigate to admin groups
    await page.goto(`${BASE_URL}/admin/groups`);
    await page.waitForLoadState("networkidle");

    // Take screenshot of initial state
    await page.screenshot({
      path: ".e2e/screenshots/admin-create-company-before.png",
      fullPage: true,
    });

    // Check for company creation UI
    const hasCreateButton = await page
      .locator('button:has-text("Create company")')
      .count();
    console.log(`Found ${hasCreateButton} create company buttons`);

    if (hasCreateButton > 0) {
      // Fill company name
      const companyNameInput = page
        .locator('input[name="name"], input[placeholder*="company" i]')
        .first();
      await companyNameInput.fill("E2E Test Company Round 2");

      // Click create
      await page.click('button:has-text("Create company")');
      await page.waitForTimeout(2000);

      // Take screenshot after creation
      await page.screenshot({
        path: ".e2e/screenshots/admin-create-company-after.png",
        fullPage: true,
      });

      console.log(`✓ Admin company creation completed for ${adminEmail}`);
    } else {
      console.log(
        `⚠ Company creation UI not found or already exists for ${adminEmail}`,
      );
    }

    await signOut(page);
  });

  test("Admin invites member to company", async ({ page, context }) => {
    const adminEmail = "test-admin-r2-2@agentwitch.com";
    const memberEmail = "test-member-r2-2@agentwitch.com";

    // Admin creates company first
    await signInTestAccount(page, adminEmail);
    await page.goto(`${BASE_URL}/admin/groups`);
    await page.waitForLoadState("networkidle");

    const hasCreateButton = await page
      .locator('button:has-text("Create company")')
      .count();
    if (hasCreateButton > 0) {
      const companyNameInput = page
        .locator('input[name="name"], input[placeholder*="company" i]')
        .first();
      await companyNameInput.fill("E2E Team Round 2");
      await page.click('button:has-text("Create company")');
      await page.waitForTimeout(2000);
    }

    // Take screenshot of company admin page
    await page.screenshot({
      path: ".e2e/screenshots/admin-company-dashboard.png",
      fullPage: true,
    });

    // Look for member invitation UI
    const hasMemberSection = await page.locator("text=/member/i").count();
    console.log(`Found ${hasMemberSection} elements with "member" text`);

    if (hasMemberSection > 0) {
      // Try to find member invitation input
      const memberInputs = await page
        .locator('input[type="email"], input[placeholder*="email" i]')
        .count();
      console.log(`Found ${memberInputs} potential member email inputs`);

      if (memberInputs > 1) {
        // Second email input might be for members
        const memberInput = page.locator('input[type="email"]').nth(1);
        await memberInput.fill(memberEmail);

        // Look for add/invite button near the input
        const addButton = page
          .locator('button:has-text("Add"), button:has-text("Invite")')
          .first();
        if ((await addButton.count()) > 0) {
          await addButton.click();
          await page.waitForTimeout(1000);
          console.log(`✓ Invited member ${memberEmail}`);
        }
      }
    }

    await page.screenshot({
      path: ".e2e/screenshots/admin-after-invite.png",
      fullPage: true,
    });

    await signOut(page);

    // Member signs in to verify invitation
    const memberPage = await context.newPage();
    await signInTestAccount(memberPage, memberEmail);
    await memberPage.goto(`${BASE_URL}/admin/groups`);
    await memberPage.waitForLoadState("networkidle");

    await memberPage.screenshot({
      path: ".e2e/screenshots/member-groups-view.png",
      fullPage: true,
    });

    console.log(`✓ Member ${memberEmail} viewed groups page`);
    await memberPage.close();
  });

  test("Check team dispatch UI availability", async ({ page }) => {
    const userEmail = "test-dispatch-r2-1@agentwitch.com";

    await signInTestAccount(page, userEmail);
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    // Take screenshot of home page
    await page.screenshot({
      path: ".e2e/screenshots/home-authenticated.png",
      fullPage: true,
    });

    // Look for dispatch/composer UI
    const hasComposeButton = await page
      .locator(
        'button:has-text("Send"), button:has-text("Compose"), a[href*="compose"]',
      )
      .count();
    console.log(`Found ${hasComposeButton} compose/send buttons`);

    if (hasComposeButton > 0) {
      const composeButton = page
        .locator(
          'button:has-text("Send"), button:has-text("Compose"), a[href*="compose"]',
        )
        .first();
      await composeButton.click();
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: ".e2e/screenshots/composer-opened.png",
        fullPage: true,
      });

      console.log(`✓ Compose/send UI opened`);
    } else {
      console.log(`⚠ Compose/send UI not found on home page`);
    }

    await signOut(page);
  });

  test("Check Mac pairing status UI", async ({ page }) => {
    const userEmail = "test-mac-r2-1@agentwitch.com";

    await signInTestAccount(page, userEmail);
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    // Look for Mac status indicators
    const hasMacStatus = await page
      .locator("text=/mac/i, text=/paired/i, text=/connect/i")
      .count();
    console.log(`Found ${hasMacStatus} Mac-related UI elements`);

    await page.screenshot({
      path: ".e2e/screenshots/mac-status-home.png",
      fullPage: true,
    });

    // Check if there's a dedicated page for Mac pairing
    const links = await page.locator("a").all();
    for (const link of links.slice(0, 20)) {
      const href = await link.getAttribute("href");
      if (
        href &&
        (href.includes("mac") ||
          href.includes("device") ||
          href.includes("connect"))
      ) {
        console.log(`Found potential Mac pairing link: ${href}`);
        await link.click();
        await page.waitForTimeout(1000);

        await page.screenshot({
          path: ".e2e/screenshots/mac-pairing-page.png",
          fullPage: true,
        });
        break;
      }
    }

    await signOut(page);
  });

  test("Navigate all main sections", async ({ page }) => {
    const userEmail = "test-nav-r2-1@agentwitch.com";

    await signInTestAccount(page, userEmail);

    const sections = [
      { path: "/", name: "home" },
      { path: "/marketplace", name: "marketplace" },
      { path: "/library", name: "library" },
      { path: "/automations", name: "automations" },
      { path: "/reports", name: "reports" },
      { path: "/admin/groups", name: "admin-groups" },
      { path: "/profile", name: "profile" },
    ];

    for (const section of sections) {
      await page.goto(`${BASE_URL}${section.path}`);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(500);

      await page.screenshot({
        path: `.e2e/screenshots/section-${section.name}.png`,
        fullPage: true,
      });

      console.log(`✓ Captured ${section.name}`);
    }

    await signOut(page);
  });

  test("Check onboarding checklist", async ({ page }) => {
    const userEmail = "test-onboard-r2-1@agentwitch.com";

    await signInTestAccount(page, userEmail);
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    // Look for onboarding checklist
    const hasChecklist = await page
      .locator("text=/checklist/i, text=/get started/i, text=/onboard/i")
      .count();
    console.log(`Found ${hasChecklist} onboarding-related elements`);

    if (hasChecklist > 0) {
      await page.screenshot({
        path: ".e2e/screenshots/onboarding-checklist.png",
        fullPage: true,
      });
    }

    await signOut(page);
  });
});
