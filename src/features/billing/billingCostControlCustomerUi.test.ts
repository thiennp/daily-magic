import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import formatBillingPlanLabel from "@/features/billing/formatBillingPlanLabel";
import {
  isAtOrOverLimit,
  resolveAssistantLimitMessage,
  resolveComputerLimitMessage,
} from "@/features/billing/resolveEntitlementLimitMessage";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

describe("billing cost-control UI (customer)", () => {
  it("customer Pricing / BillingPlanSummary never call admin cost-control", () => {
    const pricingLayout = read("src/features/pricing/PricingPageLayout.tsx");
    const planSummary = read(
      "src/features/billing/components/BillingPlanSummary.tsx",
    );
    const planDetails = read(
      "src/features/billing/components/BillingPlanDetailsList.tsx",
    );
    const fetchPlan = read("src/features/billing/fetchBillingPlan.ts");
    const fetchEntitlements = read(
      "src/features/billing/fetchBillingEntitlements.ts",
    );
    const customerBlob = [
      pricingLayout,
      planSummary,
      planDetails,
      fetchPlan,
      fetchEntitlements,
    ].join("\n");

    expect(customerBlob.includes(BILLING_API_PATHS.adminCostControl)).toBe(
      false,
    );
    expect(customerBlob.includes("/api/billing/admin/cost-control")).toBe(
      false,
    );
    expect(customerBlob.includes("fetchAdminCostControl")).toBe(false);
    expect(planSummary.includes("BillingPlanSummary")).toBe(true);
    expect(pricingLayout.includes("BillingPlanSummary")).toBe(true);
  });

  it("customer Pricing surfaces have no infra euro / budget figures", () => {
    const pricingLayout = read("src/features/pricing/PricingPageLayout.tsx");
    const planSummary = read(
      "src/features/billing/components/BillingPlanSummary.tsx",
    );
    const planDetails = read(
      "src/features/billing/components/BillingPlanDetailsList.tsx",
    );
    const planCards = read(
      "src/features/pricing/components/PricingPlanCards.tsx",
    );
    const blob = [pricingLayout, planSummary, planDetails, planCards]
      .join("\n")
      .toLowerCase();

    expect(blob.includes("€200")).toBe(false);
    expect(blob.includes("budgeteur")).toBe(false);
    expect(blob.includes("railwayspendeur")).toBe(false);
    expect(blob.includes("neonspendeur")).toBe(false);
    expect(blob.includes("trialplusadminfreespendeur")).toBe(false);
    expect(blob.includes("infra")).toBe(false);
  });

  it("renders entitlement fields in Billing plan details", () => {
    const planDetails = read(
      "src/features/billing/components/BillingPlanDetailsList.tsx",
    );
    expect(planDetails.includes("plan.seats")).toBe(true);
    expect(planDetails.includes("plan.maxComputers")).toBe(true);
    expect(planDetails.includes("plan.maxAssistantConnects")).toBe(true);
    expect(planDetails.includes("plan.cloudMessageStorage")).toBe(true);
    expect(planDetails.includes("plan.trialEndsAt")).toBe(true);
    expect(
      read("src/features/billing/components/BillingPlanSummary.tsx").includes(
        "trialGate",
      ),
    ).toBe(true);
    expect(formatBillingPlanLabel("trial")).toBe("Trial");
    expect(formatBillingPlanLabel("admin_free")).toContain("Permanent Free");
  });

  it("keeps Marketplace, Connect, Automations, and Download visible", () => {
    const nav = read("src/features/shell/appNav.constant.ts");
    const computersCopy = read(
      "src/features/shell/v5/appShellComputersCopy.constant.ts",
    );
    const downloadLink = read("src/features/home/ComputersDownloadLink.tsx");
    const homePanel = read("src/features/home/HomeConnectedMacsPanel.tsx");

    expect(nav.includes('label: "Marketplace"')).toBe(true);
    expect(nav.includes('label: "Automations"')).toBe(true);
    expect(computersCopy.includes("Connect this computer")).toBe(true);
    expect(computersCopy.includes("Download AgentWitch Local")).toBe(true);
    expect(downloadLink.includes("/download")).toBe(true);
    expect(homePanel.includes("ComputersDownloadLink")).toBe(true);
    expect(homePanel.includes("ConnectAnotherMacButton")).toBe(true);
  });

  it("exposes clear over-limit messages without hiding connect", () => {
    expect(isAtOrOverLimit(2, 2)).toBe(true);
    expect(isAtOrOverLimit(1, 2)).toBe(false);
    expect(resolveComputerLimitMessage(2)).toContain("2");
    expect(resolveAssistantLimitMessage(3)).toContain("3");
    expect(BILLING_COPY.computerLimit.toLowerCase()).toContain("server");
    const homePanel = read("src/features/home/HomeConnectedMacsPanel.tsx");
    expect(homePanel.includes("ComputerEntitlementLimitNote")).toBe(true);
    const myBots = read("src/features/my-bots/MyBotsPanel.tsx");
    expect(myBots.includes("AssistantEntitlementLimitNote")).toBe(true);
  });
});
