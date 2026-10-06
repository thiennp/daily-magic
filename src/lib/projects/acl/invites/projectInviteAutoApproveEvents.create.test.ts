import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectInvite } from "@/lib/projects/acl/invites/createProjectInvite";
import { listProjectInviteAutoApproveEvents } from "@/lib/projects/acl/invites/listProjectInviteAutoApproveEvents";
import { installAutoApproveEventsSqlStub } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvents.fixtures";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

const sqlMock = vi.fn();
const stored: Record<string, unknown>[] = [];

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

describe("create invite autoApprove durable events", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    stored.length = 0;
    resetProjectAclSchemaEnsureForTests();
    installAutoApproveEventsSqlStub({ sqlMock, stored });
  });

  it("create with autoApprove on writes enabled", async () => {
    const created = await createProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events.map((e) => e.event)).toEqual(["enabled"]);
    expect(events[0]?.inviteId).toBe(created.invite.id);
    expect(events[0]?.inviteLabel).toBe(created.invite.id.slice(0, 8));
    expect(events[0]?.actorUserId).toBe("owner-1");
  });
});
