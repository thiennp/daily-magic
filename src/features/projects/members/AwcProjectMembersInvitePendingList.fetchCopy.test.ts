import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { reactHookRunner as runner } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import type { PendingInviteCopyPromptResult } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";
import {
  findCopyButton,
  flushPromises,
  pendingInvite,
  renderPendingListTree,
  type InvitePendingListProps,
} from "@/features/projects/members/invitePendingList.testUtils";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

const INVITES = [pendingInvite("inv-new", true), pendingInvite("inv-old", false)];
const renderTree = renderPendingListTree;
const flush = flushPromises;
type Props = InvitePendingListProps;

describe("107 unused invite row: Copy again from any device", () => {
  const writeText = vi.fn(async () => undefined);

  beforeEach(() => {
    runner.slots = [];
    writeText.mockClear();
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    vi.stubGlobal("window", { setTimeout: () => 0 });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows Copy again for rows with a stored prompt, the lost-copy line for old rows", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersInvitePendingList, {
        invites: INVITES,
        onRevoke: () => undefined,
        copyPromptFor: () => null,
        fetchCopyPrompt: async (): Promise<PendingInviteCopyPromptResult> => ({
          ok: false,
          errorMessage: null,
        }),
      }),
    );
    expect(html).toContain('data-invite-copy="inv-new"');
    expect(html).not.toContain('data-invite-copy="inv-old"');
    expect(html).toContain('data-invite-copy-unavailable="inv-old"');
    expect(html).toContain("The invite was shown once. Cancel it and make a new one if you lost it.");
    expect(html.match(/>Cancel invite</g)).toHaveLength(2);
    expect(html).not.toContain("Approve");
  });

  it("no session prompt: click fetches from the server, then copies", async () => {
    const fetchCopyPrompt = vi.fn(
      async (): Promise<PendingInviteCopyPromptResult> => ({
        ok: true,
        prompt: "Join my AgentWitch project: read …/join/tok-x",
      }),
    );
    const props: Props = {
      invites: INVITES,
      onRevoke: () => undefined,
      copyPromptFor: () => null,
      fetchCopyPrompt,
    };
    findCopyButton(renderTree(props), "inv-new")?.props.onClick();
    await flush();
    expect(fetchCopyPrompt).toHaveBeenCalledWith("inv-new");
    expect(writeText).toHaveBeenCalledWith(
      "Join my AgentWitch project: read …/join/tok-x",
    );
    expect(findCopyButton(renderTree(props), "inv-new")?.props.children).toBe(
      "Copied",
    );
  });

  it("session prompt wins: copies without a fetch", async () => {
    const fetchCopyPrompt = vi.fn();
    const props: Props = {
      invites: INVITES,
      onRevoke: () => undefined,
      copyPromptFor: (id) => (id === "inv-new" ? "session prompt" : null),
      fetchCopyPrompt,
    };
    findCopyButton(renderTree(props), "inv-new")?.props.onClick();
    await flush();
    expect(fetchCopyPrompt).not.toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledWith("session prompt");
  });

  it("server says used/revoked/expired: shows its message, copies nothing", async () => {
    const props: Props = {
      invites: INVITES,
      onRevoke: () => undefined,
      fetchCopyPrompt: async (): Promise<PendingInviteCopyPromptResult> => ({
        ok: false,
        errorMessage:
          "This invite was used, cancelled, or expired. Make a new invite.",
      }),
    };
    findCopyButton(renderTree(props), "inv-new")?.props.onClick();
    await flush();
    expect(writeText).not.toHaveBeenCalled();
    const html = renderToStaticMarkup(renderTree(props));
    expect(html).toContain(
      "This invite was used, cancelled, or expired. Make a new invite.",
    );
  });
});
