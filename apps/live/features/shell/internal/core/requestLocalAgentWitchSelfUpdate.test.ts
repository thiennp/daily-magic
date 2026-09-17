import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AWI_INSTALL_ROOT_FILES } from "@agent-witch/install-layout/types";

import { resolveLocalAgentWitchSelfUpdateUrl } from "./requestLocalAgentWitchSelfUpdate";

describe("requestLocalAgentWitchSelfUpdate", () => {
  const previousHome = process.env.AGENT_WITCH_HOME;
  const tempDirs: string[] = [];

  afterEach(() => {
    if (previousHome === undefined) {
      delete process.env.AGENT_WITCH_HOME;
    } else {
      process.env.AGENT_WITCH_HOME = previousHome;
    }
    for (const tempDir of tempDirs) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDirs.length = 0;
  });

  it("AGENT-067: posts update to the runtime wake port from wake-port.json", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-self-update-url-"),
    );
    tempDirs.push(installDir);
    process.env.AGENT_WITCH_HOME = installDir;
    fs.writeFileSync(
      path.join(installDir, AWI_INSTALL_ROOT_FILES.wakePort),
      `${JSON.stringify({ wakePort: 52647 }, null, 2)}\n`,
      "utf8",
    );

    expect(resolveLocalAgentWitchSelfUpdateUrl()).toBe(
      "http://127.0.0.1:52647/update/run",
    );
  });
});
