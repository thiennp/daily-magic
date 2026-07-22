import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  AGENT_WITCH_WAKE_PORT_FILE_NAME,
  readAgentWitchWakePortFromFile,
  writeAgentWitchWakePortFile,
} from "./agentWitchWakePortFile";

describe("agentWitchWakePortFile", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const tempDir of tempDirs) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDirs.length = 0;
  });

  it("reads and writes wake-port.json", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-wake-port-"),
    );
    tempDirs.push(installDir);

    expect(readAgentWitchWakePortFromFile(installDir)).toBeNull();

    writeAgentWitchWakePortFile(installDir, 51234);
    expect(
      fs.existsSync(path.join(installDir, AGENT_WITCH_WAKE_PORT_FILE_NAME)),
    ).toBe(true);
    expect(readAgentWitchWakePortFromFile(installDir)).toBe(51234);
  });
});
