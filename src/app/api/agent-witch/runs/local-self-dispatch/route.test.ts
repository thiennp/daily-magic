import { beforeEach, describe, expect, it, vi } from "vitest";

const authMock = vi.hoisted(() => vi.fn());
const existsMock = vi.hoisted(() => vi.fn());
const createMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/agentWitch/requireAgentWitchDeviceAuth", () => ({
  requireAgentWitchDeviceAuth: authMock,
}));
vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: existsMock,
}));
vi.mock("@/lib/dispatch/createAgentRun", () => ({ default: createMock }));
vi.mock("@/lib/dispatch/agentRunSessionRegistry", () => ({
  registerAgentRunSession: vi.fn(),
}));

import { POST } from "@/app/api/agent-witch/runs/local-self-dispatch/route";

const call = () =>
  POST(
    new Request("http://x", {
      method: "POST",
      body: JSON.stringify({
        agentRunId: "run-1",
        prompt: "do it",
        writerAgent: "claude-cli",
      }),
    }),
  );

describe("POST local-self-dispatch", () => {
  beforeEach(() => {
    for (const m of [authMock, existsMock, createMock]) m.mockReset();
    authMock.mockResolvedValue({ device: { id: "d1", userId: "u1" } });
    createMock.mockResolvedValue({ id: "run-1" });
  });

  it("refuses an id that already belongs to a run", async () => {
    existsMock.mockResolvedValue({ id: "run-1" });
    expect((await call()).status).toBe(409);
    expect(createMock).not.toHaveBeenCalled();
  });

  it("creates a run for a fresh id", async () => {
    existsMock.mockResolvedValue(null);
    expect((await call()).status).toBe(200);
    expect(createMock).toHaveBeenCalled();
  });
});
