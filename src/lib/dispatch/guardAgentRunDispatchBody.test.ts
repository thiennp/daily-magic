import { beforeEach, describe, expect, it, vi } from "vitest";

const runMock = vi.hoisted(() => vi.fn());
const projectMock = vi.hoisted(() => vi.fn());
const seatMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/dispatch/agentRunQueries", () => ({ getAgentRunById: runMock }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: projectMock,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: seatMock,
}));

import { guardAgentRunDispatchBody } from "@/lib/dispatch/guardAgentRunDispatchBody";

const guard = (body: Parameters<typeof guardAgentRunDispatchBody>[0]["body"]) =>
  guardAgentRunDispatchBody({ requesterUserId: "me", body });

describe("guardAgentRunDispatchBody", () => {
  beforeEach(() => {
    for (const m of [runMock, projectMock, seatMock]) m.mockReset();
  });

  it("lets a run be continued only by someone who took part in it", async () => {
    runMock.mockResolvedValue({
      requesterUserId: "other",
      executorUserId: "other",
    });
    expect(await guard({ sourceRunId: "r1" })).toMatchObject({ ok: false });
    runMock.mockResolvedValue({ requesterUserId: "me", executorUserId: "x" });
    expect(await guard({ sourceRunId: "r1" })).toEqual({ ok: true });
    runMock.mockResolvedValue(null);
    expect(await guard({ sourceRunId: "gone" })).toMatchObject({ ok: false });
  });

  it("sends a project run to a colleague only when they are on the project", async () => {
    projectMock.mockResolvedValue({ ownerUserId: "me" });
    seatMock.mockResolvedValue(null);
    expect(
      await guard({ projectId: "p1", targetUserId: "colleague" }),
    ).toMatchObject({
      ok: false,
    });
    seatMock.mockResolvedValue({ role: "member" });
    expect(await guard({ projectId: "p1", targetUserId: "colleague" })).toEqual(
      {
        ok: true,
      },
    );
    expect(await guard({ projectId: "p1", targetUserId: "me" })).toEqual({
      ok: true,
    });
  });
});
