import { beforeEach, describe, expect, it, vi } from "vitest";

const getStrict = vi.hoisted(() => vi.fn());
const removeSession = vi.hoisted(() => vi.fn());
const getSql = vi.hoisted(() => vi.fn());
const isDev = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());

vi.mock("@/lib/dispatch/getAgentRunForStrictParticipant", () => ({
  getAgentRunForStrictParticipant: getStrict,
}));
vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  removeAgentRunSession: removeSession,
}));
vi.mock("@/lib/auth/resolveDevDashboardActor", () => ({
  isAgentWitchDevDashboardEnabled: isDev,
}));
vi.mock("@/lib/db", () => ({ getSql }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));

import { deleteAgentRunForParticipant } from "@/lib/dispatch/deleteAgentRunForParticipant";

describe("deleteAgentRunForParticipant", () => {
  beforeEach(() => {
    getStrict.mockReset();
    removeSession.mockReset();
    getSql.mockReset();
    isDev.mockReset();
    isDev.mockReturnValue(true);
  });

  it("refuses delete when actor is not requester/executor", async () => {
    getStrict.mockResolvedValue(null);
    expect(await deleteAgentRunForParticipant("r1", "member-1")).toBe(false);
    expect(removeSession).not.toHaveBeenCalled();
  });

  it("deletes when actor is a strict participant", async () => {
    getStrict.mockResolvedValue({
      id: "r1",
      requesterUserId: "u1",
      executorUserId: "u2",
    });
    expect(await deleteAgentRunForParticipant("r1", "u1")).toBe(true);
    expect(removeSession).toHaveBeenCalledWith("r1");
    expect(getStrict).toHaveBeenCalledWith("r1", "u1");
  });

  it("a project run's requester cannot wipe it; the executor and the project owner can", async () => {
    getStrict.mockResolvedValue({
      id: "r1",
      projectId: "p1",
      requesterUserId: "member",
      executorUserId: "owner-machine-user",
    });
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    expect(await deleteAgentRunForParticipant("r1", "member")).toBe(false);
    expect(await deleteAgentRunForParticipant("r1", "owner")).toBe(true);
    expect(await deleteAgentRunForParticipant("r1", "owner-machine-user")).toBe(
      true,
    );
  });
});
