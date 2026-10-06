import { beforeEach, describe, expect, it, vi } from "vitest";

const getById = vi.hoisted(() => vi.fn());

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: getById,
}));

import { getAgentRunForStrictParticipant } from "@/lib/dispatch/getAgentRunForStrictParticipant";

describe("getAgentRunForStrictParticipant", () => {
  beforeEach(() => {
    getById.mockReset();
  });

  it("allows requester or executor only", async () => {
    getById.mockResolvedValue({
      id: "r1",
      requesterUserId: "u1",
      executorUserId: "u2",
      projectId: "p1",
    });
    expect(await getAgentRunForStrictParticipant("r1", "u1")).not.toBeNull();
    expect(await getAgentRunForStrictParticipant("r1", "u2")).not.toBeNull();
    expect(await getAgentRunForStrictParticipant("r1", "member-1")).toBeNull();
    expect(await getAgentRunForStrictParticipant("r1", "owner-1")).toBeNull();
  });

  it("returns null when run missing", async () => {
    getById.mockResolvedValue(null);
    expect(await getAgentRunForStrictParticipant("missing", "u1")).toBeNull();
  });
});
