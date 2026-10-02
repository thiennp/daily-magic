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

describe("Admin production shell", () => {
  it("routes admin pages through AdminShell", () => {
    expect(adminLayoutSource).toMatch(/<AdminShell>/);
  });

  it("uses AppShell with admin sidebar and default primary nav", () => {
    expect(adminShellSource).toMatch(/<AppShell[\s\S]*sidebar=/);
    expect(adminShellSource).not.toMatch(/renderPrimaryNav=\{false\}/);
  });

  it("links styleguide from the admin management sidebar", () => {
    expect(adminSidebarSource).toContain('href: "/styleguide"');
    expect(adminSidebarSource).toContain('label: "Styleguide"');
  });
});
