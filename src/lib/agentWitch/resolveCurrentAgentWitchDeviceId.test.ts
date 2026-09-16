import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveCurrentAgentWitchDeviceId } from "@/lib/agentWitch/resolveCurrentAgentWitchDeviceId";

const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: <T>(value: T): T => value,
}));

describe("resolveCurrentAgentWitchDeviceId", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("returns the successor at the end of the supersession chain", async () => {
    sqlMock.mockResolvedValue([{ id: "device-new" }]);

    await expect(resolveCurrentAgentWitchDeviceId("device-old")).resolves.toBe(
      "device-new",
    );
  });

  it("returns the input id when nothing supersedes it", async () => {
    sqlMock.mockResolvedValue([{ id: "device-old" }]);

    await expect(resolveCurrentAgentWitchDeviceId("device-old")).resolves.toBe(
      "device-old",
    );
  });

  it("returns the input id when the row is unknown", async () => {
    sqlMock.mockResolvedValue([]);

    await expect(
      resolveCurrentAgentWitchDeviceId("device-missing"),
    ).resolves.toBe("device-missing");
  });
});
