import { beforeEach, describe, expect, it, vi } from "vitest";

const readConfigMock = vi.hoisted(() => vi.fn());
const syncMock = vi.hoisted(() => vi.fn());

vi.mock("@agent-witch/install-runtime-client", () => ({
  readAgentWitchRunConfig: () => readConfigMock(),
}));

vi.mock("@agent-witch/live-projects", () => ({
  resolveAgentWitchCloudApiConfig: (input: unknown) => input,
  syncProjectKnowledgeCandidateToCloud: (
    _config: unknown,
    projectId: string,
    input: unknown,
  ) => syncMock(projectId, input),
}));

import { updateProjectKnowledgeFromWakeServer } from "./updateProjectKnowledgeFromWakeServer";

describe("updateProjectKnowledgeFromWakeServer", () => {
  beforeEach(() => {
    readConfigMock.mockReset();
    syncMock.mockReset();
  });

  it("returns 409 when the Mac is not paired", async () => {
    readConfigMock.mockReturnValue(null);
    const result = await updateProjectKnowledgeFromWakeServer({
      projectId: "p1",
      lesson: "note",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.httpStatus).toBe(409);
    }
  });

  it("proxies to cloud when paired", async () => {
    readConfigMock.mockReturnValue({
      wsUrl: "wss://www.agentwitch.com/api/agent-witch/ws",
      pairingToken: "tok",
      layout: { configPath: "/tmp/.agent-witch/config.json" },
    });
    syncMock.mockResolvedValue({ ok: true, id: "kid-1" });

    const result = await updateProjectKnowledgeFromWakeServer({
      projectId: "p1",
      lesson: "Ship small diffs.",
    });

    expect(result).toEqual({ ok: true, id: "kid-1" });
  });
});
