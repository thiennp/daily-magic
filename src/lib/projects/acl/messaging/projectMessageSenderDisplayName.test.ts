import { describe, expect, it } from "vitest";

import { mapProjectInboxRow } from "@/lib/projects/acl/messaging/mapProjectInboxRow";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";
import {
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const row = (overrides: Record<string, unknown>) => ({
  id: "msg-1",
  kind: "task.assign",
  summary: "s",
  refs: {},
  sender_membership_id: null,
  sender_display_name: null,
  created_at: "2026-10-05T08:00:00.000Z",
  acked_at: null,
  ...overrides,
});

describe("sender display name for inbox and log", () => {
  it.each([
    PROJECT_MESSAGE_KIND_PEER_SILENT,
    PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
  ])("shows the system sender for %s, not Owner or the peer", (kind) => {
    for (const map of [mapProjectInboxRow, mapProjectMessageLogRow]) {
      const mapped = map(row({ kind }));
      expect(mapped.fromProjectDisplayName).toBe(
        PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME,
      );
      expect(mapped.fromMembershipId).toBeNull();
    }
  });

  it("keeps Owner for owner messages and the member name for members", () => {
    expect(mapProjectInboxRow(row({})).fromProjectDisplayName).toBe("Owner");
    expect(
      mapProjectInboxRow(
        row({ sender_membership_id: "mem-b", sender_display_name: "Bot B" }),
      ).fromProjectDisplayName,
    ).toBe("Bot B");
  });
});
