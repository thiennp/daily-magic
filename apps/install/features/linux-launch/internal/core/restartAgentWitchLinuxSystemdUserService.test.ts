import { EventEmitter } from "node:events";
import { describe, expect, it, vi, beforeEach } from "vitest";

const spawnMock = vi.hoisted(() => vi.fn());

vi.mock("node:child_process", () => ({
  spawn: spawnMock,
}));

import { restartAgentWitchLinuxSystemdUserService } from "./restartAgentWitchLinuxSystemdUserService";

describe("restartAgentWitchLinuxSystemdUserService", () => {
  beforeEach(() => {
    spawnMock.mockReset();
  });

  it("no-ops on non-Linux platforms", async () => {
    const platformSpy = vi
      .spyOn(process, "platform", "get")
      .mockReturnValue("darwin");

    await restartAgentWitchLinuxSystemdUserService();

    expect(spawnMock).not.toHaveBeenCalled();
    platformSpy.mockRestore();
  });

  it("restarts the systemd user unit on Linux", async () => {
    const platformSpy = vi
      .spyOn(process, "platform", "get")
      .mockReturnValue("linux");

    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter;
      stderr: EventEmitter;
    };
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    spawnMock.mockReturnValue(child);

    const promise = restartAgentWitchLinuxSystemdUserService();
    child.emit("close", 0);
    await promise;

    expect(spawnMock).toHaveBeenCalledWith(
      "systemctl",
      ["--user", "restart", "agent-witch.service"],
      { stdio: "ignore" },
    );
    platformSpy.mockRestore();
  });
});
