import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const adminLayoutSource = readFileSync(
  path.join(process.cwd(), "src/app/(app)/admin/layout.tsx"),
  "utf8",
);

const adminShellSource = readFileSync(
  path.join(process.cwd(), "src/features/admin/AdminShell.tsx"),
  "utf8",
);

const adminSidebarSource = readFileSync(
  path.join(process.cwd(), "src/features/shell/AdminSidebar.tsx"),
  "utf8",
);

const appNavSource = readFileSync(
  path.join(process.cwd(), "src/features/shell/appNav.constant.ts"),
  "utf8",
);

const computersCopySource = readFileSync(
  path.join(
    process.cwd(),
    "src/features/shell/v5/appShellComputersCopy.constant.ts",
  ),
  "utf8",
);

describe("Admin production shell", () => {
  it("routes admin pages through AdminShell", () => {
    expect(adminLayoutSource).toMatch(/<AdminShell>/);
  });

  it("keeps full primary nav and devices rail on admin chrome", () => {
    expect(adminShellSource).toMatch(
      /<AppShell[\s\S]*primaryNavExtra=\{<AdminSidebar \/>\}/,
    );
    expect(adminShellSource).not.toMatch(/<AppShell[\s\S]*sidebar=/);
    expect(adminShellSource).toMatch(/renderPrimaryNav=\{true\}/);
    expect(adminShellSource).toContain("showDevicesRail={true}");
  });

  it("never hides Marketplace, Automations, or Companies & rules in primary nav", () => {
    expect(appNavSource).toContain('label: "Marketplace"');
    expect(appNavSource).toContain('label: "Automations"');
    expect(appNavSource).toContain("COMPANY_RULES_NAV_LABEL");
  });

  it("keeps Download AgentWitch Local copy for the devices rail", () => {
    expect(computersCopySource).toContain("Download AgentWitch Local");
  });

  it("links styleguide from the admin management sidebar", () => {
    expect(adminSidebarSource).toContain('href: "/styleguide"');
    expect(adminSidebarSource).toContain('label: "Styleguide"');
  });
});
