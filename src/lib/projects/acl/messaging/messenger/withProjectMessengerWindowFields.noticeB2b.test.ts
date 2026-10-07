import { describe, expect, it } from "vitest";

import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { withProjectMessengerWindowFields } from "@/lib/projects/acl/messaging/messenger/withProjectMessengerWindowFields";

const base: ProjectMessengerTimelineEntry = {
  messageId: "m1",
  createdAt: "2026-10-07T10:00:00.000Z",
  author: { kind: "bot", membershipId: "kai", displayName: "Kai" },
  kind: "task.status",
  text: "handoff",
  needsReply: false,
  inReplyTo: null,
  states: [],
};

describe("withProjectMessengerWindowFields notice + bot_to_bot rows", () => {
  it("an owner-view peer row is bot_to_bot, even with a task.* kind", () => {
    const row = withProjectMessengerWindowFields({
      ...base,
      peer: {
        toMembershipId: "lead",
        toDisplayName: "AW Lead",
        toTeamLabel: null,
      },
    });
    expect(row.windowKind).toBe("bot_to_bot");
    expect(row.subjectState).toBeNull();
  });

  it("a system-author row is a notice", () => {
    const row = withProjectMessengerWindowFields({
      ...base,
      author: { kind: "system", membershipId: null, displayName: "System" },
      kind: "peer.silent",
    });
    expect(row).toMatchObject({ windowKind: "notice", subjectState: null });
  });

  it("a bot lifecycle row (peer.joined) is a notice", () => {
    expect(
      withProjectMessengerWindowFields({ ...base, kind: "peer.joined" })
        .windowKind,
    ).toBe("notice");
  });

  it("a plain bot status line is unchanged (task_update)", () => {
    expect(withProjectMessengerWindowFields(base).windowKind).toBe(
      "task_update",
    );
  });
});
