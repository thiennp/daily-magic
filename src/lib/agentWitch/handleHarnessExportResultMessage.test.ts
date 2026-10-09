import { beforeEach, describe, expect, it, vi } from "vitest";

const applyMock = vi.hoisted(() => vi.fn(async () => undefined));
vi.mock("@/lib/harness/applyHarnessExportSetsToDevice", () => ({
  applyHarnessExportSetsToDevice: applyMock,
}));

import { handleHarnessExportResultMessage } from "@/lib/agentWitch/handleHarnessExportResultMessage";
import { registerHarnessExportRequest } from "@/lib/harness/harnessExportRequestRegistry";

const runtime = { broadcastToDashboardUser: vi.fn() } as never;
const agent = (userId: string) => ({ role: "agent", userId }) as never;
const result = (requestId: string, borrowerUserId: string) =>
  ({
    type: "harness.export.result",
    requestId,
    payload: {
      success: true,
      borrowerUserId,
      targetDeviceId: "dev-1",
      sets: [],
    },
  }) as never;

describe("handleHarnessExportResultMessage", () => {
  beforeEach(() => applyMock.mockClear());

  it("ignores a result for a request that is not pending", async () => {
    const reply = await handleHarnessExportResultMessage(
      runtime,
      result("forged", "victim"),
      agent("attacker"),
    );
    expect(reply).toMatchObject({ type: "system.error" });
    expect(applyMock).not.toHaveBeenCalled();
  });

  it("accepts only the lender's agent and uses the borrower recorded at request time", async () => {
    const pending = registerHarnessExportRequest("req-1", {
      lenderUserId: "lender",
      borrowerUserId: "borrower",
    });
    const forged = await handleHarnessExportResultMessage(
      runtime,
      result("req-1", "victim"),
      agent("attacker"),
    );
    expect(forged).toMatchObject({ type: "system.error" });
    expect(applyMock).not.toHaveBeenCalled();

    await handleHarnessExportResultMessage(
      runtime,
      result("req-1", "victim"),
      agent("lender"),
    );
    await pending;
    expect(applyMock).toHaveBeenCalledWith(
      runtime,
      "borrower",
      "dev-1",
      expect.anything(),
    );
  });
});
