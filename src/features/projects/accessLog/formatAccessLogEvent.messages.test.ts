import { describe, expect, it } from "vitest";

import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/public-api/types";

const event = (
  type: "messages.archived" | "messages.restored",
  count: number,
): ProjectActivityLogEvent => ({
  id: "e1",
  type,
  category: "access",
  at: "2026-10-06T11:00:00.000Z",
  actor: { kind: "owner", userId: "owner-1", displayName: null },
  target: null,
  detail: { count },
});

describe("Access log: Clear all + Restore rows", () => {
  it("renders LOCK activity.archived / activity.restored", () => {
    expect(formatAccessLogEvent(event("messages.archived", 12))).toEqual({
      line: "You cleared 12 messages to Archived",
      detail: null,
    });
    expect(formatAccessLogEvent(event("messages.restored", 3))).toEqual({
      line: "You restored 3 messages",
      detail: null,
    });
  });
});
