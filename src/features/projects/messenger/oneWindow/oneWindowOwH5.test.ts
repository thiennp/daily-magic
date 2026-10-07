import { describe, expect, it } from "vitest";

import {
  deriveOneWindowKind,
  isOneWindowApprovalItem,
  isOneWindowNeedsYouForViewer,
  isOneWindowNeedsYouItem,
  mapMessengerEntryToOneWindowItem,
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
} from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import {
  AWC_MESSENGER_WINDOW_KINDS,
  type AwcMessengerStateChip,
  type AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { parseMessengerOpenThread } from "@/features/projects/messenger/utils/parseMessengerTimeline";

const entry = (
  over: Partial<AwcMessengerTimelineEntry> = {},
): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T12:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: "Thien" },
  kind: "chat.note",
  text: "hello",
  needsReply: false,
  inReplyTo: null,
  states: [],
  ...over,
});

const chip = (
  membershipId: string,
  state: AwcMessengerStateChip["state"],
  displayName: string | null = membershipId,
): AwcMessengerStateChip => ({ membershipId, displayName, state, reason: null });

describe("OW-H5 feed window kind / subject state bind", () => {
  it("derives window kind from existing feed fields (DESIGN §3.1)", () => {
    expect(deriveOneWindowKind(entry())).toBe("chat");
    expect(deriveOneWindowKind(entry({ kind: "task.assign" }))).toBe("task");
    const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };
    expect(deriveOneWindowKind(entry({ author: bot, kind: "task.done" }))).toBe(
      "task_update",
    );
    expect(deriveOneWindowKind(entry({ author: bot, kind: "chat.note" }))).toBe(
      "chat",
    );
    expect(
      deriveOneWindowKind(
        entry({
          kind: "ai.session",
          entryKind: "session",
          session: { status: "running", writerAgent: null, agentRunId: "r1" },
        }),
      ),
    ).toBe("task");
  });

  it("prefers server windowKind when the feed sends it", () => {
    const item = mapMessengerEntryToOneWindowItem(
      entry({ windowKind: "notice" }),
    );
    expect(item.windowKind).toBe("notice");
    expect(item.windowKindFrom).toBe("feed");
    expect(item.subjectState).toBeNull();
    expect(mapMessengerEntryToOneWindowItem(entry()).windowKindFrom).toBe(
      "derived",
    );
  });

  it("task subject state = live delivery chips, worst first, done of N", () => {
    expect(subjectStateFromDeliveries([])).toBeNull();
    const one = subjectStateFromDeliveries([chip("b1", "working", "Scout")]);
    expect(one).toMatchObject({
      source: "deliveries",
      label: "Working on it",
      tone: "info",
      needsYou: false,
    });
    expect(one?.of).toBeUndefined();
    const many = subjectStateFromDeliveries([
      chip("b1", "done"),
      chip("b2", "blocked"),
      chip("b3", "done"),
    ]);
    expect(many).toMatchObject({
      label: "Blocked",
      tone: "warn",
      done: 2,
      of: 3,
      needsYou: true,
    });
    const allDone = subjectStateFromDeliveries([chip("b1", "done"), chip("b2", "done")]);
    expect(allDone).toMatchObject({ label: "Done", tone: "ok", done: 2, of: 2 });
  });

  it("session subject state = live AR status; pending_approval needs you", () => {
    expect(subjectStateFromAgentRun("completed")).toMatchObject({
      source: "agent_run",
      tone: "ok",
      awaitingApproval: false,
    });
    const pending = subjectStateFromAgentRun("pending_approval");
    expect(pending).toMatchObject({
      label: "pending approval",
      tone: "warn",
      needsYou: true,
      awaitingApproval: true,
    });
    const item = mapMessengerEntryToOneWindowItem(
      entry({
        kind: "ai.session",
        entryKind: "session",
        session: { status: "pending_approval", writerAgent: "claude-cli", agentRunId: "r1" },
      }),
    );
    expect(isOneWindowApprovalItem(item)).toBe(true);
    expect(isOneWindowNeedsYouItem(item)).toBe(true);
  });

  it("task update pill only for terminal reply kinds", () => {
    const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };
    const done = mapMessengerEntryToOneWindowItem(entry({ author: bot, kind: "task.done" }));
    expect(done.subjectState).toMatchObject({ source: "reply_kind", label: "Done", tone: "ok" });
    const blocked = mapMessengerEntryToOneWindowItem(
      entry({ author: bot, kind: "task.blocked" }),
    );
    expect(isOneWindowNeedsYouItem(blocked)).toBe(true);
    const status = mapMessengerEntryToOneWindowItem(entry({ author: bot, kind: "task.status" }));
    expect(status.windowKind).toBe("task_update");
    expect(status.subjectState).toBeNull();
  });

  it("filters: plain chat is neither needs-you nor approval", () => {
    const item = mapMessengerEntryToOneWindowItem(entry({ text: "needs a reply" }));
    expect(isOneWindowNeedsYouItem(item)).toBe(false);
    expect(isOneWindowApprovalItem(item)).toBe(false);
    expect(
      isOneWindowApprovalItem(
        mapMessengerEntryToOneWindowItem(entry({ windowKind: "approval_request" })),
      ),
    ).toBe(true);
  });

  it("parser feature-detects windowKind (DESIGN enum only)", () => {
    const raw = (windowKind: unknown) => ({
      messageId: "m1",
      createdAt: "2026-10-07T12:00:00.000Z",
      author: { kind: "owner", membershipId: null, displayName: "Thien" },
      kind: "task.assign",
      text: "x",
      needsReply: true,
      inReplyTo: null,
      states: [],
      windowKind,
    });
    const parsed = parseMessengerOpenThread({
      ok: true,
      threadKey: "whole",
      canSend: true,
      entries: [raw("task"), raw("send_now"), raw(undefined)],
    });
    expect(parsed?.entries.map((e) => e.windowKind)).toEqual([
      "task",
      undefined,
      undefined,
    ]);
    expect("windowKind" in (parsed?.entries[2] ?? {})).toBe(false);
  });
});

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
