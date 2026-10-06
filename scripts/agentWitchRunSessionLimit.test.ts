import { EventEmitter } from "node:events";
import type { ChildProcess } from "node:child_process";

import { resolveAgentRunOutcomeFromWriterOutput } from "@agent-witch/shared/dispatch";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  appendRunSessionLimitNotice,
  armRunSessionLimit,
  clearRunSessionLimit,
  hasArmedRunSessionLimit,
  killChildProcessTree,
  LOCAL_CLI_RUN_SESSION_LIMIT,
} from "./agentWitchRunSessionLimit";
import { LOCAL_CLI_SESSION_LIMIT_EXIT_CODE } from "./localCliRunLimits.constant";

describe("agentWitchRunSessionLimit (S0-6)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("wires AgentRunSessionLimit to the 30-minute constant", () => {
    expect(LOCAL_CLI_RUN_SESSION_LIMIT).toEqual({ limitSeconds: 1800 });
    expect(LOCAL_CLI_SESSION_LIMIT_EXIT_CODE).not.toBe(130);
  });

  it("fires once at the limit, not before", () => {
    const onLimit = vi.fn();
    armRunSessionLimit("run-1", onLimit);
    vi.advanceTimersByTime(1800 * 1000 - 1);
    expect(onLimit).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(onLimit).toHaveBeenCalledTimes(1);
    expect(hasArmedRunSessionLimit("run-1")).toBe(false);
  });

  it("clear and re-arm cancel the earlier timer", () => {
    const first = vi.fn();
    const second = vi.fn();
    armRunSessionLimit("run-2", first, { limitSeconds: 10 });
    armRunSessionLimit("run-2", second, { limitSeconds: 20 });
    vi.advanceTimersByTime(15_000);
    expect(first).not.toHaveBeenCalled();
    clearRunSessionLimit("run-2");
    vi.advanceTimersByTime(60_000);
    expect(second).not.toHaveBeenCalled();
  });

  it("notice is classified as a session limit by the server", () => {
    const output = appendRunSessionLimitNotice("partial work");
    expect(output.startsWith("partial work\n\n")).toBe(true);
    expect(resolveAgentRunOutcomeFromWriterOutput(output)?.code).toBe(
      "session_limit",
    );
  });

  it("kills the process group, then SIGKILL if still alive after the grace", () => {
    const killSpy = vi.spyOn(process, "kill").mockImplementation(() => true);
    const child = Object.assign(new EventEmitter(), {
      pid: 4242,
      exitCode: null,
      signalCode: null,
      kill: vi.fn(),
    }) as unknown as ChildProcess;
    killChildProcessTree(child, 1000);
    if (process.platform !== "win32") {
      expect(killSpy).toHaveBeenCalledWith(-4242, "SIGTERM");
      vi.advanceTimersByTime(1000);
      expect(killSpy).toHaveBeenCalledWith(-4242, "SIGKILL");
    }
    killSpy.mockRestore();
  });

  it("falls back to child.kill when the group signal fails", () => {
    const killSpy = vi.spyOn(process, "kill").mockImplementation(() => {
      throw new Error("ESRCH");
    });
    const kill = vi.fn();
    const child = { pid: 7, exitCode: 0, signalCode: null, kill } as unknown as ChildProcess;
    killChildProcessTree(child, 1000);
    expect(kill).toHaveBeenCalledWith("SIGTERM");
    vi.advanceTimersByTime(1000);
    expect(kill).toHaveBeenCalledTimes(1);
    killSpy.mockRestore();
  });
});
