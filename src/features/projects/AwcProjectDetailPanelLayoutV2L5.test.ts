import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(path.join(process.cwd(), relative), "utf8");

const P = "src/features/projects";

describe("project layout v2 L5 Settings + Members", () => {
  it("Settings panel: name + read-only history + danger zone (no cards)", () => {
    const panel = read(`${P}/AwcProjectDetailSettingsPanel.tsx`);
    const copy = read(`${P}/projectPageSettingsCopy.constant.ts`);
    const history = read(`${P}/settings/AwcProjectSettingsHistoryRow.tsx`);
    const name = read(`${P}/settings/AwcProjectSettingsNameSection.tsx`);
    const danger = read(`${P}/settings/AwcProjectSettingsDangerZone.tsx`);
    expect(panel).toContain("AwcProjectSettingsNameSection");
    expect(panel).toContain("AwcProjectSettingsHistoryRow");
    expect(panel).toContain("AwcProjectSettingsDangerZone");
    expect(panel).toContain('id="p-set"');
    expect(panel).not.toMatch(/border border-gray|rounded-xl border/);
    expect(copy).toContain('nameSave: "Save name"');
    expect(copy).toContain(
      "Rename here on Cloud. Pick the folder and playbook in AgentWitch Local.",
    );
    expect(copy).toContain(
      'historyTitle: "Save message history on my computer"',
    );
    expect(copy).toContain('dangerHeading: "Danger zone"');
    expect(copy).toContain('deleteConfirmGo: "Delete permanently"');
    expect(copy).toContain("Toggle this in AgentWitch Local on this computer.");
    expect(copy).toContain("members, invites, wake links, keys, and messages");
    expect(copy).toContain("aren't touched.");
    expect(history).toContain('role="switch"');
    expect(history).toContain("C.historyToast");
    expect(history).not.toContain("useAwcProjectComputerHistory");
    expect(history).not.toContain("enabled: next");
    expect(history).toContain("requestProjectComputerHistory");
    expect(name).toContain("useAwcProjectRename");
    expect(name).toContain("C.nameSave");
    expect(danger).toContain("useDeleteProject");
    expect(danger).toContain("AwcProjectDeleteConfirmForm");
    for (const file of [panel, history, name, danger]) {
      expect(file).not.toMatch(
        /blue-|indigo-|#0a6cf5|#4a97ff|#e5effe|#0d2749/i,
      );
    }
  });

  it("Members column: flat people + helpers + shared Add assistant invite (no AccessPanel cards)", () => {
    const column = read(`${P}/AwcProjectMembersColumn.tsx`);
    const owner = read(`${P}/members/AwcProjectMembersOwnerContent.tsx`);
    const helpers = read(`${P}/members/AwcProjectMembersHelpersSection.tsx`);
    const row = read(`${P}/members/AwcProjectMembersHelperRow.tsx`);
    const invite = read(`${P}/members/AwcProjectMembersInviteBotsSection.tsx`);
    const copy = read(`${P}/projectPageMembersCopy.constant.ts`);
    const layoutCopy = read(`${P}/projectPageLayoutV2Copy.constant.ts`);
    const panel = read(`${P}/AwcProjectDetailPanel.tsx`);
    expect(column).toContain("AwcProjectMembersOwnerContent");
    expect(column).not.toContain("AwcProjectAccessPanel");
    expect(column).toContain("border-l");
    expect(column).toContain("bg-gray-50/70");
    expect(owner).toContain("AwcProjectMembersPeopleSection");
    expect(owner).toContain("AwcProjectMembersHelpersSection");
    expect(owner).toContain("AwcProjectMembersInviteBotsSection");
    expect(owner).toContain("useAwcProjectAccess");
    expect(helpers).toContain("AwcProjectMembersHelperRow");
    expect(row).toContain("C.menuChat");
    expect(row).toContain("C.menuRename");
    expect(row).toContain("C.menuWebhook");
    expect(row).toContain("C.menuRemove");
    expect(row).toContain("AwcProjectAccessMemberGrokWebhookForm");
    expect(invite).toContain("AwcProjectInviteAddAssistantControl");
    expect(invite).not.toContain('onCreate("grok")');
    expect(invite).toContain("AwcProjectInviteCreatedBanner");
    expect(copy).toContain('columnLabel: "Members"');
    expect(copy).not.toContain("inviteGrok");
    expect(copy).not.toContain("inviteMuse");
    expect(copy).toContain('peopleInvite: "Invite people"');
    expect(copy).toContain('menuWebhook: "Grok wake link"');
    expect(copy).toContain(
      "Grok Bot joins with the prompt and wakes up through its own routine.",
    );
    expect(copy).toContain(
      "Other assistants, such as Muse, can join with the same invite prompt.",
    );
    expect(copy).toContain(
      "Remove takes the assistant out of the project. If it leaves on its own, you don't need to approve.",
    );
    expect(layoutCopy).toContain('membersColumnLabel: "Members"');
    expect(panel).toContain("onMessageHelper={onGotoActivity}");
    for (const file of [column, owner, helpers, row, invite]) {
      expect(file).not.toMatch(
        /blue-|indigo-|#0a6cf5|#4a97ff|#e5effe|#0d2749/i,
      );
    }
  });

  it("Reports/Library are L6 panels (stubs gone); no L3 Activity redesign", () => {
    const body = read(`${P}/AwcProjectDetailTabPanelBody.tsx`);
    expect(body).not.toContain("AwcProjectTabStub");
    expect(body).not.toContain("STUB_TABS");
    expect(body).toContain("AwcProjectDetailSettingsPanel");
    expect(body).not.toContain("AwcProjectActivity");
    expect(body).not.toMatch(/0fd0078b|layout-v2-l3/i);
  });
});
