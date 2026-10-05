import { describe, expect, it } from "vitest";

import { buildProjectComputerHistoryMessage } from "@/lib/projects/acl/messaging/buildProjectComputerHistoryMessage";
import { mapProjectMessageLogRow } from "@/lib/projects/acl/messaging/mapProjectMessageLogRow";

const CREATED_AT = "2026-10-05T07:00:00.000Z";

const liveInput = (
  senderMembershipId: string | null,
  senderProjectDisplayName: string | null,
  kind = "task",
) => ({
  messageId: "m1",
  createdAt: CREATED_AT,
  refs: { pr: "12" },
  kind,
  summary: "Ship it",
  senderMembershipId,
  senderProjectDisplayName,
  toMembershipId: "mem-to",
  toUserId: "user-to",
  toTeamLabel: null,
  toProjectDisplayName: "Buni",
});

/** Row as listProjectComputerHistoryBacklog selects it for the same message. */
const backlogRow = (
  senderMembershipId: string | null,
  senderDisplayName: string | null,
  kind = "task",
) => ({
  id: "m1",
  project_id: "p1",
  kind,
  summary: "Ship it",
  refs: { pr: "12" },
  sender_membership_id: senderMembershipId,
  sender_display_name: senderDisplayName,
  to_membership_id: "mem-to",
  to_user_id: "user-to",
  to_team_label: null,
  to_project_display_name: "Buni",
  recipient_display_name: "Buni",
  created_at: CREATED_AT,
  acked_at: null,
});

describe("buildProjectComputerHistoryMessage", () => {
  it("owner message: same fields as the backlog mapper, sender is Owner", () => {
    const live = buildProjectComputerHistoryMessage(liveInput(null, null));
    expect(live).toEqual(mapProjectMessageLogRow(backlogRow(null, null)));
    expect(live.fromProjectDisplayName).toBe("Owner");
  });

  it("member message: same fields as the backlog mapper", () => {
    const live = buildProjectComputerHistoryMessage(
      liveInput("mem-from", "Cody"),
    );
    expect(live).toEqual(
      mapProjectMessageLogRow(backlogRow("mem-from", "Cody")),
    );
    expect(live.fromProjectDisplayName).toBe("Cody");
    expect(live.ackedAt).toBeNull();
  });
});
