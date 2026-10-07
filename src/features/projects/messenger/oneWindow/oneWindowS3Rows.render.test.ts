import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import AwcProjectMessengerGateView from "@/features/projects/messenger/AwcProjectMessengerGate";
import AwcOneWindowFeedNotices from "@/features/projects/messenger/oneWindow/AwcOneWindowFeedNotices";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const entry = (over: Partial<AwcMessengerTimelineEntry>): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T10:40:00.000Z",
  author: { kind: "bot", membershipId: "b1", displayName: "Scout" },
  kind: "chat.note",
  text: "moved the invoice fix to Review",
  needsReply: false,
  inReplyTo: null,
  states: [],
  ...over,
});

const row = (e: AwcMessengerTimelineEntry): string =>
  renderToStaticMarkup(createElement(AwcMessengerTimelineEntryRow, { entry: e, isMine: false }));

describe("P1-S3 One window rows mounted in the feed", () => {
  it("task-update rows: DF-027 pill from OW9 subjectState; reply-kind fallback without it", () => {
    const done = { source: "reply_kind" as const, status: "done", needsYou: false, awaitingApproval: false };
    const html = row(entry({ kind: "task.done", windowKind: "task_update", subjectState: done }));
    expect(html).toContain("<b>Scout</b>");
    expect(html).toContain(">Done<");
    expect(html).toContain("bg-awc-ok-soft");
    expect(html).not.toContain("emerald");
    expect(row(entry({ kind: "task.status" }))).toContain(">Running<");
  });

  it("plain bot chat stays a message row (no task-update pill)", () => {
    const html = row(entry({ kind: "chat.note" }));
    expect(html).not.toContain(">Running<");
    expect(html).not.toContain(">Done<");
  });

  it("OW9 windowKind notice / bot_to_bot render their own rows", () => {
    expect(row(entry({ windowKind: "notice", text: "Linh joined the project." }))).toContain(
      'role="note"',
    );
    const b2b = row(
      entry({
        windowKind: "bot_to_bot",
        states: [{ membershipId: "b2", displayName: "Forge", state: "received", reason: null }],
      }),
    );
    expect(b2b).toContain("Between assistants");
    expect(b2b).toContain("Forge");
  });

  it("feed notices: archived with Restore, quiet assistants", () => {
    const html = renderToStaticMarkup(
      createElement(AwcOneWindowFeedNotices, {
        archivedText: "38 older messages are archived. They are kept, not deleted.",
        onRestore: () => undefined,
        quiet: [{ id: "b1", text: "Inkwell has been quiet for a while." }],
      }),
    );
    expect(html).toContain(">Restore<");
    expect(html).toContain("Inkwell has been quiet");
    const none = createElement(AwcOneWindowFeedNotices, { archivedText: null, quiet: [] });
    expect(renderToStaticMarkup(none)).toBe("");
  });

  it("no project context shows the Pick a project state", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectMessengerGateView, { gate: { kind: "no_project" } }),
    );
    expect(html).toContain("Pick a project");
  });
});
