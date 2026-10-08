import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { buildAgentWitchRunScript } from "./buildAgentWitchRunScript";

describe("buildAgentWitchRunScript", () => {
  it("generates a script without literal emails but with AGENT_WITCH_HOST_ACCOUNT", () => {
    const script = buildAgentWitchRunScript();
    expect(script).not.toContain("a@x.com");
    expect(script).not.toContain("b@x.com");
    expect(script).toContain("AGENT_WITCH_HOST_ACCOUNT");
    expect(script).toContain("AGENT_WITCH_PROFILE");
    expect(script).toContain("set -euo pipefail");
  });

  it("resolves the profile dynamically in bash", () => {
    let bashExists = false;
    try {
      execSync("command -v bash");
      bashExists = true;
    } catch {
      // no bash
    }
    if (!bashExists) return;

    const tmpDir = join(__dirname, ".tmp-buildAgentWitchRunScript");
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });

    try {
      const scriptPath = join(tmpDir, "run.sh");
      writeFileSync(scriptPath, buildAgentWitchRunScript(), { mode: 0o755 });

      // Create a fake node
      const nodeDir = join(tmpDir, ".node", "bin");
      mkdirSync(nodeDir, { recursive: true });
      const fakeNodePath = join(nodeDir, "node");
      writeFileSync(
        fakeNodePath,
        `#!/usr/bin/env bash\necho "\${AGENT_WITCH_PROFILE:-NO_PROFILE}"\n`,
        { mode: 0o755 },
      );

      // Create the app bundle so exec doesn't fail
      const appDir = join(tmpDir, "app");
      mkdirSync(appDir, { recursive: true });
      writeFileSync(join(appDir, "agent-witch.js"), "console.log('hi')", {
        mode: 0o644,
      });

      // Run with b@x.com
      execSync(`"${scriptPath}"`, {
        env: {
          ...process.env,
          AGENT_WITCH_HOME: tmpDir,
          AGENT_WITCH_HOST_ACCOUNT: "b@x.com",
          HOME: tmpDir,
          PATH: process.env.PATH, // needed for command -v bash inside the script or basic tools
        },
        stdio: "ignore",
      });

      const bLogPath = join(
        tmpDir,
        "profiles",
        "b@x.com",
        "logs",
        "agent-witch.log",
      );
      expect(existsSync(bLogPath)).toBe(true);
      const bLogContent = readFileSync(bLogPath, "utf8");
      expect(bLogContent).toContain("b@x.com");

      // Run with a@x.com
      execSync(`"${scriptPath}"`, {
        env: {
          ...process.env,
          AGENT_WITCH_HOME: tmpDir,
          AGENT_WITCH_HOST_ACCOUNT: "a@x.com",
          HOME: tmpDir,
          PATH: process.env.PATH,
        },
        stdio: "ignore",
      });

      const aLogPath = join(
        tmpDir,
        "profiles",
        "a@x.com",
        "logs",
        "agent-witch.log",
      );
      expect(existsSync(aLogPath)).toBe(true);
      const aLogContent = readFileSync(aLogPath, "utf8");
      expect(aLogContent).toContain("a@x.com");
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
