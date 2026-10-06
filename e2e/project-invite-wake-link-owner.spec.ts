import { expect, test, type Page } from "@playwright/test";

import { signInTestAccount } from "./helpers/signInTestAccount";

/**
 * Invite → wake owner UI: a redeemed bot is waiting for its wake link; the
 * owner follows the deep link, the Grok wake-link form expands, they paste,
 * and the row flips to "Wake link set".
 *
 * Needs a running app (playwright.config webServer) + a project owned by the
 * test account. Access + wake-link APIs are stubbed per test so no real bot
 * or Grok routine is needed:
 *   RUN_INVITE_WAKE_E2E=1 E2E_WAKE_OWNER_EMAIL=test-owner-1@agentwitch.com \
 *   E2E_WAKE_PROJECT_ID=<owned project id> npx playwright test project-invite-wake-link-owner
 */
const enabled = process.env.RUN_INVITE_WAKE_E2E === "1";
const ownerEmail = process.env.E2E_WAKE_OWNER_EMAIL ?? "";
const projectId = process.env.E2E_WAKE_PROJECT_ID ?? "";
const membershipId = "mem-e2e-coder";

const stubAccessApis = async (
  page: Page,
): Promise<{ saved: () => boolean }> => {
  const state = { saved: false };
  const member = () => ({
    id: membershipId,
    userId: "bot-e2e-coder-0001",
    role: "member",
    memberKind: "bot",
    status: "active",
    teamLabel: null,
    scopes: [],
    createdAt: "2026-10-06T06:00:00.000Z",
    projectDisplayName: "Coder",
    isAgent: true,
    wakeLinkSet: state.saved,
  });
  await page.route(`**/api/projects/${projectId}/access`, async (route) => {
    if (route.request().method() !== "GET") return route.fallback();
    await route.fulfill({
      json: {
        ok: true,
        project: { id: projectId, name: "Wake e2e" },
        members: [member()],
        pendingRequests: [],
        firstConnect: null,
        actorRole: "owner",
      },
    });
  });
  await page.route(
    `**/api/projects/${projectId}/access/members/${membershipId}/grok-webhook`,
    async (route) => {
      if (route.request().method() === "PUT") {
        const body = route.request().postDataJSON() as {
          webhookUrl?: string;
          webhookKey?: string;
        };
        if (!body.webhookUrl?.startsWith("https://") || !body.webhookKey) {
          await route.fulfill({
            status: 400,
            json: { ok: false, errorMessage: "https_only" },
          });
          return;
        }
        state.saved = true;
      }
      await route.fulfill({
        json: {
          ok: true,
          grokWebhookRegistered: state.saved,
          grokWebhookUrlHost: state.saved ? "hooks.example.com" : null,
          keySet: state.saved,
        },
      });
    },
  );
  return { saved: () => state.saved };
};

test.describe("Invite → wake link owner path", () => {
  test.skip(
    !enabled || ownerEmail === "" || projectId === "",
    "Set RUN_INVITE_WAKE_E2E=1, E2E_WAKE_OWNER_EMAIL and E2E_WAKE_PROJECT_ID",
  );

  test("deep link expands the form; paste clears the awaiting state", async ({
    page,
  }) => {
    await signInTestAccount(page, ownerEmail);
    const stub = await stubAccessApis(page);
    await page.goto(`/projects/${projectId}#wake-link-${membershipId}`);

    const banner = page.getByTestId("wake-link-awaiting-banners");
    await expect(
      banner.getByText("Coder is waiting for a wake link"),
    ).toBeVisible();
    await expect(
      banner.getByText("Access › People › Members › Coder › Grok wake link"),
    ).toBeVisible();
    await expect(page.getByText("Waiting for wake link")).toBeVisible();

    const form = page.getByRole("form", { name: "Grok wake link" });
    await expect(form).toBeVisible();
    await expect(
      form.getByText(
        "Paste the wake link and key from Coder's routine in Grok Bot.",
      ),
    ).toBeVisible();

    await form.getByLabel("Wake link").fill("http://not-https.example.com");
    await form.getByLabel("Key").fill("routine-key");
    await form.getByRole("button", { name: "Save wake link" }).click();
    await expect(
      form.getByText(
        "That link didn't work. Copy it again from Grok Bot and paste it here.",
      ),
    ).toBeVisible();
    expect(stub.saved()).toBe(false);

    await form
      .getByLabel("Wake link")
      .fill("https://hooks.example.com/wake/abc");
    await form.getByLabel("Key").fill("routine-key");
    await form.getByRole("button", { name: "Save wake link" }).click();
    await expect(
      form.getByText(
        "Wake link saved. Coder will now wake up when the project needs it.",
      ),
    ).toBeVisible();
    await expect(page.getByText("Wake link set")).toBeVisible();
    await expect(page.getByText("Waiting for wake link")).toHaveCount(0);
    await expect(banner).toHaveCount(0);
  });

  test("banner 'Add wake link' opens the same form without a hash", async ({
    page,
  }) => {
    await signInTestAccount(page, ownerEmail);
    await stubAccessApis(page);
    await page.goto(`/projects/${projectId}`);
    await expect(
      page.getByRole("form", { name: "Grok wake link" }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Add wake link" }).click();
    await expect(
      page.getByRole("form", { name: "Grok wake link" }),
    ).toBeVisible();
  });
});
