import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  readAgentTerminalRegistry,
  writeAgentTerminalRegistry,
} from "./agentWakeLocalFiles";
import {
  buildPendingReplayLine,
  replayPendingAgentWakes,
} from "./replayPendingAgentWakes";

const pending = (count: number) => ({
  count,
  lastMessageId: "m",
  lastKind: "k",
  at: "t",
});

describe("replayPendingAgentWakes", () => {
  const dir = { install: "" };
  beforeEach(() => {
    dir.install = fs.mkdtempSync(path.join(os.tmpdir(), "aw-replay-"));
  });
  afterEach(() => fs.rmSync(dir.install, { recursive: true, force: true }));

  const replay = (writeInput: (id: string, d: string) => boolean) =>
    replayPendingAgentWakes({
      installDir: dir.install,
      membershipId: "m1",
      shellSessionId: "s1",
      writeInput,
      schedule: (run) => run(),
    });

  it("pluralizes the summary line", () => {
    expect(buildPendingReplayLine(pending(1))).toContain("1 pending update ");
    expect(buildPendingReplayLine(pending(3))).toContain("3 pending updates");
  });

  it("does nothing without pending wakes", () => {
    const write = vi.fn(() => true);
    expect(replay(write)).toBe(0);
    expect(write).not.toHaveBeenCalled();
  });

  it("types one line plus Enter and clears only that seat", () => {
    writeAgentTerminalRegistry(dir.install, {
      terminals: {},
      pending: { m1: pending(2), m2: pending(1) },
    });
    const write = vi.fn(() => true);
    expect(replay(write)).toBe(2);
    expect(write).toHaveBeenCalledTimes(2);
    expect(write).toHaveBeenNthCalledWith(
      1,
      "s1",
      expect.stringContaining("2 pending"),
    );
    expect(write).toHaveBeenNthCalledWith(2, "s1", "\r");
    expect(Object.keys(readAgentTerminalRegistry(dir.install).pending)).toEqual(
      ["m2"],
    );
  });

  it("keeps pending when the terminal cannot be written", () => {
    writeAgentTerminalRegistry(dir.install, {
      terminals: {},
      pending: { m1: pending(1) },
    });
    expect(replay(() => false)).toBe(0);
    expect(readAgentTerminalRegistry(dir.install).pending.m1).toBeDefined();
  });
});
