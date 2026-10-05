import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const pullMock = vi.fn();

vi.mock("@agent-witch/install-runtime-client", () => ({
  readAgentWitchRunConfig: () => ({
    wsUrl: "wss://example.test/ws",
    pairingToken: "tok",
  }),
}));
vi.mock("../../../projects/internal/core/agentWitchCloudApi", () => ({
  resolveAgentWitchCloudApiConfig: () => ({
    appOrigin: "https://example.test",
    pairingToken: "tok",
  }),
}));
vi.mock("./createHttpProjectSkillAwcPublishedSource", () => ({
  createHttpProjectSkillAwcPublishedSource: () => ({
    listPublished: vi.fn(),
    getPublishedBody: vi.fn(),
  }),
}));
vi.mock("./createProjectSkillHistoryPort", () => ({
  createProjectSkillHistoryPort: () => ({ tag: "port" }),
}));
vi.mock("./localProjectHistoryState", () => ({
  listLocalHistoryActiveProjectIds: () => ["should-not-use"],
}));
vi.mock("@agent-witch/shared/projectSkills", () => ({
  pullPublishedProjectSkillsToMirror: (...args: unknown[]) => pullMock(...args),
}));

import { tickProjectComputerHistory } from "./tickProjectComputerHistory";

describe("tickProjectComputerHistory", () => {
  beforeEach(() => {
    pullMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses the provided project id list (ready/degraded filter is the list helper)", async () => {
    pullMock.mockResolvedValue({ ok: true, skipped: false, skills: [] });
    await tickProjectComputerHistory({
      listProjectIds: () => ["p-ready"],
      pullSkills: pullMock,
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
    });
    expect(pullMock).toHaveBeenCalledTimes(1);
    expect(pullMock.mock.calls[0]![0]).toMatchObject({ projectId: "p-ready" });
  });

  it("isolates pull failures from other projects", async () => {
    pullMock
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValueOnce({ ok: true, skipped: false, skills: [] });
    await tickProjectComputerHistory({
      listProjectIds: () => ["p1", "p2"],
      pullSkills: pullMock,
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
    });
    expect(pullMock).toHaveBeenCalledTimes(2);
  });

  it("runs injected skillgen before pull and isolates skillgen failures", async () => {
    const runSkillgen = vi
      .fn()
      .mockRejectedValueOnce(new Error("llm"))
      .mockResolvedValueOnce(undefined);
    pullMock.mockResolvedValue({ ok: true, skipped: false, skills: [] });
    await tickProjectComputerHistory({
      listProjectIds: () => ["p1", "p2"],
      pullSkills: pullMock,
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
      runSkillgen,
    });
    expect(runSkillgen).toHaveBeenCalledTimes(2);
    expect(pullMock).toHaveBeenCalledTimes(2);
  });
});
