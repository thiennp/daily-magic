import { describe, expect, it, vi } from "vitest";

const heartbeat = vi.hoisted(() => ({
  start: vi.fn(),
  stop: vi.fn(),
}));

vi.mock("./agentWitchRunHeartbeat", () => ({
  startRunHeartbeat: heartbeat.start,
  stopRunHeartbeat: heartbeat.stop,
}));

import { withRunHeartbeatWhilePreparing } from "./withRunHeartbeatWhilePreparing";

describe("withRunHeartbeatWhilePreparing (5ca01f06)", () => {
  it("heartbeats the run while preparing and stops after, even on failure", async () => {
    const socket = {} as never;
    await expect(
      withRunHeartbeatWhilePreparing(socket, "run-1", async () => {
        throw new Error("prepare failed");
      }),
    ).rejects.toThrow("prepare failed");
    expect(heartbeat.start).toHaveBeenCalledWith(
      socket,
      "run-1",
      expect.any(Function),
    );
    const isAlive = heartbeat.start.mock.calls[0]?.[2] as () => boolean;
    expect(isAlive()).toBe(false);
    expect(heartbeat.stop).toHaveBeenCalledWith("run-1");
  });

  it("just runs the work without a run id", async () => {
    heartbeat.start.mockClear();
    await expect(
      withRunHeartbeatWhilePreparing({} as never, undefined, async () => 7),
    ).resolves.toBe(7);
    expect(heartbeat.start).not.toHaveBeenCalled();
  });
});
