import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  actionsFor,
  panelHtml,
  renderBanner,
} from "@/features/projects/access/hooks/createdInviteBanner.testUtils";
import { reactHookRunner as runner } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
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

describe("created invite banner: platform is set with createdInviteId", () => {
  beforeEach(() => {
    runner.slots = [];
    vi.mocked(createProjectInviteApi).mockReset();
  });

  it("a failed Muse create does not relabel an open Grok banner", async () => {
    vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
      inviteId: "inv-grok",
      url: "https://www.agentwitch.com/invite/p/tok-grok",
      token: "tok-grok",
    });
    await actionsFor(renderBanner()).createInvite("grok");
    const afterGrok = renderBanner();
    expect(afterGrok.createdInviteId).toBe("inv-grok");
    expect(afterGrok.createdInvitePlatform).toBe("grok");
    expect(runner.slots).toContainEqual({
      inviteId: "inv-grok",
      platform: "grok",
      joinTypeId: "grok-bot",
    });
    expect(panelHtml(afterGrok)).toContain(
      "this Copy prompt is for a Grok Bot",
    );

    vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
      ok: false,
      errorMessage: "boom",
    });
    await actionsFor(afterGrok).createInvite("muse");
    const afterMuseFail = renderBanner();
    expect(afterMuseFail.createdInviteId).toBe("inv-grok");
    expect(afterMuseFail.createdInvitePlatform).toBe("grok");
    expect(afterMuseFail.createdInviteUrl).toBe(
      "https://www.agentwitch.com/invite/p/tok-grok",
    );
    const html = panelHtml(afterMuseFail);
    expect(html).toContain("this Copy prompt is for a Grok Bot");
    expect(html).not.toContain("this Copy prompt is for Muse");
  });

  it("a failed Grok create does not relabel an open Muse banner", async () => {
    vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
      inviteId: "inv-muse",
      url: "https://www.agentwitch.com/invite/p/tok-muse",
      token: "tok-muse",
    });
    await actionsFor(renderBanner()).createInvite("muse");
    vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
      errorMessage: "boom",
    });
    await actionsFor(renderBanner()).createInvite("grok");
    const state = renderBanner();
    expect(state.createdInviteId).toBe("inv-muse");
    expect(state.createdInvitePlatform).toBe("muse");
    expect(panelHtml(state)).toContain("this Copy prompt is for Muse");
  });

  it("dismiss clears inviteId and resets the platform together", async () => {
    vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
      inviteId: "inv-muse",
      url: "https://www.agentwitch.com/invite/p/tok-muse",
      token: "tok-muse",
    });
    await actionsFor(renderBanner()).createInvite("muse");
    renderBanner().clearCreatedInviteBanner();
    const state = renderBanner();
    expect(state.createdInviteId).toBeNull();
    expect(state.createdInvitePlatform).toBe("grok");
    expect(state.createdInviteUrl).toBeNull();
  });
});
