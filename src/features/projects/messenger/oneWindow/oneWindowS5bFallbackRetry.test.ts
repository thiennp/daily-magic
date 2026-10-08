import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import AwcOneWindowKeptRetryNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptRetryNotice";
import { entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";
import {
  type OneWindowKeptProgressRef,
  type OneWindowSendMessage,
  sendOneWindowMessageTo,
} from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import { oneWindowReplyKindStatus } from "@/features/projects/messenger/oneWindow/oneWindowTaskUpdateStatus";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };
const row = (over: Partial<AwcMessengerTimelineEntry>): string =>
  renderToStaticMarkup(
    createElement(AwcMessengerTimelineEntryRow, {
      entry: entry({ author: bot, ...over }),
      isMine: false,
    }),
  );

describe("P1-S5b reply-kind pill fallback (subjectState null or missing)", () => {
  it("maps task.* kinds through DF-027; other kinds get no pill", () => {
    expect(oneWindowReplyKindStatus("task.received")?.label).toBe("Queued");
    expect(oneWindowReplyKindStatus("task.processing")?.label).toBe("Running");
    expect(oneWindowReplyKindStatus("task.status")?.label).toBe("Running");
    expect(oneWindowReplyKindStatus("task.done")).toEqual({
      label: "Done",
      tone: "ok",
    });
    expect(oneWindowReplyKindStatus("task.blocked")).toEqual({
      label: "Blocked",
      tone: "warn",
    });
    expect(oneWindowReplyKindStatus("chat.note")).toBeNull();
  });

  it("null or missing subjectState → fallback pill; present subjectState always wins", () => {
    expect(
      row({
        kind: "task.received",
        windowKind: "task_update",
        subjectState: null,
      }),
    ).toContain(">Queued<");
    expect(row({ kind: "task.processing" })).toContain(">Running<");
    const done = {
      source: "reply_kind" as const,
      status: "done",
      needsYou: false,
      awaitingApproval: false,
    };
    const wins = row({
      kind: "task.received",
      windowKind: "task_update",
      subjectState: done,
    });
    expect(wins).toContain(">Done<");
    expect(wins).not.toContain(">Queued<");
  });
});

describe("P1-S5b kept send retry (one recipient, 093103ac)", () => {
  const kept = { kind: "assistant" as const, membershipId: "b1" };

  it("a failed kept send stays pending; the retry sends once and clears tracking", async () => {
    const progress: OneWindowKeptProgressRef = { current: null };
    const send = vi.fn<OneWindowSendMessage>(async () => true);
    send.mockResolvedValueOnce(false);
    await expect(
      sendOneWindowMessageTo(send, "hi", kept, progress),
    ).resolves.toBe(false);
    expect(progress.current).toEqual({ text: "hi", sent: [], pending: ["b1"] });
    send.mockClear();
    await expect(
      sendOneWindowMessageTo(send, "hi", kept, progress),
    ).resolves.toBe(true);
    expect(send.mock.calls.map((call) => call[2])).toEqual(["b1"]);
    expect(progress.current).toBeNull();
  });

  it("the retry notice names who has not got the draft yet", () => {
    const assistants = [{ membershipId: "b1", displayName: "Forge" }];
    const html = renderToStaticMarkup(
      createElement(AwcOneWindowKeptRetryNotice, {
        pendingKeys: ["b1"],
        assistants,
      }),
    );
    expect(html).toContain("Not sent to Forge yet. Send again to retry.");
  });
});
