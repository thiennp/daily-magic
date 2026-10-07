import { describe, expect, it } from "vitest";

import { mapProjectMessengerRow } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerRow";

const OWNER = "owner-1";
const base = {
  id: "m1",
  kind: "task.assign",
  summary: "hello",
  created_at: "2026-10-07T10:00:00.000Z",
  sender_membership_id: null,
  sender_user_id: OWNER,
  to_membership_id: null,
  to_user_id: null,
  to_team_label: null,
};

describe("mapProjectMessengerRow archive meta + system notices", () => {
  it("maps archived_at / archived_by / seat name", () => {
    const row = mapProjectMessengerRow(
      {
        ...base,
        archived_at: new Date("2026-10-07T11:00:00.000Z"),
        archived_by: "member-user",
        archived_by_display_name: "Sam",
      },
      OWNER,
    );
    expect(row).toMatchObject({
      archivedAt: "2026-10-07T11:00:00.000Z",
      archivedBy: "member-user",
      archivedByDisplayName: "Sam",
    });
  });

  it("owner archiver with no seat name reads as Owner", () => {
    const row = mapProjectMessengerRow(
      { ...base, archived_at: "2026-10-07T11:00:00.000Z", archived_by: OWNER },
      OWNER,
    );
    expect(row.archivedByDisplayName).toBe("Owner");
  });

  it("not archived → nulls; archive columns not selected → no fields", () => {
    const row = mapProjectMessengerRow(
      { ...base, archived_at: null, archived_by: null },
      OWNER,
    );
    expect(row).toMatchObject({
      archivedAt: null,
      archivedBy: null,
      archivedByDisplayName: null,
    });
    expect(mapProjectMessengerRow(base, OWNER)).not.toHaveProperty(
      "archivedAt",
    );
  });

  it("a system notice told to the owner is system, not an owner bubble", () => {
    expect(
      mapProjectMessengerRow({ ...base, kind: "peer.silent" }, OWNER)
        .senderKind,
    ).toBe("system");
    expect(mapProjectMessengerRow(base, OWNER).senderKind).toBe("owner");
  });
});
