import { describe, expect, it } from "vitest";


import { mapAgentRunToMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";
import { mergeProjectMessengerNeonTimelinePage } from "@/lib/projects/acl/messaging/messenger/mergeProjectMessengerNeonTimelinePage";
import {
  encodeProjectMessengerCursor,
  decodeProjectMessengerCursor,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { resolveProjectMessengerLoadPage } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerLoadPage";
import {
  PROJECT_MESSENGER_ENTRY_KIND_SESSION,
  PROJECT_MESSENGER_WHOLE_THREAD_KEY,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

const message = (
  messageId: string,
  createdAt: string,
): ProjectMessengerTimelineEntry => ({
  messageId,
  createdAt,
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "chat.note",
  text: messageId,
  needsReply: false,
  inReplyTo: null,
  states: [],
});

const session = (
  id: string,
  createdAt: string,
): ProjectMessengerTimelineEntry =>
  mapAgentRunToMessengerTimelineEntry({
    id,
    createdAt,
    status: "completed",
    writerAgent: "claude-cli",
    prompt: "task",
  });

describe("mergeProjectMessengerNeonTimelinePage", () => {
  it("merges messages + sessions newest-first and pages by limit", () => {
    const msgId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
    const runId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
    const result = mergeProjectMessengerNeonTimelinePage({
      messageEntries: [
        message(msgId, "2026-10-07T03:00:00.000000Z"),
        message("cccccccc-cccc-4ccc-8ccc-cccccccccccc", "2026-10-07T01:00:00.000000Z"),
      ],
      messageHasMore: false,
      sessionEntries: [session(runId, "2026-10-07T02:00:00.000000Z")],
      sessionHasMore: false,
      limit: 2,
    });
    expect(result.entries.map((e) => e.messageId)).toEqual([msgId, runId]);
    expect(result.entries[1]?.entryKind).toBe(PROJECT_MESSENGER_ENTRY_KIND_SESSION);
    expect(result.entries[1]?.session?.agentRunId).toBe(runId);
    expect(result.hasMore).toBe(true);
  });

  it("cursor across sources uses raw ids and createdAt as t", () => {
    const runId = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
    const createdAt = "2026-10-07T02:30:00.123456Z";
    const entry = session(runId, createdAt);
    const encoded = encodeProjectMessengerCursor({
      t: entry.createdAt,
      id: entry.messageId,
    });
    expect(decodeProjectMessengerCursor(encoded)).toEqual({
      t: createdAt,
      id: runId,
    });
  });

  it("whole-only: merge without sessions returns messages unchanged", () => {
    // Scoping is enforced in loadProjectMessengerNeonThreadPage (skips runs
    // when threadKey !== whole). Merge itself is source-agnostic.
    expect(PROJECT_MESSENGER_WHOLE_THREAD_KEY).toBe("whole");
    const onlyMessages = mergeProjectMessengerNeonTimelinePage({
      messageEntries: [message("eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee", "2026-10-07T01:00:00.000000Z")],
      messageHasMore: false,
      sessionEntries: [],
      sessionHasMore: false,
      limit: 50,
    });
    expect(onlyMessages.entries).toHaveLength(1);
    expect(onlyMessages.entries[0]?.entryKind).toBeUndefined();
  });
});

describe("hosted empty local + neon sessions", () => {
  it("fills from neon when local slice is empty even if localLive", () => {
    const runId = "ffffffff-ffff-4fff-8fff-ffffffffffff";
    const neon = mergeProjectMessengerNeonTimelinePage({
      messageEntries: [],
      messageHasMore: false,
      sessionEntries: [session(runId, "2026-10-07T04:00:00.000000Z")],
      sessionHasMore: false,
      limit: 50,
    });
    const resolved = resolveProjectMessengerLoadPage({
      localEntries: [],
      localHasMore: false,
      neonEntries: neon.entries,
      neonHasMore: neon.hasMore,
      localLive: true,
      beforeRequested: false,
      limit: 50,
    });
    expect(resolved.entries).toHaveLength(1);
    expect(resolved.entries[0]?.entryKind).toBe(PROJECT_MESSENGER_ENTRY_KIND_SESSION);
    expect(resolved.entries[0]?.session?.agentRunId).toBe(runId);
    expect(resolved.page.source).toBe("neon");
    expect(resolved.error).toBeUndefined();
  });
});
