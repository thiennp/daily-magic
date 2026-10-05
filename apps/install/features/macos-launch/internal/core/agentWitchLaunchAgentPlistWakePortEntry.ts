import { execFileSync } from "node:child_process";
import fs from "node:fs";

const WAKE_PORT_KEY_PATH = "EnvironmentVariables.AGENT_WITCH_WAKE_PORT";

/** `AGENT_WITCH_WAKE_PORT` from a LaunchAgent plist via `plutil`; null when absent or unreadable. */
export const readAgentWitchLaunchAgentPlistWakePort = (
  plistPath: string,
): string | null => {
  try {
    return execFileSync(
      "plutil",
      ["-extract", WAKE_PORT_KEY_PATH, "raw", "-o", "-", plistPath],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
  } catch {
    return null;
  }
};

/**
 * Rewrites only `AGENT_WITCH_WAKE_PORT` with `plutil -replace` on a sibling temp copy, lints
 * it, then renames it over the plist (atomic). Every other key keeps its value. Never reloads
 * the LaunchAgent: launchd picks the value up on its next bootstrap.
 */
export const writeAgentWitchLaunchAgentPlistWakePort = (
  plistPath: string,
  wakePort: number,
): void => {
  const tempPath = `${plistPath}.${String(process.pid)}.wake-port.tmp`;
  const { mode } = fs.statSync(plistPath);
  try {
    fs.copyFileSync(plistPath, tempPath);
    execFileSync(
      "plutil",
      ["-replace", WAKE_PORT_KEY_PATH, "-string", String(wakePort), tempPath],
      { stdio: "ignore" },
    );
    execFileSync("plutil", ["-lint", "-s", tempPath], { stdio: "ignore" });
    fs.chmodSync(tempPath, mode & 0o7777);
    fs.renameSync(tempPath, plistPath);
  } finally {
    fs.rmSync(tempPath, { force: true });
  }
};
