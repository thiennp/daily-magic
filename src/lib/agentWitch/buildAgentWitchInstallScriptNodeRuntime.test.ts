import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_MIN_NODE_MAJOR } from "@/lib/agentWitch/agentWitchNodeRuntime.constant";
import { buildAgentWitchInstallScriptNodeRuntime } from "@/lib/agentWitch/buildAgentWitchInstallScriptNodeRuntime";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const createTempHome = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-node-runtime-"));
  tempDirs.push(dir);
  return dir;
};

/** Node runtime helpers without the trailing auto-run, so tests can stub `uname`. */
const buildNodeRuntimeFunctions = (): string =>
  buildAgentWitchInstallScriptNodeRuntime().replace(
    /\nagent_witch_ensure_node_runtime\n\s*$/,
    "\n",
  );

/**
 * Runs bash detached (new session, no controlling terminal) with stdin closed —
 * the same shape as the Finder-launched Mac app running the installer.
 */
const runWithoutTerminal = (
  script: string,
  env: Record<string, string>,
): Promise<{ code: number | null; stdout: string; stderr: string }> =>
  new Promise((resolve, reject) => {
    const child = spawn("/bin/bash", ["-c", script], {
      env,
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("install node runtime block hung"));
    }, 10_000);
    child.on("error", reject);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });

describe("buildAgentWitchInstallScriptNodeRuntime", () => {
  it("AGENT-065: prompts before Homebrew install when Node is missing or too old", () => {
    const block = buildAgentWitchInstallScriptNodeRuntime();

    expect(block).toContain(`major < ${AGENT_WITCH_MIN_NODE_MAJOR}`);
    expect(block).toContain("agent_witch_read_yes_no");
    expect(block).toContain("Install Node.js now using Homebrew?");
    expect(block).toContain("Upgrade Node.js now using Homebrew?");
    expect(block).toContain("Upgrade declined.");
    expect(block).toContain("Install cancelled.");
    expect(block).toContain("nodejs.org");
  });

  it("probes Homebrew and ~/.local/bin before deciding Node is missing", async () => {
    const home = createTempHome();
    const emptyBin = path.join(home, "empty-bin");
    const localBin = path.join(home, ".local", "bin");
    fs.mkdirSync(emptyBin, { recursive: true });
    fs.mkdirSync(localBin, { recursive: true });
    const stubNode = path.join(localBin, "node");
    fs.writeFileSync(stubNode, "#!/bin/sh\necho 22\n", { mode: 0o755 });

    const result = await runWithoutTerminal(
      `uname() { echo Darwin; }\n${buildNodeRuntimeFunctions()}\nagent_witch_ensure_node_runtime\necho "NODE_BIN=\${NODE_BIN}"\necho "PATH=\${PATH}"\n`,
      { HOME: home, PATH: emptyBin },
    );

    const expectedNode =
      ["/opt/homebrew/bin/node", "/usr/local/bin/node", stubNode].find(
        (candidate) => fs.existsSync(candidate),
      ) ?? stubNode;
    expect(result.code).toBe(0);
    expect(result.stdout).toContain(`NODE_BIN=${expectedNode}\n`);
    expect(result.stdout).toContain(`PATH=${emptyBin}:`);
    expect(result.stdout).toContain(`:${localBin}\n`);
  });

  it("fails with a clear message instead of waiting on a prompt when no terminal is attached", async () => {
    const home = createTempHome();
    const emptyBin = path.join(home, "empty-bin");
    fs.mkdirSync(emptyBin, { recursive: true });

    const result = await runWithoutTerminal(
      `uname() { echo Darwin; }\n${buildNodeRuntimeFunctions()}\nagent_witch_add_node_search_paths() { :; }\nagent_witch_ensure_node_runtime\necho "UNREACHABLE"\n`,
      { HOME: home, PATH: emptyBin },
    );

    expect(result.code).toBe(1);
    expect(result.stdout).not.toContain("UNREACHABLE");
    expect(result.stderr).toContain("/opt/homebrew/bin");
    expect(result.stderr).toContain(
      "Install Node.js now using Homebrew? — skipped: no interactive terminal to answer.",
    );
    expect(result.stderr).toContain("Install cancelled.");
  });
});
