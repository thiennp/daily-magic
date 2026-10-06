import { beforeEach, describe, expect, it, vi } from "vitest";

import { listProjectInviteAutoApproveEvents } from "@/lib/projects/acl/invites/listProjectInviteAutoApproveEvents";
import { installAutoApproveEventsSqlStub } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvents.fixtures";
import { updateProjectInviteAutoApprove } from "@/lib/projects/acl/invites/updateProjectInviteAutoApprove";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

const sqlMock = vi.fn();
const stored: Record<string, unknown>[] = [];
const INVITE_ID = "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee";

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

describe("toggle invite autoApprove durable events", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    stored.length = 0;
    resetProjectAclSchemaEnsureForTests();
    installAutoApproveEventsSqlStub({ sqlMock, stored });
    stored.push({ _kind: "invite_state", id: INVITE_ID, auto_approve: false });
  });

  it("toggle on then off writes 2 rows; same value writes nothing", async () => {
    const on = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: INVITE_ID,
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(on.ok).toBe(true);
    const again = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: INVITE_ID,
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(again.ok).toBe(true);
    const off = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: INVITE_ID,
      ownerUserId: "owner-1",
      autoApprove: false,
    });
    expect(off.ok).toBe(true);
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events.map((e) => e.event)).toEqual(["disabled", "enabled"]);
  });
});
