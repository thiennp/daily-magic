import { describe, expect, it } from "vitest";

import { classifyProjectMessageWindowKind as classify } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";

describe("classifyProjectMessageWindowKind (DESIGN §3.1, today's kinds)", () => {
  it.each([
    ["task.assign", "owner", "bot", "task"],
    ["task.assign", "member", "none", "task"],
    ["ai.session", "bot", "none", "task"],
    ["chat.note", "owner", "bot", "chat"],
    ["chat.note", "bot", "owner", "chat"],
    ["task.received", "bot", "owner", "task_update"],
    ["task.processing", "bot", "member", "task_update"],
    ["task.status", "bot", "owner", "task_update"],
    ["task.done", "bot", "owner", "task_update"],
    ["task.blocked", "bot", "owner", "task_update"],
    ["peer.silent", "system", "bot", "notice"],
    ["peer.silent_blocked", "system", "bot", "notice"],
    ["peer.joined", "bot", "none", "notice"],
    ["peer.left", "bot", "none", "notice"],
    ["project.updated", "system", "member", "notice"],
    ["chat.note", "bot", "bot", "bot_to_bot"],
    ["task.done", "bot", "bot", "task_update"],
    ["approval.request", "system", "owner", "approval_request"],
    ["approval.result", "bot", "none", "approval_result"],
  ] as const)(
    "%s from %s to %s → %s",
    (kind, senderKind, recipientKind, expected) => {
      expect(classify({ kind, senderKind, recipientKind })).toBe(expected);
    },
  );
});
