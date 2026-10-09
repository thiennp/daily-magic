import { beforeEach, describe, expect, it, vi } from "vitest";

const ownedMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/agentWitch/isAgentWitchDeviceOrSuccessorOwnedByUser", () => ({
  isAgentWitchDeviceOrSuccessorOwnedByUser: ownedMock,
}));

import { validateWriterRunDeviceSelection } from "@/lib/dispatch/validateWriterRunDeviceSelection";

const check = (executorUserId: string) =>
  validateWriterRunDeviceSelection({
    runtime: {} as never,
    senderUserId: "me",
    executorUserId,
    targetDeviceId: "dev-1",
  });

describe("validateWriterRunDeviceSelection", () => {
  beforeEach(() => ownedMock.mockReset());

  it("checks the device against whoever will run the task, colleague included", async () => {
    ownedMock.mockResolvedValue(false);
    expect(await check("colleague")).toMatchObject({ ok: false });
    expect(ownedMock).toHaveBeenCalledWith("dev-1", "colleague");
    ownedMock.mockResolvedValue(true);
    expect(await check("colleague")).toBeUndefined();
  });

  it("still refuses someone else's computer for your own task", async () => {
    ownedMock.mockResolvedValue(false);
    expect(await check("me")).toMatchObject({ ok: false });
  });
});
