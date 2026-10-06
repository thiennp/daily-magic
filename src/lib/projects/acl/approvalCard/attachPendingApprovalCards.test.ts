import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  loadUserProfilesByIds: async (ids: readonly string[]) =>
    new Map(
      ids.map((id) => [
        id,
        { id, email: null, name: `Name ${id}`, image: null, isAgent: false },
      ]),
    ),
}));

import { attachPendingApprovalCards } from "@/lib/projects/acl/approvalCard/attachPendingApprovalCards";
import type { PendingRequestView } from "@/lib/projects/acl/buildProjectAccessViews";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";

const view = (
  id: string,
  userId: string,
  isAgent: boolean,
): PendingRequestView => ({
  id,
  requesterUserId: userId,
  requesterIsAgent: isAgent,
  requesterLabel: "Claude helper",
  requestedScopes: [],
  teamLabel: null,
  reason: null,
  createdAt: "2026-10-06T09:00:00.000Z",
  expiresAt: "2026-10-07T09:00:00.000Z",
  suggestedProjectDisplayName: null,
});
const record = (id: string, inviteId: string | null) =>
  ({ id, inviteId }) as unknown as ProjectAccessRequestRecord;

describe("attachPendingApprovalCards", () => {
  beforeEach(() => sqlMock.mockReset());

  it("adds owner/kind/mode for assistants, null for people, read-only SQL", async () => {
    sqlMock
      .mockResolvedValueOnce([
        {
          user_id: "bot-1",
          owner_user_id: "person-1",
          device_request_id: "d1",
          device_client_name: "Claude",
          oauth_code_id: null,
          oauth_client_name: null,
        },
      ])
      .mockResolvedValueOnce([{ id: "inv-1", platform: "muse" }]);
    const out = await attachPendingApprovalCards({
      views: [view("r1", "bot-1", true), view("r2", "human-1", false)],
      records: [record("r1", "inv-1"), record("r2", null)],
      nowMs: Date.parse("2026-10-06T10:00:00.000Z"),
    });
    expect(out[0].approvalCard).toEqual({
      assistantKind: "Claude",
      ownerClaimed: true,
      ownerPersonName: "Name person-1",
      connectVia: "device_code",
      expectedDeliveryMode: "poll",
      modeKnown: true,
      isExpired: false,
    });
    expect(out[1].approvalCard).toBeNull();
    const sqlText = sqlMock.mock.calls
      .map((call) => (call[0] as string[]).join(" "))
      .join(" ");
    expect(sqlText).not.toMatch(/\b(INSERT|UPDATE|DELETE)\b/i);
  });

  it("fails soft when the connect lookup errors (card still renders)", async () => {
    sqlMock
      .mockRejectedValueOnce(new Error("relation missing"))
      .mockResolvedValueOnce([]);
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const out = await attachPendingApprovalCards({
      views: [view("r1", "bot-1", true)],
      records: [record("r1", null)],
    });
    expect(out[0].approvalCard?.ownerClaimed).toBe(false);
    expect(out[0].approvalCard?.assistantKind).toBeNull();
    spy.mockRestore();
  });
});
