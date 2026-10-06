import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  actionsFor,
  panelHtml,
  renderBanner,
} from "@/features/projects/access/hooks/createdInviteBanner.testUtils";
import { reactHookRunner as runner } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import { toAwcProjectInviteAddSelection } from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { createProjectInviteApi } from "@/features/projects/access/utils/projectAccessApi";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

vi.mock("@/features/projects/access/utils/projectAccessApi", () => ({
  createProjectInviteApi: vi.fn(),
  renameMembershipDisplayNameApi: vi.fn(),
  revokeProjectInviteApi: vi.fn(),
}));

const created = {
  inviteId: "inv-1",
  url: "https://www.agentwitch.com/invite/p/tok",
  token: "tok",
};

describe("Add assistant: one shared invite with an optional type", () => {
  beforeEach(() => {
    runner.slots = [];
    vi.mocked(createProjectInviteApi).mockReset();
    vi.mocked(createProjectInviteApi).mockResolvedValue(created);
  });

  it("no type picked: creates a valid invite with no platform", async () => {
    const pick = toAwcProjectInviteAddSelection(null);
    expect(pick).toEqual({ platform: null, joinTypeId: null });
    await actionsFor(renderBanner()).createInvite(
      pick.platform,
      false,
      pick.joinTypeId,
    );
    expect(createProjectInviteApi).toHaveBeenCalledWith("p1", {
      autoApprove: false,
    });
    const state = renderBanner();
    expect(state.createdInviteJoinTypeId).toBeNull();
    expect(state.createdInvitePlatform).toBeNull();
    const html = panelHtml(state);
    expect(html).toContain('data-invite-platform="any"');
    expect(html).toContain("this Copy prompt works for any assistant");
    expect(html).not.toContain('data-invite-platform="grok"');
    expect(html).not.toContain("this Copy prompt is for a Grok Bot");
  });

  it("Grok Bot through the shared button still creates a grok invite", async () => {
    const pick = toAwcProjectInviteAddSelection("grok-bot");
    expect(pick).toEqual({ platform: "grok", joinTypeId: "grok-bot" });
    await actionsFor(renderBanner()).createInvite(
      pick.platform,
      false,
      pick.joinTypeId,
    );
    expect(createProjectInviteApi).toHaveBeenCalledWith("p1", {
      autoApprove: false,
      platform: "grok",
    });
    const state = renderBanner();
    expect(state.createdInvitePlatform).toBe("grok");
    expect(state.createdInviteJoinTypeId).toBe("grok-bot");
  });

  it("Muse creates an invite with type 'muse'", async () => {
    const pick = toAwcProjectInviteAddSelection("muse");
    expect(pick).toEqual({ platform: "muse", joinTypeId: "muse" });
    await actionsFor(renderBanner()).createInvite(
      pick.platform,
      false,
      pick.joinTypeId,
    );
    expect(createProjectInviteApi).toHaveBeenCalledWith("p1", {
      autoApprove: false,
      platform: "muse",
    });
    expect(renderBanner().createdInvitePlatform).toBe("muse");
  });

  it("other types keep the invite universal; auto-approve passes through only when ticked", async () => {
    const pick = toAwcProjectInviteAddSelection("claude");
    expect(pick).toEqual({ platform: null, joinTypeId: "claude" });
    await actionsFor(renderBanner()).createInvite(
      pick.platform,
      true,
      pick.joinTypeId,
    );
    expect(createProjectInviteApi).toHaveBeenCalledWith("p1", {
      autoApprove: true,
    });
    expect(toAwcProjectInviteAddSelection("not-a-type")).toEqual({
      platform: null,
      joinTypeId: null,
    });
  });
});
