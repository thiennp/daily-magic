import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/public-api/types";
import { PRIMARY_NAV } from "@/features/shell/public-api/types";

const read = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("Companies & rules hub (nav live)", () => {
  it("keeps Marketplace, Connect, Automations, and Download AgentWitch Local reachable", () => {
    const labels = PRIMARY_NAV.map((item) => item.label);
    expect(labels).toContain("Marketplace");
    expect(labels).toContain("Automations");
    expect(labels).toContain(COMPANY_RULES_NAV_LABEL);

    const adminShell = read("src/features/admin/AdminShell.tsx");
    expect(adminShell).toContain("renderPrimaryNav={true}");
    expect(adminShell).toContain("showDevicesRail={true}");

    expect(APP_SHELL_COMPUTERS_COPY.connectThis).toContain("Connect");
    expect(APP_SHELL_COMPUTERS_COPY.download).toBe("Download AgentWitch Local");
  });
});
