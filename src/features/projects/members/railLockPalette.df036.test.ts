import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), "src/features/projects", relative), "utf8");

const RAIL_FILES = [
  "members/AwcProjectMembersInviteBotsSection.tsx",
  "members/AwcProjectMembersInvitePendingList.tsx",
  "members/AwcProjectMembersInvitePendingRow.tsx",
  "members/AwcProjectMembersHelperRow.tsx",
  "members/AwcProjectMembersHelperRowMenu.tsx",
  "members/AwcProjectMembersHelperWakeBlock.tsx",
  "members/AwcProjectMembersHelperWakeStatus.tsx",
  "access/AwcWakeConnectPasteCard.tsx",
  "access/AwcWakeConnectPasteChips.tsx",
  "access/invites/AwcProjectInviteCreatedBanner.tsx",
  "access/humanInvites/AwcHumanPeopleSectionBody.tsx",
  "access/humanInvites/AwcHumanPendingInviteRow.tsx",
  "access/humanInvites/AwcHumanInviteUndoToast.tsx",
  "access/humanInvites/AwcHumanInviteCreatedLinkBanner.tsx",
  "access/humanInvites/AwcHumanInvitePersonPanelActions.tsx",
  "access/humanInvites/AwcHumanInvitePersonForm.tsx",
  "access/humanInvites/AwcHumanInviteNicknameField.tsx",
];

describe("DF-036 F2: the rail uses lock tokens only", () => {
  it.each(RAIL_FILES)("%s has no black pill, amber, or #d92d20 red", (file) => {
    expect(read(file)).not.toMatch(
      /bg-gray-900|amber-|error-600|awc-bad-dot|awc-warn-dot|red-\d|#d92d20/,
    );
  });

  it("the wake-status dot is neutral or --bad, never amber", () => {
    const status = read("members/AwcProjectMembersHelperWakeStatus.tsx");
    expect(status).toContain("bg-awc-bad");
    expect(status).toContain("bg-awc-control-border");
    expect(status).toContain("bg-awc-ok-dot");
  });

  it("Add assistant is a Pine outline button", () => {
    const section = read("members/AwcProjectMembersInviteBotsSection.tsx");
    expect(section).toContain("border-awc-primary");
    expect(section).toContain("text-awc-primary");
  });
});
