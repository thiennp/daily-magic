import { beforeEach, describe, expect, it, vi } from "vitest";

const writeMock = vi.fn();
const stateMock = vi.fn();
const ackMock = vi.fn();

vi.mock("./writeProjectHistoryMessage", () => ({
  writeProjectHistoryMessage: (...args: unknown[]) => writeMock(...args),
}));
vi.mock("./localProjectHistoryState", () => ({
  writeLocalProjectHistoryState: (...args: unknown[]) => stateMock(...args),
}));
vi.mock("./postProjectMessageComputerAck", () => ({
  postProjectMessageComputerAck: (...args: unknown[]) => ackMock(...args),
}));
vi.mock("@agent-witch/install-runtime-client", () => ({
  readAgentWitchRunConfig: () => null,
}));
vi.mock("../../../projects/internal/core/agentWitchCloudApi", () => ({
  resolveAgentWitchCloudApiConfig: () => null,
}));

import { handleProjectMessageHistoryDispatch } from "./handleProjectMessageHistoryDispatch";

describe("handleProjectMessageHistoryDispatch", () => {
  beforeEach(() => {
    writeMock.mockReset();
    stateMock.mockReset();
    ackMock.mockReset();
  });

  it("sends no ack when the durable write fails", async () => {
    writeMock.mockImplementation(() => {
      throw new Error("disk full");
    });
    const result = await handleProjectMessageHistoryDispatch({
      payload: {
        projectId: "p1",
        message: { messageId: "m1", summary: "x" },
      },
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
    });
    expect(result).toEqual({ ok: false, reason: "write_failed" });
    expect(ackMock).not.toHaveBeenCalled();
    expect(stateMock).toHaveBeenCalledWith({
      projectId: "p1",
      state: "degraded",
    });
  });

  it("acks only after a successful write", async () => {
    writeMock.mockReturnValue({
      messageId: "m1",
      projectId: "p1",
      message: {},
      savedAt: "t",
    });
    ackMock.mockResolvedValue({ ok: true, status: 200 });
    const result = await handleProjectMessageHistoryDispatch({
      payload: {
        projectId: "p1",
        message: { messageId: "m1", summary: "x" },
      },
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
    });
    expect(result).toEqual({ ok: true, messageId: "m1", acked: true });
    expect(ackMock).toHaveBeenCalledTimes(1);
  });
});
