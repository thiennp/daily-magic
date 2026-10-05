import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createProjectDeleteSqlMock,
  OWNER_PROJECT,
} from "@/lib/projects/delete/projectDeleteSqlMock.testUtils";

const sqlMock = vi.hoisted(() => ({ current: null as unknown }));
const requireAgentWitchDeviceAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock.current,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/agentWitch/requireAgentWitchDeviceAuth", () => ({
  requireAgentWitchDeviceAuth,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
  listUserProjectsForOwner: vi.fn(),
}));

import { DELETE as deleteFromDevice } from "@/app/api/agent-witch/projects/[projectId]/route";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sql = (): ReturnType<typeof createProjectDeleteSqlMock> =>
  sqlMock.current as ReturnType<typeof createProjectDeleteSqlMock>;

const callDevice = (projectId: string) =>
  deleteFromDevice(
    new Request("http://test/api/agent-witch/projects/x", { method: "DELETE" }),
    { params: Promise.resolve({ projectId }) },
  );

describe("DELETE /api/agent-witch/projects/[projectId] (device auth, same orchestrator)", () => {
  beforeEach(() => {
    sqlMock.current = createProjectDeleteSqlMock();
    requireAgentWitchDeviceAuth.mockReset();
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue({ ...OWNER_PROJECT });
  });

  it("device of the owner: 200 and one guarded DELETE", async () => {
    requireAgentWitchDeviceAuth.mockResolvedValue({
      device: { userId: OWNER_PROJECT.ownerUserId },
    });
    const response = await callDevice(OWNER_PROJECT.id);
    expect(response.status).toBe(200);
    expect(sql()).toHaveBeenCalledTimes(1);
    expect(sql().transaction).not.toHaveBeenCalled();
  });

  it("device of another user: 403 and nothing deleted", async () => {
    requireAgentWitchDeviceAuth.mockResolvedValue({
      device: { userId: "intruder-2" },
    });
    const response = await callDevice(OWNER_PROJECT.id);
    expect(response.status).toBe(403);
    expect(sql()).not.toHaveBeenCalled();
  });
});
