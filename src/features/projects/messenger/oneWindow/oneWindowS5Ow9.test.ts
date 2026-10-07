import { describe, expect, it } from "vitest";

import { mapMessengerEntryToOneWindowItem } from "@/features/projects/messenger/oneWindow/mapMessengerEntryToOneWindowItem";
import { chip, entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";
import { subjectStateFromWire } from "@/features/projects/messenger/oneWindow/oneWindowSubjectStateFromWire";
import { oneWindowTaskUpdateStatus } from "@/features/projects/messenger/oneWindow/oneWindowTaskUpdateStatus";
import { parseMessengerSubjectState } from "@/features/projects/messenger/utils/parseMessengerSubjectState";

const flags = { needsYou: false, awaitingApproval: false };
const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };

describe("P1-S5 OW9 subjectState parser", () => {
  it("keeps codes; null stays null; unusable → undefined (client fallback)", () => {
    const wire = { source: "deliveries", status: "working", done: 1, of: 3, ...flags };
    expect(parseMessengerSubjectState(wire)).toEqual(wire);
    expect(parseMessengerSubjectState(null)).toBeNull();
    expect(parseMessengerSubjectState(undefined)).toBeUndefined();
    expect(parseMessengerSubjectState({ source: "mystery", status: "done" })).toBeUndefined();
    expect(parseMessengerSubjectState({ source: "reply_kind" })).toBeUndefined();
    const bad = parseMessengerSubjectState({ source: "reply_kind", status: "done", done: -1 });
    expect(bad).toEqual({ source: "reply_kind", status: "done", ...flags });
  });
});

describe("P1-S5 task-update status from subjectState (DF-027)", () => {
  it("done / blocked; run tokens through the mapper; reply kinds no longer guessed", () => {
    expect(oneWindowTaskUpdateStatus("done")).toEqual({ label: "Done", tone: "ok" });
    expect(oneWindowTaskUpdateStatus("blocked")).toEqual({ label: "Blocked", tone: "warn" });
    expect(oneWindowTaskUpdateStatus("running")).toEqual({ label: "Running", tone: "info" });
    expect(oneWindowTaskUpdateStatus("expired")).toEqual({ label: "Timed out", tone: "warn" });
    expect(oneWindowTaskUpdateStatus("task.done").label).toBe("Unknown");
  });
});

describe("P1-S5 OW9 windowKind + subjectState drive the item", () => {
  it("deliveries: lead state label/tone; done/of only when of > 1", () => {
    const states = [chip("b1", "done", "Scout"), chip("b2", "blocked", "Forge")];
    const wire = { source: "deliveries" as const, status: "blocked", done: 1, of: 2, needsYou: true, awaitingApproval: false };
    expect(subjectStateFromWire(wire, states)).toMatchObject({ label: "Blocked", tone: "warn", done: 1, of: 2, needsYou: true });
    const one = subjectStateFromWire({ source: "deliveries", status: "working", done: 0, of: 1, ...flags }, states);
    expect(one.of).toBeUndefined();
  });

  it("agent_run keeps the server's approval flags; reply_kind uses DF-027 labels", () => {
    const run = subjectStateFromWire({ source: "agent_run", status: "pending_approval", needsYou: true, awaitingApproval: true }, []);
    expect(run).toMatchObject({ source: "agent_run", awaitingApproval: true, needsYou: true, tone: "warn" });
    const done = subjectStateFromWire({ source: "reply_kind", status: "done", ...flags }, []);
    expect(done).toMatchObject({ label: "Done", tone: "ok" });
  });

  it("feed fields win; server null = no state; pre-OW9 task updates get none", () => {
    const blocked = { source: "reply_kind" as const, status: "blocked", needsYou: true, awaitingApproval: false };
    const fromFeed = mapMessengerEntryToOneWindowItem(
      entry({ author: bot, kind: "task.status", windowKind: "task_update", subjectState: blocked }),
    );
    expect(fromFeed).toMatchObject({ windowKindFrom: "feed", subjectState: { label: "Blocked", needsYou: true } });
    const task = { kind: "task.assign", states: [chip("b1", "working")] };
    expect(mapMessengerEntryToOneWindowItem(entry({ ...task, windowKind: "task", subjectState: null })).subjectState).toBeNull();
    const legacy = mapMessengerEntryToOneWindowItem(entry({ author: bot, kind: "task.done" }));
    expect(legacy).toMatchObject({ windowKind: "task_update", windowKindFrom: "derived", subjectState: null });
    expect(mapMessengerEntryToOneWindowItem(entry(task)).subjectState?.source).toBe("deliveries");
  });
});
