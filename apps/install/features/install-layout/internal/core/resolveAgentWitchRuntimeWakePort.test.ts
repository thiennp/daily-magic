import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AWI_INSTALL_ROOT_FILES } from "../../public-api/types";

import {
  readAgentWitchWakePortFromFile,
  resolveAgentWitchRuntimeWakePort,
} from "./resolveAgentWitchRuntimeWakePort";

describe("resolveAgentWitchRuntimeWakePort", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const tempDir of tempDirs) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDirs.length = 0;
  });

  it("AGENT-067: prefers wake-port.json over the install-root default", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-runtime-wake-"),
    );
    tempDirs.push(installDir);
    fs.writeFileSync(
      path.join(installDir, AWI_INSTALL_ROOT_FILES.wakePort),
      `${JSON.stringify({ wakePort: 51841 }, null, 2)}\n`,
      "utf8",
    );

    expect(readAgentWitchWakePortFromFile(installDir)).toBe(51841);
    expect(resolveAgentWitchRuntimeWakePort(installDir)).toBe(51841);
  });
});
