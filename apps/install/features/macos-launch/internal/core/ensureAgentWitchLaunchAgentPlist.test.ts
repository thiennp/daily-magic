import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { ensureAgentWitchLaunchAgentPlist } from "./ensureAgentWitchLaunchAgentPlist";

describe("ensureAgentWitchLaunchAgentPlist", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const tempDir of tempDirs) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    tempDirs.length = 0;
  });

  it("AGENT-067: rewrites a LaunchAgent plist that contains install-script bash", () => {
    const homeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-launchagent-home-"),
    );
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-launchagent-install-"),
    );
    tempDirs.push(homeDir, installDir);
    const plistPath = path.join(
      homeDir,
      "Library",
      "LaunchAgents",
      "com.agent-witch.plist",
    );
    fs.mkdirSync(path.dirname(plistPath), { recursive: true });
    fs.writeFileSync(
      plistPath,
      `<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.agent-witch</string>
if agent_witch_is_truthy_env ""; then
  cat <<'AWI_PROCESS_HOST_ENV'
    <key>AGENT_WITCH_EXTERNAL_BRIDGE</key>
AWI_PROCESS_HOST_ENV
fi
</dict>
</plist>
`,
      "utf8",
    );

    const result = ensureAgentWitchLaunchAgentPlist({
      launchAgentLabel: "com.agent-witch",
      installDir,
      homeDir,
      wakePort: 47892,
    });

    expect(result.ok).toBe(true);
    expect(result.rewritten).toBe(true);
    expect(fs.readFileSync(plistPath, "utf8")).not.toContain(
      "agent_witch_is_truthy_env",
    );
    expect(fs.readFileSync(plistPath, "utf8")).toContain(
      "<string>47892</string>",
    );
  });

  it("AGENT-067: leaves a valid LaunchAgent plist unchanged", () => {
    const homeDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-launchagent-home-"),
    );
    const installDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "agent-witch-launchagent-install-"),
    );
    tempDirs.push(homeDir, installDir);
    const first = ensureAgentWitchLaunchAgentPlist({
      launchAgentLabel: "com.agent-witch",
      installDir,
      homeDir,
      wakePort: 47892,
    });
    const second = ensureAgentWitchLaunchAgentPlist({
      launchAgentLabel: "com.agent-witch",
      installDir,
      homeDir,
      wakePort: 47892,
    });

    expect(first.rewritten).toBe(true);
    expect(second.ok).toBe(true);
    expect(second.rewritten).toBe(false);
  });
});
