import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  MARKETING_HEADER_NAV_ITEMS,
  resolveMarketingFooterProductLinks,
} from "@/features/marketing/public-api/types";
import { isShowcaseTryNextAuthRequired } from "@/features/showcases/public-api/types";
import {
  PROJECTS_LIBRARY_INTENT_HREF,
  PROJECTS_REPORTS_INTENT_HREF,
} from "@/lib/shell/projectTabIntentHrefs.constant";

const read = (path: string): string =>
  readFileSync(join(process.cwd(), path), "utf8");

const RETARGETED_FILES = [
  "src/features/home/utils/buildOnboardingSteps.ts",
  "src/features/home/HomeOnboardingTemplateStep.tsx",
  "src/features/home/HomeOnboardingSetupCompletePanel.tsx",
  "src/features/agent/AgentLiveTerminalSection.tsx",
  "src/features/agent/WorkflowTrialRunGatePanel.tsx",
  "src/features/agent/SendTaskComposerPickerStep.tsx",
  "src/features/agent/ProjectLibraryLink.tsx",
  "src/features/agent/SendTaskLibraryPicker.tsx",
  "src/features/automations/AutomationCard.tsx",
  "src/features/automations/CreateAutomationForm.tsx",
  "src/features/marketing/resolveMarketingFooterNav.ts",
  "src/features/marketing/marketingHeaderNavItems.constant.ts",
] as const;

describe("library + reports links point into projects", () => {
  it("intent hrefs match the redirect notice intents", () => {
    expect(PROJECTS_LIBRARY_INTENT_HREF).toBe("/projects?intent=library");
    expect(PROJECTS_REPORTS_INTENT_HREF).toBe("/projects?intent=reports");
  });

  it.each(RETARGETED_FILES)("%s no longer links to top-level pages", (file) => {
    const source = read(file);
    expect(source).not.toMatch(/href[=:]\s*"\/library"/);
    expect(source).not.toMatch(/href[=:]\s*"\/reports"/);
    expect(source).not.toContain('<Link href="/reports">');
  });

  it("footer Reports opens projects with the reports intent", () => {
    const reports = resolveMarketingFooterProductLinks(false).find(
      (link) => link.label === "Reports",
    );
    expect(reports?.href).toBe(PROJECTS_REPORTS_INTENT_HREF);
  });

  it("marketing header Reports uses projects intent (login callback for signed-out)", () => {
    const reports = MARKETING_HEADER_NAV_ITEMS.find(
      (link) => link.label === "Reports",
    );
    expect(reports?.href).toBe(
      `/login?callbackUrl=${encodeURIComponent(PROJECTS_REPORTS_INTENT_HREF)}`,
    );
    expect(reports?.href).not.toBe("/login?callbackUrl=%2Freports");
  });

  it("showcase try-next on /projects asks anonymous readers to sign in", () => {
    expect(isShowcaseTryNextAuthRequired(PROJECTS_LIBRARY_INTENT_HREF)).toBe(
      true,
    );
  });
});
