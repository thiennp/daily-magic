import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { syncAgentWitchLaunchAgentPlistWakePort } from "./syncAgentWitchLaunchAgentPlistWakePort";

describe("syncAgentWitchLaunchAgentPlistWakePort", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("updates the client and wake plists together and leaves live alone when missing", () => {
    const homeDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-plist-sync-"));
    tempDirs.push(homeDir);
    const agentsDir = path.join(homeDir, "Library", "LaunchAgents");
    fs.mkdirSync(agentsDir, { recursive: true });

    const build = (port: number): string =>
      `<?xml version="1.0"?>\n<plist><dict>\n` +
      `  <key>AGENT_WITCH_WAKE_PORT</key>\n  <string>${port}</string>\n` +
      `</dict></plist>\n`;

    const client = path.join(agentsDir, "com.agent-witch.plist");
    const wake = path.join(agentsDir, "com.agent-witch-wake.plist");
    fs.writeFileSync(client, build(61774), "utf8");
    fs.writeFileSync(wake, build(61774), "utf8");

    const updated = syncAgentWitchLaunchAgentPlistWakePort({
      launchAgentPrefix: "com.agent-witch",
      wakePort: 49273,
      homeDir,
    });

    expect(updated).toEqual([client, wake]);
    expect(fs.readFileSync(client, "utf8")).toContain("<string>49273</string>");
    expect(fs.readFileSync(wake, "utf8")).toContain("<string>49273</string>");
  });
});
