import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  actionsFor,
  renderBanner,
} from "@/features/projects/access/hooks/createdInviteBanner.testUtils";
import {
  reactHookRunner as runner,
  runWithHookSlots,
} from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import { useCreatedInviteBanner } from "@/features/projects/access/hooks/useCreatedInviteBanner";
import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  createProjectInviteApi,
  revokeProjectInviteApi,
} from "@/features/projects/access/utils/projectAccessApi";
import AwcProjectMembersInviteBotsSection from "@/features/projects/members/AwcProjectMembersInviteBotsSection";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

vi.mock("@/features/projects/access/utils/projectAccessApi", () => ({
  createProjectInviteApi: vi.fn(),
  renameMembershipDisplayNameApi: vi.fn(),
  revokeProjectInviteApi: vi.fn(),
  updateProjectInviteAutoApproveApi: vi.fn(),
}));

const INVITE_URL = "https://www.agentwitch.com/invite/p/tok-df014";

const listed = (inviteId: string): AwcProjectAccessInvite =>
  ({
    inviteId,
    createdAt: "2026-10-07T18:00:00.000Z",
    expiresAt: "2026-10-14T18:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
    teamLabel: null,
    scopes: [],
    autoApprove: false,
  }) as AwcProjectAccessInvite;

const membersHtml = (
  banner: ReturnType<typeof renderBanner>,
  invites: readonly AwcProjectAccessInvite[],
) =>
  renderToStaticMarkup(
    createElement(AwcProjectMembersInviteBotsSection, {
      projectId: "p1",
      projectName: "AgentWitch",
      invites,
      createdInviteUrl: banner.createdInviteUrl,
      createdInviteToken: banner.createdInviteToken,
      createdInvitePlatform: banner.createdInvitePlatform,
      createdInviteJoinTypeId: banner.createdInviteJoinTypeId,
      createdInvitePrompts: banner.createdInvitePrompts,
      onCreate: () => undefined,
      onRevoke: () => undefined,
      onClearCreated: () => undefined,
    }),
  );

const createOne = async () => {
  vi.mocked(createProjectInviteApi).mockResolvedValueOnce({
    inviteId: "inv-new",
    url: INVITE_URL,
    token: "tok-df014",
  });
  await actionsFor(renderBanner()).createInvite(null);
};

describe("DF-014 Members rail: Copy prompt after invite + Copy again", () => {
  beforeEach(() => {
    runner.slots = [];
    vi.mocked(createProjectInviteApi).mockReset();
    vi.mocked(revokeProjectInviteApi).mockReset();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("right after Invite: Copy prompt banner shows, even if a stale poll misses the invite", async () => {
    await createOne();
    // Poll fetched before the create resolves after it: list has no new invite yet.
    renderBanner().syncBannerWithUsableInvites([]);
    const state = renderBanner();
    expect(state.createdInviteUrl).toBe(INVITE_URL);
    const html = membersHtml(state, []);
    expect(html).toContain("Copy prompt");
    expect(html).toContain("Dismiss");
  });

  it("after Dismiss the pending Invite sent row still has Copy", async () => {
    await createOne();
    renderBanner().syncBannerWithUsableInvites([listed("inv-new")]);
    renderBanner().clearCreatedInviteBanner();
    const state = renderBanner();
    expect(state.createdInviteUrl).toBeNull();
    const html = membersHtml(state, [listed("inv-new")]);
    expect(html).toContain("Invite sent");
    expect(html).toContain('data-invite-copy="inv-new"');
    expect(html).not.toContain("Dismiss");
  });

  it("Cancel drops the prompt so the row cannot copy a revoked invite", async () => {
    await createOne();
    vi.mocked(revokeProjectInviteApi).mockResolvedValueOnce({ ok: true });
    await actionsFor(renderBanner()).revokeInvite("inv-new");
    const state = renderBanner();
    expect(state.createdInvitePrompts).toEqual({});
    expect(state.createdInviteUrl).toBeNull();
  });

  it("survives reload in the owner tab (sessionStorage), pruned when no longer usable", async () => {
    const data = new Map<string, string>();
    vi.stubGlobal("window", {
      sessionStorage: {
        getItem: (k: string) => data.get(k) ?? null,
        setItem: (k: string, v: string) => void data.set(k, v),
        removeItem: (k: string) => void data.delete(k),
      },
    });
    const withProject = () =>
      runWithHookSlots(() => useCreatedInviteBanner("p1"));
    withProject().rememberCreatedInvite({
      inviteId: "inv-new",
      url: INVITE_URL,
      token: "tok-df014",
      platform: null,
      joinTypeId: null,
    });
    runner.slots = []; // reload: fresh component state
    withProject().syncBannerWithUsableInvites([listed("inv-new")]);
    const reloaded = withProject();
    expect(Object.keys(reloaded.createdInvitePrompts)).toEqual(["inv-new"]);
    expect(membersHtml(reloaded, [listed("inv-new")])).toContain(
      'data-invite-copy="inv-new"',
    );

    // Much later the invite is used/expired: it leaves the list and the prompt goes.
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 10 * 60_000);
    withProject().syncBannerWithUsableInvites([]);
    expect(withProject().createdInvitePrompts).toEqual({});
    expect(data.has("awc.inviteCopyPrompts.p1")).toBe(false);
    vi.restoreAllMocks();
  });
});
