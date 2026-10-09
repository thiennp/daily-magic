import { beforeEach, describe, expect, it, vi } from "vitest";

const projectMock = vi.hoisted(() => vi.fn());
const seatMock = vi.hoisted(() => vi.fn());
const writeMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: projectMock,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: seatMock,
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: writeMock,
}));

import { auditProjectAclActivityEvent } from "@/lib/agentAccess/auditProjectAclActivityEvent";

const audit = (actorUserId: string) =>
  auditProjectAclActivityEvent({
    projectId: "p1",
    actorUserId,
    action: "membership_check_deny",
  });

describe("auditProjectAclActivityEvent", () => {
  beforeEach(() => {
    for (const m of [projectMock, seatMock, writeMock]) m.mockClear();
    projectMock.mockResolvedValue({ ownerUserId: "owner" });
  });

  it("logs the owner and active members, but not a stranger", async () => {
    seatMock.mockResolvedValue(null);
    await audit("owner");
    expect(writeMock).toHaveBeenCalledTimes(1);
    await audit("stranger");
    expect(writeMock).toHaveBeenCalledTimes(1);
    seatMock.mockResolvedValue({ role: "member" });
    await audit("member");
    expect(writeMock).toHaveBeenCalledTimes(2);
  });
});
