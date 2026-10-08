import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";

import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";
import {
  listenAgentTerminalSocket,
  parseAgentRunArgs,
  registerAgentTerminal,
  replayPendingAgentWakes,
  unregisterAgentTerminal,
} from "@agent-witch/install-runtime-client";

import {
  resizeShellPty,
  spawnAgentCommandInPty,
  writeShellPtyInput,
} from "./legacyScriptDeps";

const REPLAY_DELAY_MS = 3000;

const log = (message: string): void => {
  process.stderr.write(`[agent-witch] ${message}\n`);
};

const runWithoutPty = (command: string, args: readonly string[]): void => {
  log("No PTY available: running without wake support (inbox only).");
  const child = spawn(command, [...args], { stdio: "inherit" });
  child.on("exit", (code) => process.exit(code ?? 0));
};

/**
 * `agent-witch agent run --project P --seat M -- <cli> [args]`: run a CLI agent
 * inside a PTY owned by AgentWitch, bound to a seat, so `agent.wake` can type
 * into it. Output and stdin are passed through to the current terminal.
 */
export const runAgentWitchAgentRunCli = async (
  argv: readonly string[],
): Promise<void> => {
  const parsed = parseAgentRunArgs(argv);
  if (typeof parsed === "string") {
    log(parsed);
    process.exit(2);
  }
  const { installDir } = resolveAgentWitchLocalLayout();
  const requestedId = `agent-${randomBytes(4).toString("hex")}`;
  const spawned = await spawnAgentCommandInPty({
    shellSessionId: requestedId,
    runId: requestedId,
    command: parsed.command,
    args: parsed.args,
    cwd: process.cwd(),
    send: () => undefined,
    onData: (chunk) => process.stdout.write(chunk),
    onExit: (code) => {
      socket.close();
      unregisterAgentTerminal({ installDir, shellSessionId: requestedId });
      process.exit(code);
    },
  });
  if (!spawned.usedPty) {
    runWithoutPty(parsed.command, parsed.args);
    return;
  }
  const socket = listenAgentTerminalSocket(installDir, requestedId, (data) => {
    writeShellPtyInput(requestedId, data);
  });
  registerAgentTerminal({
    installDir,
    projectId: parsed.projectId,
    membershipId: parsed.membershipId,
    shellSessionId: requestedId,
  });
  log(`Bound ${parsed.command} to seat ${parsed.membershipId}.`);

  const fit = (): void => {
    resizeShellPty(
      requestedId,
      process.stdout.columns || 120,
      process.stdout.rows || 32,
    );
  };
  fit();
  process.stdout.on("resize", fit);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.on("data", (chunk) => {
    writeShellPtyInput(requestedId, chunk.toString("utf8"));
  });
  const shutdown = (): void => {
    socket.close();
    unregisterAgentTerminal({ installDir, shellSessionId: requestedId });
  };
  process.on("exit", shutdown);
  process.on("SIGTERM", () => process.exit(143));
  setTimeout(() => {
    replayPendingAgentWakes({
      installDir,
      membershipId: parsed.membershipId,
      shellSessionId: requestedId,
      writeInput: writeShellPtyInput,
      schedule: (run, delayMs) => {
        setTimeout(run, delayMs);
      },
    });
  }, REPLAY_DELAY_MS);
};
