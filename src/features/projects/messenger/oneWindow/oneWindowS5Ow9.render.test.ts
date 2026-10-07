import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcMessengerTimelineEntryRow from "@/features/projects/messenger/AwcMessengerTimelineEntryRow";
import { chip, entry } from "@/features/projects/messenger/oneWindow/oneWindowOwH5.fixtures";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const bot = { kind: "bot" as const, membershipId: "b1", displayName: "Scout" };
const flags = { needsYou: false, awaitingApproval: false };
const row = (over: Partial<AwcMessengerTimelineEntry>): string =>
  renderToStaticMarkup(
    createElement(AwcMessengerTimelineEntryRow, { entry: entry({ author: bot, ...over }), isMine: false }),
  );

describe("P1-S5 One window rows from OW9 windowKind", () => {
  it("task_update pill comes from subjectState (DF-027); null → reply-kind fallback (S5b)", () => {
    const state = { source: "reply_kind" as const, status: "done", ...flags };
    const done = row({ kind: "task.done", text: "fixed", windowKind: "task_update", subjectState: state });
    expect(done).toContain("<b>Scout</b>");
    expect(done).toContain(">Done<");
    expect(done).toContain("bg-awc-ok-soft");
    const plain = row({ kind: "chat.note", text: "on it", windowKind: "task_update", subjectState: null });
    expect(plain).toContain("on it");
    expect(plain).not.toContain("rounded-full px-2 py-0.5 text-[12px]");
  });

  it("approval_request waits for you; approval_result is a plain card", () => {
    const req = row({ text: "wants to run tests", windowKind: "approval_request", subjectState: null });
    expect(req).toContain('data-ow-window-kind="approval_request"');
    expect(req).toContain("Waiting for you");
    expect(req).toContain("wants to run tests");
    const res = row({ text: "approved", windowKind: "approval_result", subjectState: null });
    expect(res).toContain('data-ow-window-kind="approval_result"');
    expect(res).not.toContain("Waiting for you");
  });

  it("notice and bot_to_bot stay wired to windowKind (light up with Dispatch r2)", () => {
    const notice = row({ windowKind: "notice", text: "Linh joined the project.", subjectState: null });
    expect(notice).toContain('role="note"');
    const b2b = row({ windowKind: "bot_to_bot", subjectState: null, states: [chip("b2", "received", "Forge")] });
    expect(b2b).toContain("Between assistants");
    expect(b2b).toContain("Forge");
  });

  it("a task row with a server deliveries state renders the task card", () => {
    const html = row({
      author: { kind: "owner", membershipId: null, displayName: "Thien" },
      kind: "task.assign",
      text: "Check VAT",
      windowKind: "task",
      states: [chip("b1", "working", "Scout")],
      subjectState: { source: "deliveries", status: "working", done: 0, of: 1, ...flags },
    });
    expect(html).toContain("Check VAT");
    expect(html).toContain("To Scout");
  });
});
