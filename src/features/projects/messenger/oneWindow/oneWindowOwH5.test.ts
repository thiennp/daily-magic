import { describe, expect, it } from "vitest";

import {
  deriveOneWindowKind,
  isOneWindowApprovalItem,
  isOneWindowNeedsYouItem,
  mapMessengerEntryToOneWindowItem,
  subjectStateFromAgentRun,
  subjectStateFromDeliveries,
} from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { chip, entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";

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

});
