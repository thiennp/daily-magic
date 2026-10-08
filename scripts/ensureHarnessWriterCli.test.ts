import { EventEmitter } from "node:events";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

const spawnMock = vi.hoisted(() => vi.fn());

vi.mock("node:child_process", () => ({
  spawn: spawnMock,
}));

vi.mock("node:fs", () => ({
  default: {
    existsSync: vi.fn(() => true),
  },
}));

import { ensureHarnessWriterCli } from "./ensureHarnessWriterCli";

describe("ensureHarnessWriterCli", () => {
  beforeEach(() => {
    spawnMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("kills the detached process group on timeout", async () => {
    vi.useFakeTimers();
    const killSpy = vi.spyOn(process, "kill").mockImplementation(() => true);

    const child = new EventEmitter() as EventEmitter & {
      pid: number;
      stdout: EventEmitter;
      stderr: EventEmitter;
      kill: ReturnType<typeof vi.fn>;
    };
    child.pid = 4242;
    const stream = Object.assign(new EventEmitter(), {
      resume: vi.fn(),
    });
    child.stdout = stream;
    child.stderr = stream;
    child.kill = vi.fn();

    spawnMock.mockReturnValue(child);

    const promise = ensureHarnessWriterCli("/tmp/install", "claude-cli");
    const assertion = expect(promise).rejects.toThrow(
      /ensure-writer\.sh timed out/,
    );
    await vi.advanceTimersByTimeAsync(120_000);
    await assertion;
    expect(killSpy).toHaveBeenCalledWith(-4242, "SIGTERM");

    killSpy.mockRestore();
  });

  it("fails fast instead of waiting on an interactive Codex login (5ca01f06)", async () => {
    const killSpy = vi.spyOn(process, "kill").mockImplementation(() => true);
    const child = Object.assign(new EventEmitter(), {
      pid: 4343,
      stdout: Object.assign(new EventEmitter(), { resume: vi.fn() }),
      stderr: new EventEmitter(),
      kill: vi.fn(),
    });
    spawnMock.mockReturnValue(child);

    const promise = ensureHarnessWriterCli("/tmp/install", "codex");
    child.stderr.emit(
      "data",
      "  Codex CLI needs ChatGPT sign-in. Complete browser login if prompted…\n",
    );

    await expect(promise).rejects.toThrow(/Codex isn't signed in/);
    expect(killSpy).toHaveBeenCalledWith(-4343, "SIGTERM");
    killSpy.mockRestore();
  });
});
