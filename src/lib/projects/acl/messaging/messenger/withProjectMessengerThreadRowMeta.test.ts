import { describe, expect, it } from "vitest";

import type { ProjectMessengerWindowTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessengerWindowFields.type";
import { withProjectMessengerThreadRowMeta } from "@/lib/projects/acl/messaging/messenger/withProjectMessengerThreadRowMeta";

const PARENT = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";

const entry = (
  messageId: string,
  inReplyTo: string | null,
  extra: Partial<ProjectMessengerWindowTimelineEntry> = {},
): ProjectMessengerWindowTimelineEntry => ({
  messageId,
  createdAt: "2026-10-07T10:00:00.000Z",
  author: { kind: "bot", membershipId: "b1", displayName: "Kai" },
  kind: "task.status",
  text: messageId,
  needsReply: false,
  inReplyTo,
  states: [],
  windowKind: "chat",
  subjectState: null,
  ...extra,
});

describe("withProjectMessengerThreadRowMeta (grouping by parent)", () => {
  // Newest first, as the thread GET returns them.
  const page = [
    entry("r2", PARENT),
    entry("orphan", "cccccccc-cccc-4ccc-8ccc-cccccccccccc"),
    entry("r1", PARENT.toUpperCase()),
    entry(PARENT, null, {
      author: { kind: "owner", membershipId: null, displayName: "Owner" },
    }),
  ];

  it("keeps order and adds parentMessageId + replyIds (oldest first)", () => {
    const rows = withProjectMessengerThreadRowMeta(page);
    expect(rows.map((row) => row.messageId)).toEqual(
      page.map((e) => e.messageId),
    );
    const parent = rows.find((row) => row.messageId === PARENT);
    expect(parent).toMatchObject({
      parentMessageId: null,
      replyIds: ["r1", "r2"],
    });
    expect(rows[0]).toMatchObject({ parentMessageId: PARENT, replyIds: [] });
  });

  it("a reply whose parent is not on the page still carries the parent id", () => {
    const orphan = withProjectMessengerThreadRowMeta(page)[1];
    expect(orphan.parentMessageId).toBe("cccccccc-cccc-4ccc-8ccc-cccccccccccc");
  });

  it("archived defaults to null; existing archive meta is kept", () => {
    const meta = {
      at: "2026-10-07T11:00:00.000Z",
      byUserId: "u",
      byDisplayName: null,
    };
    const rows = withProjectMessengerThreadRowMeta([
      entry("a", null, { archived: meta }),
      entry("b", null),
    ]);
    expect(rows[0].archived).toEqual(meta);
    expect(rows[1].archived).toBeNull();
  });

  it("a row never parents itself", () => {
    const [row] = withProjectMessengerThreadRowMeta([entry("self", "self")]);
    expect(row).toMatchObject({ parentMessageId: null, replyIds: [] });
  });
});
