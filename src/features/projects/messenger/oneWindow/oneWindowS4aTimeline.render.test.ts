import { readFileSync } from "node:fs";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectChatDockHead from "@/features/projects/chatDock/AwcProjectChatDockHead";
import {
  AwcOneWindowDaySeparator,
  AwcOneWindowJumpToNew,
} from "@/features/projects/messenger/oneWindow/AwcOneWindowTimelineMarks";
import AwcMessengerTimeline from "@/features/projects/messenger/AwcMessengerTimeline";
import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

const read = (rel: string): string => readFileSync(path.join(process.cwd(), rel), "utf8");
const noop = (): void => undefined;

const bot = (id: string, createdAt: string): AwcMessengerTimelineEntry => ({
  messageId: id,
  createdAt,
  author: { kind: "bot", membershipId: "b1", displayName: "Scout" },
  kind: "chat.note",
  text: `text ${id}`,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

const timeline = (unreadCount: number): string =>
  renderToStaticMarkup(
    createElement(AwcMessengerTimeline, {
      entries: [bot("a", new Date().toISOString()), bot("b", new Date().toISOString())],
      loadingOlder: false,
      canLoadOlder: false,
      reachedStart: true,
      projectComputerOffline: false,
      onLoadOlder: noop,
      unreadCount,
    }),
  );

describe("P1-S4a timeline marks", () => {
  it("day separator + New marker + jump pill when there is unread", () => {
    const html = timeline(1);
    expect(html).toContain('role="separator"');
    expect(html).toContain("Today · ");
    expect(html).toMatch(/id="awc-ow-new-marker"[^>]*>New</);
    expect(html.indexOf("awc-ow-new-marker")).toBeLessThan(html.indexOf("text b"));
    expect(html.indexOf("awc-ow-new-marker")).toBeGreaterThan(html.indexOf("text a"));
    expect(html).toContain("1 new");
  });

  it("no unread → no New marker, no jump pill", () => {
    const html = timeline(0);
    expect(html).not.toContain("awc-ow-new-marker");
    expect(html).not.toContain("Jump to the first new message");
  });

  it("marks use sand / Pine tokens only", () => {
    expect(renderToStaticMarkup(createElement(AwcOneWindowDaySeparator, { label: "Mon 5 Oct" }))).toContain("text-awc-fg-subtle");
    const jump = renderToStaticMarkup(createElement(AwcOneWindowJumpToNew, { count: 3, onJump: noop }));
    expect(jump).toContain("3 new");
    expect(jump).toContain("bg-awc-primary");
  });
});

describe("P1-S4a Access · N pending pill", () => {
  const head = (full: boolean, count: number): string =>
    renderToStaticMarkup(
      createElement(AwcProjectChatDockHead, {
        full,
        onToggleFull: noop,
        onClose: noop,
        accessPendingCount: count,
        onOpenAccess: noop,
      }),
    );

  it("shows in full view when requests are open; never in the compact dock", () => {
    expect(head(true, 2)).toContain("Access · 2 pending");
    expect(head(true, 2)).toContain('aria-label="Open Access: 2 pending"');
    expect(head(true, 0)).not.toContain("pending");
    expect(head(false, 2)).not.toContain("pending");
  });

  it("owner-only count from live Access data; opens the rail's Join requests", () => {
    const dock = read("src/features/projects/chatDock/AwcProjectChatDock.tsx");
    expect(dock).toContain("accessPendingCount={isOwner ? access.pending.length : 0}");
    expect(read("src/features/projects/chatDock/openProjectAccessPending.ts")).toContain('"members-join-requests"');
  });
});
