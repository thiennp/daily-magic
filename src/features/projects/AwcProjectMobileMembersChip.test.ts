import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const P = "src/features/projects";

describe("project layout v2 mobile Members chip", () => {
  it("copy: idle + pending waiting labels and aria", () => {
    const copy = read(`${P}/projectPageLayoutV2Copy.constant.ts`);
    expect(copy).toContain('mobileMembersChip: "Members"');
    expect(copy).toContain(
      "mobileMembersChipPending: (n: number) => `Members · ${n} waiting`",
    );
    expect(copy).toContain('mobileMembersChipAria: "Go to members"');
    expect(copy).toContain("`Go to members, ${n} waiting for approval`");
  });

  it("chip: lg:hidden, scrolls to #project-members-column, Approve-queue n", () => {
    const chip = read(`${P}/AwcProjectMobileMembersChip.tsx`);
    const header = read(`${P}/AwcProjectDetailHeader.tsx`);
    const panel = read(`${P}/AwcProjectDetailPanel.tsx`);
    expect(chip).toContain("lg:hidden");
    expect(chip).toContain('getElementById("project-members-column")');
    expect(chip).toContain("scrollIntoView");
    expect(chip).toContain("useAwcProjectAccess");
    expect(chip).toContain("pending.length");
    expect(chip).toContain("C.mobileMembersChipPending");
    expect(chip).toContain("C.mobileMembersChipAriaPending");
    expect(chip).toContain("canApprove");
    expect(header).toContain("AwcProjectMobileMembersChip");
    expect(header).toContain("canApprove={canApprove}");
    expect(panel).toContain("canApprove={isOwner}");
    expect(panel).toContain("projectId={project.id}");
    expect(chip).not.toMatch(/blue-|indigo-|#0a6cf5|#4a97ff/i);
  });
});
