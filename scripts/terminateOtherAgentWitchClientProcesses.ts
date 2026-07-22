import { execFileSync } from "node:child_process";
import path from "node:path";

import { isProcessAlive } from "./isProcessAlive";

const isShellCommand = (command: string): boolean =>
  /(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(command);

/**
 * True when argv looks like node/tsx running agent-witch.ts for this install.
 * Rejects shells whose -c script merely mentions the path (AGENT-059).
 */
export const isAgentWitchClientProcessCommand = (
  command: string,
  installDir: string,
): boolean => {
  if (isShellCommand(command)) {
    return false;
  }
  if (!/\b(node|tsx)\b/.test(command)) {
    return false;
  }

  const normalizedInstallDir = path.resolve(installDir);
  const expectedScript = path.join(normalizedInstallDir, "agent-witch.ts");
  const tokens = command.split(/\s+/).filter((token) => token.length > 0);

  return tokens.some((token) => {
    if (token === "agent-witch.ts") {
      // Relative argv only counts when cwd is the install (command also has installDir).
      return command.includes(normalizedInstallDir);
    }
    try {
      return path.resolve(token) === expectedScript;
    } catch {
      return token === expectedScript;
    }
  });
};

const listAncestorPids = (pid: number): ReadonlySet<number> => {
  const ancestors = new Set<number>();
  let current = pid;

  for (let depth = 0; depth < 32; depth += 1) {
    let ppidOutput = "";
    try {
      ppidOutput = execFileSync("ps", ["-o", "ppid=", "-p", String(current)], {
        encoding: "utf8",
      }).trim();
    } catch {
      break;
    }
    const ppid = Number.parseInt(ppidOutput, 10);
    if (!Number.isInteger(ppid) || ppid <= 1 || ancestors.has(ppid)) {
      break;
    }
    ancestors.add(ppid);
    current = ppid;
  }

  return ancestors;
};

const parseAgentWitchClientPids = (
  psOutput: string,
  installDir: string,
  selfPid: number,
): readonly number[] => {
  const ancestors = listAncestorPids(selfPid);
  const pids: number[] = [];

  for (const line of psOutput.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    const match = /^(\d+)\s+(.+)$/.exec(trimmed);
    if (match === null) {
      continue;
    }
    const pid = Number.parseInt(match[1] ?? "", 10);
    const command = match[2] ?? "";
    if (!Number.isInteger(pid) || pid <= 0 || pid === selfPid) {
      continue;
    }
    if (ancestors.has(pid)) {
      continue;
    }
    if (!isAgentWitchClientProcessCommand(command, installDir)) {
      continue;
    }
    pids.push(pid);
  }

  return pids;
};

/**
 * Kill other agent-witch.ts processes for this install home.
 * One macOS user / install dir should run a single bridge process.
 */
export const terminateOtherAgentWitchClientProcesses = (input: {
  readonly installDir: string;
  readonly selfPid?: number;
}): readonly number[] => {
  const selfPid = input.selfPid ?? process.pid;
  let psOutput = "";
  try {
    psOutput = execFileSync("ps", ["-axo", "pid=,command="], {
      encoding: "utf8",
    });
  } catch {
    return [];
  }

  const siblingPids = parseAgentWitchClientPids(
    psOutput,
    input.installDir,
    selfPid,
  );

  const terminated: number[] = [];
  for (const pid of siblingPids) {
    if (!isProcessAlive(pid)) {
      continue;
    }
    try {
      process.kill(pid, "SIGTERM");
      terminated.push(pid);
    } catch {
      // already gone
    }
  }

  return terminated;
};

export const __testOnlyParseAgentWitchClientPids = parseAgentWitchClientPids;
