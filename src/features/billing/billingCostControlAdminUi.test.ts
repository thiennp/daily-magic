import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

describe("billing cost-control UI (admin)", () => {
  it("admin set-free and cost-control surfaces exist", () => {
    const sidebar = read("src/features/shell/AdminSidebar.tsx");
    const costPage = read("src/app/(app)/admin/cost-control/page.tsx");
    const costPanel = read(
      "src/features/billing/components/AdminCostControlPanel.tsx",
    );
    const setFree = read(
      "src/features/billing/components/AdminSetFreeButton.tsx",
    );
    const setPlan = read(
      "src/features/billing/components/AdminSetPlanControl.tsx",
    );
    const usersTable = read("src/features/admin/components/UsersTable.tsx");

    expect(sidebar.includes('href: "/admin/cost-control"')).toBe(true);
    expect(sidebar.includes('label: "Cost control"')).toBe(true);
    expect(costPage.includes("AdminCostControlPanel")).toBe(true);
    expect(
      costPanel.includes(BILLING_API_PATHS.adminCostControl) ||
        costPanel.includes("useAdminCostControl"),
    ).toBe(true);
    expect(setFree.includes("postAdminSetFree")).toBe(true);
    expect(setPlan.includes("postAdminSetPlan")).toBe(true);
    expect(usersTable.includes("AdminSetPlanControl")).toBe(true);
    expect(
      costPanel.includes("budgetEur") || costPanel.includes("Budget"),
    ).toBe(true);
  });

  it("keeps contract file on the tip under docs/design/pricing", () => {
    const contract = read("docs/design/pricing/COST-CONTROL-API.md");
    expect(contract.includes("/api/billing/entitlements")).toBe(true);
    expect(contract.includes("/api/billing/admin/cost-control")).toBe(true);
    expect(contract.includes("admin/set-free")).toBe(true);
  });
});
