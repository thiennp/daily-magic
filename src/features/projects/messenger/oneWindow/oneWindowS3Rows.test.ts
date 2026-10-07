import { describe, expect, it } from "vitest";

import { resolveMessengerGate } from "@/features/projects/messenger/AwcProjectMessengerGate";
import {
  oneWindowArchivedNoticeText,
  oneWindowQuietNoticeTexts,
} from "@/features/projects/messenger/oneWindow/oneWindowFeedNotices";
import { oneWindowTaskUpdateStatus } from "@/features/projects/messenger/oneWindow/oneWindowTaskUpdateStatus";
import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const bot = (
  membershipId: string,
  displayName: string | null,
  status: AwcMessengerBotThread["status"],
): AwcMessengerBotThread => ({
  membershipId,
  displayName,
  status,
  lastMessageAt: null,
  lastPreview: null,
  unreadCount: 0,
});

describe("P1-S3 task-update status (DF-027 labels)", () => {
  it("maps bot task.* reply kinds through the run-status mapper", () => {
    expect(oneWindowTaskUpdateStatus("task.done")).toEqual({ label: "Done", tone: "ok" });
    expect(oneWindowTaskUpdateStatus("task.processing")).toEqual({ label: "Running", tone: "info" });
    expect(oneWindowTaskUpdateStatus("task.status")).toEqual({ label: "Running", tone: "info" });
    expect(oneWindowTaskUpdateStatus("task.received").label).toBe("Queued");
    expect(oneWindowTaskUpdateStatus("task.blocked")).toEqual({ label: "Blocked", tone: "warn" });
  });

  it("an unknown kind is Unknown, never Queued; raw run tokens keep DF-027 labels", () => {
    expect(oneWindowTaskUpdateStatus("task.mystery").label).toBe("Unknown");
    expect(oneWindowTaskUpdateStatus("denied").label).toBe("Denied");
    expect(oneWindowTaskUpdateStatus("expired")).toEqual({ label: "Timed out", tone: "warn" });
  });
});

describe("P1-S3 feed notices from existing data", () => {
  it("archived notice only when something is archived", () => {
    expect(oneWindowArchivedNoticeText(0)).toBeNull();
    expect(oneWindowArchivedNoticeText(1)).toBe(
      "1 older message is archived. It is kept, not deleted.",
    );
    expect(oneWindowArchivedNoticeText(38)).toBe(
      "38 older messages are archived. They are kept, not deleted.",
    );
  });

  it("quiet notices: every silent assistant on the whole feed, only its own privately", () => {
    const bots = [bot("b1", "Inkwell", "silent"), bot("b2", "Scout", "idle"), bot("b3", null, "silent")];
    const whole = oneWindowQuietNoticeTexts({ bots, selectedKey: "whole" });
    expect(whole.map((n) => n.id)).toEqual(["b1", "b3"]);
    expect(whole[0].text).toBe(
      "Inkwell has been quiet for a while. It may be busy, or its computer may be asleep.",
    );
    expect(whole[1].text.startsWith("An assistant has been quiet")).toBe(true);
    expect(oneWindowQuietNoticeTexts({ bots, selectedKey: "b1" }).map((n) => n.id)).toEqual(["b1"]);
    expect(oneWindowQuietNoticeTexts({ bots, selectedKey: "b2" })).toEqual([]);
  });
});

describe("P1-S3 project_required gate", () => {
  const base = { isLoading: false, unavailable: false, forbidden: false, message: null };
  it("no project context → Pick a project; otherwise unchanged", () => {
    expect(resolveMessengerGate({ ...base, threads: null, hasProject: false })).toEqual({
      kind: "no_project",
    });
    expect(resolveMessengerGate({ ...base, threads: null }).kind).toBe("blocked");
  });
});
