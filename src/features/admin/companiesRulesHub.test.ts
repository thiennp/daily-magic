import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { COMPANIES_RULES_HUB_COPY } from "@/features/admin/companiesRulesHubCopy.constant";
import { COMPANY_RULES_NAV_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";

const read = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("Companies & rules hub", () => {
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

  it("ships Create company and cannot-self-join honesty — no join-with-a-code", () => {
    expect(COMPANIES_RULES_HUB_COPY.createCta).toBe("Create company");
    expect(COMPANIES_RULES_HUB_COPY.createHeading).toBe("Create company");
    expect(COMPANIES_RULES_HUB_COPY.joinHonestyBody).toContain(
      "You can't join a company yourself",
    );

    const selection = read(
      "src/features/admin/components/GroupSelectionSection.tsx",
    );
    expect(selection).toContain("C.createHeading");
    expect(selection).toContain("C.createCta");
    expect(selection).toContain("C.joinHonestyHeading");
    expect(selection).toContain("C.joinHonestyBody");
    expect(selection).not.toMatch(/Join with a code/i);
  });

  it("uses company dispatch policy labels Approval required and Open dispatch", () => {
    expect(COMPANIES_RULES_HUB_COPY.approvalLabel).toBe("Approval required");
    expect(COMPANIES_RULES_HUB_COPY.openLabel).toBe("Open dispatch");
    expect(COMPANIES_RULES_HUB_COPY.approvalHelper).toContain("this computer");
    expect(COMPANIES_RULES_HUB_COPY.openHelper).toContain("this computer");

    const dispatch = read(
      "src/features/admin/components/GroupDispatchPolicyControl.tsx",
    );
    expect(dispatch).toContain("C.approvalLabel");
    expect(dispatch).toContain("C.openLabel");
    expect(dispatch).toContain("C.approvalHelper");
    expect(dispatch).toContain("C.tryAgain");
  });

  it("keeps Danger zone delete and members invite on company settings / members", () => {
    expect(COMPANIES_RULES_HUB_COPY.dangerZone).toBe("Danger zone");
    expect(COMPANIES_RULES_HUB_COPY.deleteCompany).toBe("Delete company");
    expect(COMPANIES_RULES_HUB_COPY.deleteBody).toContain("cannot be undone");
    expect(COMPANIES_RULES_HUB_COPY.inviteCta).toBe("Invite");

    const settings = read(
      "src/features/admin/components/GroupCompanySettingsModal.tsx",
    );
    expect(settings).toContain("C.dangerZone");
    expect(settings).toContain("C.deleteBody");

    const invite = read(
      "src/features/admin/components/GroupMemberInviteForm.tsx",
    );
    expect(invite).toContain("C.inviteCta");
  });

  it("shows recent runs Try again and does not invent global Safety rules CRUD", () => {
    expect(COMPANIES_RULES_HUB_COPY.tryAgain).toBe("Try again");
    expect(COMPANIES_RULES_HUB_COPY.runsError).toContain("try again");
    expect(COMPANIES_RULES_HUB_COPY.safetyValue).toBe("Set per project");
    expect(COMPANIES_RULES_HUB_COPY.safetyOpenCta).toBe("Open Safety rules");

    const runs = read(
      "src/features/admin/components/GroupTeamActivityPanel.tsx",
    );
    expect(runs).toContain("C.tryAgain");
    expect(runs).toContain("C.runsError");

    const orientation = read(
      "src/features/admin/components/CompaniesRulesOrientationStrip.tsx",
    );
    expect(orientation).toContain("#pitfalls");
    expect(orientation).toContain("C.safetyOpenCta");
    expect(orientation).toContain("C.safetyValue");
    expect(orientation).not.toMatch(/Add a rule/i);
    expect(orientation).not.toMatch(/Built-in safety/i);
    expect(orientation).not.toMatch(/Override/i);

    const hubFiles = [
      "src/features/admin/GroupManagementPanel.tsx",
      "src/features/admin/components/CompaniesRulesOrientationStrip.tsx",
      "src/features/admin/companiesRulesHubCopy.constant.ts",
    ];
    for (const file of hubFiles) {
      const source = read(file);
      expect(source).not.toMatch(/Join with a code/i);
      expect(source).not.toMatch(/\bSoft\b/);
      expect(source).not.toMatch(/\bLOCK\b/);
      expect(source).not.toMatch(/\bHOLD\b/);
    }
  });

  it("prefers Managing company picker label when multi-company", () => {
    expect(COMPANIES_RULES_HUB_COPY.managingCompany).toBe("Managing company");
    const access = read(
      "src/features/admin/components/GroupCompanySettingsAccess.tsx",
    );
    expect(access).toContain("managingCompany");
  });

  it("uses AgentWitch as one word in hub copy", () => {
    expect(COMPANIES_RULES_HUB_COPY.approvalTip).toContain("AgentWitch");
    expect(COMPANIES_RULES_HUB_COPY.approvalTip).not.toContain("Agent Witch");
  });
});
