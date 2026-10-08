import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readAgentTerminalRegistry } from "./agentWakeLocalFiles";
import {
  handleAgentWake,
  registerAgentTerminal,
  unregisterAgentTerminal,
} from "./handleAgentWake";

const payload = {
  projectId: "p1",
  membershipId: "m1",
  messageId: "msg1",
  kind: "task.updated",
  summary: "Task moved",
  task: { taskId: "t1", status: "done", priority: "2" },
};

describe("handleAgentWake", () => {
  const dirs = { install: "", data: "" };
  beforeEach(() => {
    dirs.install = fs.mkdtempSync(path.join(os.tmpdir(), "aw-inst-"));
    dirs.data = fs.mkdtempSync(path.join(os.tmpdir(), "aw-data-"));
  });
  afterEach(() => {
    fs.rmSync(dirs.install, { recursive: true, force: true });
    fs.rmSync(dirs.data, { recursive: true, force: true });
  });
  const run = (
    writeInput: (id: string, data: string) => boolean,
    p = payload,
  ) => {
    const schedule = vi.fn((fn: () => void) => fn());
    const result = handleAgentWake({
      installDir: dirs.install,
      projectDataDir: dirs.data,
      payload: p,
      writeInput,
      schedule,
      now: () => "T",
    });
    return result;
  };

  it("types the line plus Enter into the registered terminal and stores task meta", () => {
    registerAgentTerminal({
      installDir: dirs.install,
      projectId: "p1",
      membershipId: "m1",
      shellSessionId: "s1",
    });
    const write = vi.fn(() => true);
    expect(run(write)).toBe("injected");
    expect(write).toHaveBeenNthCalledWith(
      1,
      "s1",
      "[AgentWitch] task.updated: Task moved — check your AgentWitch inbox",
    );
    expect(write).toHaveBeenNthCalledWith(2, "s1", "\r");
    const tasks = JSON.parse(
      fs.readFileSync(path.join(dirs.data, "p1", "agent-tasks.json"), "utf8"),
    );
    expect(tasks.t1).toEqual({ status: "done", priority: "2", updatedAt: "T" });
  });

  it("records a pending wake when no terminal is registered or alive", () => {
    expect(run(vi.fn(() => true))).toBe("pending");
    registerAgentTerminal({
      installDir: dirs.install,
      projectId: "p1",
      membershipId: "m1",
      shellSessionId: "dead",
    });
    expect(run(vi.fn(() => false))).toBe("pending");
    const registry = readAgentTerminalRegistry(dirs.install);
    expect(registry.pending.m1?.count).toBe(2);
    expect(registry.terminals.m1).toBeUndefined();
  });

  it("rejects malformed payloads and unregisters by shell session", () => {
    expect(run(vi.fn(), { ...payload, projectId: "../x" })).toBe("invalid");
    registerAgentTerminal({
      installDir: dirs.install,
      projectId: "p1",
      membershipId: "m1",
      shellSessionId: "s1",
    });
    unregisterAgentTerminal({ installDir: dirs.install, shellSessionId: "s1" });
    expect(readAgentTerminalRegistry(dirs.install).terminals).toEqual({});
  });
});
