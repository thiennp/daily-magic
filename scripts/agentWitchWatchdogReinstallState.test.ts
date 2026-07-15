import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  canRunAgentWitchWatchdogReinstall,
  recordAgentWitchWatchdogReinstallAttempt,
} from "./agentWitchWatchdogReinstallState";

describe("agentWitchWatchdogReinstallState", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows reinstall when no prior attempt was recorded", () => {
    expect(canRunAgentWitchWatchdogReinstall("/tmp/agent-witch-missing")).toBe(
      true,
    );
  });

  it("blocks reinstall attempts inside the cooldown window", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-15T10:00:00.000Z"));

    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-reinstall-state-"),
    );
    recordAgentWitchWatchdogReinstallAttempt(installDir);

    expect(canRunAgentWitchWatchdogReinstall(installDir)).toBe(false);

    vi.setSystemTime(new Date("2026-07-15T10:16:00.000Z"));
    expect(canRunAgentWitchWatchdogReinstall(installDir)).toBe(true);

    fs.rmSync(installDir, { recursive: true, force: true });
  });
});
