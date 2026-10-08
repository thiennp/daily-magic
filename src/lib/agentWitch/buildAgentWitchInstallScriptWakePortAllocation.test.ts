import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { buildAgentWitchInstallScriptWakePortAllocation } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakePortAllocation";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const runAllocation = (
  installDir: string,
): Promise<{ code: number | null; stdout: string; stderr: string }> =>
  new Promise((resolve, reject) => {
    const script = `NODE_BIN="$(command -v node)"\nINSTALL_DIR="${installDir}"\n${buildAgentWitchInstallScriptWakePortAllocation()}\necho "PORT=\${AGENT_WITCH_WAKE_PORT}"\n`;
    const child = spawn("/bin/bash", ["-c", script], {
      env: { ...process.env, HOME: installDir },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (c: Buffer) => {
      stdout += c.toString();
    });
    child.stderr.on("data", (c: Buffer) => {
      stderr += c.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });

describe("buildAgentWitchInstallScriptWakePortAllocation", () => {
  it("rewrites wake-port.json with the same value it exports to AGENT_WITCH_WAKE_PORT", async () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-wake-alloc-"));
    tempDirs.push(installDir);
    fs.writeFileSync(
      path.join(installDir, "wake-port.json"),
      `${JSON.stringify({ wakePort: 49273 }, null, 2)}\n`,
      "utf8",
    );

    const result = await runAllocation(installDir);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("PORT=49273\n");
    expect(
      JSON.parse(
        fs.readFileSync(path.join(installDir, "wake-port.json"), "utf8"),
      ),
    ).toEqual({ wakePort: 49273 });
  });

  it("allocates a new port and writes it when wake-port.json is missing", async () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-wake-alloc-"));
    tempDirs.push(installDir);

    const result = await runAllocation(installDir);
    expect(result.code).toBe(0);
    const match = /PORT=(\d+)/.exec(result.stdout);
    expect(match).not.toBeNull();
    const port = Number(match![1]);
    expect(port).toBeGreaterThan(0);
    expect(
      JSON.parse(
        fs.readFileSync(path.join(installDir, "wake-port.json"), "utf8"),
      ),
    ).toEqual({ wakePort: port });
  });

  it("always exports AGENT_WITCH_WAKE_PORT after allocation", () => {
    expect(buildAgentWitchInstallScriptWakePortAllocation()).toContain(
      "export AGENT_WITCH_WAKE_PORT",
    );
  });
});
