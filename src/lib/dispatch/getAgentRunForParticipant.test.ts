import { beforeEach, describe, expect, it, vi } from "vitest";

const getById = vi.hoisted(() => vi.fn());
const authorize = vi.hoisted(() => vi.fn());

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: getById,
}));
vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: authorize,
}));

import { getAgentRunForParticipant } from "@/lib/dispatch/getAgentRunForParticipant";

describe("getAgentRunForParticipant", () => {
  beforeEach(() => {
    getById.mockReset();
    authorize.mockReset();
  });

  it("returns run for requester or executor", async () => {
    getById.mockResolvedValue({
      id: "r1",
      requesterUserId: "u1",
      executorUserId: "u2",
      projectId: "p1",
    });
    expect(await getAgentRunForParticipant("r1", "u1")).not.toBeNull();
    expect(await getAgentRunForParticipant("r1", "u2")).not.toBeNull();
    expect(authorize).not.toHaveBeenCalled();
  });

  it("allows project member/viewer when not a participant", async () => {
    getById.mockResolvedValue({
      id: "r1",
      requesterUserId: "a",
      executorUserId: "b",
      projectId: "p1",
    });
    authorize.mockResolvedValue({ ok: true, role: "member" });
    expect(await getAgentRunForParticipant("r1", "member-1")).not.toBeNull();
    expect(authorize).toHaveBeenCalledWith({
      projectId: "p1",
      actorUserId: "member-1",
    });
  });

  it("denies non-member and runs without project", async () => {
    getById.mockResolvedValue({
      id: "r1",
      requesterUserId: "a",
      executorUserId: "b",
      projectId: "p1",
    });
    authorize.mockResolvedValue({ ok: false, reason: "forbidden" });
    expect(await getAgentRunForParticipant("r1", "x")).toBeNull();

    getById.mockResolvedValue({
      id: "r2",
      requesterUserId: "a",
      executorUserId: "b",
      projectId: null,
    });
    expect(await getAgentRunForParticipant("r2", "x")).toBeNull();
  });
});
