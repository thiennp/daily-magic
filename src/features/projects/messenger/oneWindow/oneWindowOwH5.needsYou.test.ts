import { describe, expect, it } from "vitest";

import {
  isOneWindowNeedsYouForViewer,
  mapMessengerEntryToOneWindowItem,
} from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { chip, entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";
import {
  AWC_MESSENGER_WINDOW_KINDS,
  type AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";

describe("AWD-3b Needs you scope (owner-created or assigned to viewer)", () => {
  const owner = { kind: "owner" as const, membershipId: null, displayName: "Thien" };
  const member = { kind: "member" as const, membershipId: "mem-linh", displayName: "Linh" };
  const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };

  const needsYou = (
    target: AwcMessengerTimelineEntry,
    viewer: { isOwner: boolean; membershipId?: string | null },
    all: readonly AwcMessengerTimelineEntry[] = [target],
  ): boolean =>
    isOneWindowNeedsYouForViewer({
      entry: target,
      item: mapMessengerEntryToOneWindowItem(target),
      viewer,
      entriesById: new Map(all.map((e) => [e.messageId, e])),
    });

  const blockedTask = (author: AwcMessengerTimelineEntry["author"], id = "t1") =>
    entry({
      messageId: id,
      author,
      kind: "task.assign",
      states: [chip("b1", "blocked", "Scout")],
    });

  it("owner viewer: own blocked task counts; a member's blocked task does not", () => {
    expect(needsYou(blockedTask(owner), { isOwner: true })).toBe(true);
    expect(needsYou(blockedTask(member), { isOwner: true })).toBe(false);
    expect(
      needsYou(
        entry({ author: member, kind: "task.assign", states: [chip("b1", "no_answer")] }),
        { isOwner: true },
      ),
    ).toBe(false);
  });

  it("member viewer: owner's and other members' blocked tasks never count", () => {
    expect(needsYou(blockedTask(owner), { isOwner: false })).toBe(false);
    expect(needsYou(blockedTask(member), { isOwner: false, membershipId: "mem-other" })).toBe(
      false,
    );
  });

  it("assigned to viewer counts (viewer membership among recipients)", () => {
    const toLinh = entry({
      author: owner,
      kind: "task.assign",
      states: [chip("mem-linh", "blocked", "Linh")],
    });
    expect(needsYou(toLinh, { isOwner: false, membershipId: "mem-linh" })).toBe(true);
    expect(needsYou(toLinh, { isOwner: false, membershipId: null })).toBe(false);
  });

  it("blocked reply counts through its parent task's owner", () => {
    const ownTask = entry({ messageId: "p1", author: owner, kind: "task.assign" });
    const memberTask = entry({ messageId: "p2", author: member, kind: "task.assign" });
    const reply = (parent: string) =>
      entry({ messageId: `r-${parent}`, author: bot, kind: "task.blocked", inReplyTo: parent });
    const all = [ownTask, memberTask, reply("p1"), reply("p2"), reply("gone")];
    expect(needsYou(reply("p1"), { isOwner: true }, all)).toBe(true);
    expect(needsYou(reply("p2"), { isOwner: true }, all)).toBe(false);
    expect(needsYou(reply("gone"), { isOwner: true }, all)).toBe(false);
  });

  it("run pending approval counts for the owner only; plain chat never", () => {
    const run = entry({
      author: bot,
      kind: "ai.session",
      entryKind: "session",
      session: { status: "pending_approval", writerAgent: null, agentRunId: "r1" },
    });
    expect(needsYou(run, { isOwner: true })).toBe(true);
    expect(needsYou(run, { isOwner: false })).toBe(false);
    expect(needsYou(entry({ author: owner }), { isOwner: true })).toBe(false);
  });

  it("window kinds: one as-const list; waiting fallback says assistant", () => {
    expect(AWC_MESSENGER_WINDOW_KINDS).toEqual([
      "chat",
      "task",
      "task_update",
      "approval_request",
      "approval_result",
      "notice",
      "bot_to_bot",
    ]);
    expect(formatMessengerStateLabel("waiting", null)).toBe(
      "Waiting for the assistant to confirm",
    );
  });
});
