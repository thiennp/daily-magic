import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_HOST_ACCOUNT_ENV,
  resolveAgentWitchHostAccountFromEnv,
} from "@agent-witch/install-layout";

import { isProcessAlive } from "./isProcessAlive";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const isShellCommand = (command: string): boolean =>
  /(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(command);

/**
 * True when argv looks like node running the bundled AgentWitch app.
 * Rejects shells whose -c script merely mentions the path (AGENT-059).
 */
export const isAgentWitchClientProcessCommand = (
  command: string,
  installDir: string,
): boolean => {
  if (isShellCommand(command)) {
    return false;
  }
  if (!/\bnode\b/.test(command)) {
    return false;
  }

  const normalizedInstallDir = path.resolve(installDir);
  const expectedScript = path.join(
    normalizedInstallDir,
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  );
  const legacyScript = path.join(normalizedInstallDir, "agent-witch.ts");
  const tokens = command.split(/\s+/).filter((token) => token.length > 0);

  return tokens.some((token) => {
    if (
      token === AGENT_WITCH_APP_BUNDLE_FILE_NAME ||
      token === "agent-witch.ts"
    ) {
      return command.includes(normalizedInstallDir);
    }
    try {
      const resolved = path.resolve(token);
      return resolved === expectedScript || resolved === legacyScript;
    } catch {
      return token === expectedScript || token === legacyScript;
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

export interface ReadAgentWitchProcessHostAccountDeps {
  readonly platform?: NodeJS.Platform;
  readonly readFile?: (filePath: string) => string;
  readonly readPsEnv?: (pid: number) => string;
}

const readHostAccountFromEnvPairs = (
  pairs: readonly string[],
): string | null => {
  const prefix = `${AGENT_WITCH_HOST_ACCOUNT_ENV}=`;
  const pair = pairs.find((entry) => entry.startsWith(prefix));
  return pair === undefined
    ? null
    : resolveAgentWitchHostAccountFromEnv({
        [AGENT_WITCH_HOST_ACCOUNT_ENV]: pair.slice(prefix.length),
      });
};

/**
 * AGENT_WITCH_HOST_ACCOUNT of another process: email, null when unset (monolith /
 * launcher), undefined when the environment cannot be read.
 */
export const readAgentWitchProcessHostAccount = (
  pid: number,
  deps: ReadAgentWitchProcessHostAccountDeps = {},
): string | null | undefined => {
  const platform = deps.platform ?? process.platform;
  try {
    if (platform === "linux") {
      const readFile =
        deps.readFile ??
        ((filePath: string) => fs.readFileSync(filePath, "utf8"));
      return readHostAccountFromEnvPairs(
        readFile(`/proc/${String(pid)}/environ`).split("\0"),
      );
    }
    if (platform === "darwin") {
      const readPsEnv =
        deps.readPsEnv ??
        ((target: number) =>
          execFileSync("ps", ["eww", "-o", "command=", "-p", String(target)], {
            encoding: "utf8",
          }));
      return readHostAccountFromEnvPairs(readPsEnv(pid).split(/\s+/));
    }
  } catch {
    return undefined;
  }
  return undefined;
};

/**
 * AWL-ISO-1: an account host replaces only its own account's process; the
 * monolith / launcher never kills an account host. Unreadable env counts as a
 * legacy sibling only while host-services.json is absent.
 */
export const shouldTerminateAgentWitchSibling = (input: {
  readonly selfAccountEmail: string | null;
  readonly siblingAccountEmail: string | null | undefined;
  readonly hostServicesPresent: boolean;
}): boolean => {
  if (input.selfAccountEmail !== null) {
    return input.siblingAccountEmail === input.selfAccountEmail;
  }
  if (input.siblingAccountEmail === undefined) {
    return !input.hostServicesPresent;
  }
  return input.siblingAccountEmail === null;
};

/**
 * Kill other AgentWitch client processes for this install home.
 * One macOS user / install dir should run a single bridge process.
 */
export const terminateOtherAgentWitchClientProcesses = (input: {
  readonly installDir: string;
  readonly selfPid?: number;
  readonly accountEmail?: string | null;
  readonly hostServicesPresent?: boolean;
  readonly readHostAccount?: (pid: number) => string | null | undefined;
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

  const readHostAccount =
    input.readHostAccount ??
    ((pid: number) => readAgentWitchProcessHostAccount(pid));
  const terminated: number[] = [];
  for (const pid of siblingPids) {
    if (!isProcessAlive(pid)) {
      continue;
    }
    if (
      !shouldTerminateAgentWitchSibling({
        selfAccountEmail: input.accountEmail ?? null,
        siblingAccountEmail: readHostAccount(pid),
        hostServicesPresent: input.hostServicesPresent ?? false,
      })
    ) {
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
