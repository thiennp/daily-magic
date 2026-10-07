import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { COMPANIES_RULES_HUB_COPY } from "@/features/admin/companiesRulesHubCopy.constant";

const read = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("Companies & rules hub (copy + surfaces)", () => {
  it("ships Create company and cannot-self-join honesty — no join-with-a-code", () => {
    expect(COMPANIES_RULES_HUB_COPY.createCta).toBe("Create company");
    expect(COMPANIES_RULES_HUB_COPY.createHeading).toBe("Create company");
    expect(COMPANIES_RULES_HUB_COPY.joinHonestyBody).toContain(
      "You can't join a company yourself",
    );

    const selection = read(
      "src/features/admin/components/GroupSelectionSection.tsx",
    );
    const createPanel = read(
      "src/features/admin/components/GroupCreateCompanyPanel.tsx",
    );
    expect(selection).toContain("C.createHeading");
    expect(createPanel).toContain("C.createCta");
    expect(createPanel).toContain("C.joinHonestyHeading");
    expect(createPanel).toContain("C.joinHonestyBody");
    expect(createPanel).not.toMatch(/Join with a code/i);
  });

  it("uses company dispatch policy labels Approval required and Open dispatch", () => {
    expect(COMPANIES_RULES_HUB_COPY.approvalLabel).toBe("Approval required");
    expect(COMPANIES_RULES_HUB_COPY.openLabel).toBe("Open dispatch");
    expect(COMPANIES_RULES_HUB_COPY.approvalHelper).toContain("this computer");
    expect(COMPANIES_RULES_HUB_COPY.openHelper).toContain("this computer");

    const fields = read(
      "src/features/admin/components/GroupDispatchPolicyFields.tsx",
    );
    expect(fields).toContain("C.approvalLabel");
    expect(fields).toContain("C.openLabel");
    expect(fields).toContain("C.approvalHelper");
    expect(fields).toContain("C.tryAgain");
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

    const runsList = read(
      "src/features/admin/components/GroupTeamActivityRunsList.tsx",
    );
    expect(runsList).toContain("C.tryAgain");
    expect(runsList).toContain("C.runsError");

    const orientation = read(
      "src/features/admin/components/CompaniesRulesOrientationSafetyCard.tsx",
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
