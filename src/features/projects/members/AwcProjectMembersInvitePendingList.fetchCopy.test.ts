import {
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  reactHookRunner as runner,
  runWithHookSlots,
} from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import type { PendingInviteCopyPromptResult } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

const invite = (
  inviteId: string,
  copyAvailable: boolean,
): AwcProjectAccessInvite => ({
  inviteId,
  createdAt: "2026-10-07T18:00:00.000Z",
  expiresAt: "2026-10-14T18:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 1,
  teamLabel: null,
  scopes: [],
  autoApprove: false,
  copyAvailable,
});

type Props = Parameters<typeof AwcProjectMembersInvitePendingList>[0];

const INVITES = [invite("inv-new", true), invite("inv-old", false)];

/** Plain-function render with hook slots (no DOM in this repo's vitest). */
const renderTree = (props: Props): ReactElement =>
  runWithHookSlots(() => AwcProjectMembersInvitePendingList(props));

const findCopyButton = (
  node: ReactNode,
  inviteId: string,
): ReactElement<{ onClick: () => void; children: ReactNode }> | null => {
  if (Array.isArray(node)) {
    for (const child of node) {
      const hit = findCopyButton(child, inviteId);
      if (hit) return hit;
    }
    return null;
  }
  if (!isValidElement(node)) return null;
  const props = node.props as Record<string, unknown>;
  if (props["data-invite-copy"] === inviteId) {
    return node as ReactElement<{ onClick: () => void; children: ReactNode }>;
  }
  return findCopyButton(props.children as ReactNode, inviteId);
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("107 pending Invite sent row: Copy from any device", () => {
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

  it("shows Copy for rows with a stored prompt, disabled Copy + hint for old rows", () => {
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
    expect(html).toContain("Make a new invite to copy a prompt.");
    expect(html.match(/>Cancel</g)).toHaveLength(2);
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
