import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  appendAgentWitchWatchdogLog,
  readAgentWitchWatchdogLogs,
  resolveAgentWitchWatchdogLogPath,
} from "./agentWitchWatchdogLog";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("agentWitchWatchdogLog", () => {
  it("appends and reads recent watchdog log entries", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "aw-watchdog-log-"),
    );
    tempDirs.push(installDir);

    appendAgentWitchWatchdogLog(
      {
        event: "check_complete",
        ok: true,
        message: "All Agent Witch WebSocket connections are healthy.",
        targets: [],
      },
      installDir,
    );

    appendAgentWitchWatchdogLog(
      {
        event: "revive_triggered",
        ok: true,
        message: "Revived com.agent-witch",
        targets: [
          {
            launchAgentLabel: "com.agent-witch",
            profileEmail: null,
            revived: true,
            reason: "stale_connection",
          },
        ],
      },
      installDir,
    );

    const logs = readAgentWitchWatchdogLogs(10, installDir);
    expect(logs).toHaveLength(2);
    expect(logs[1]).toMatchObject({
      event: "revive_triggered",
      message: "Revived com.agent-witch",
    });
    expect(resolveAgentWitchWatchdogLogPath(installDir)).toContain(
      "watchdog-log.ndjson",
    );
  });
});
