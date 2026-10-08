import { spawn } from "node:child_process";

import type { WriterCliCommands } from "./buildWriterCliInvocation";

export type ProbedWriter = {
  readonly writerAgent: string;
  readonly ready: boolean;
  /** null = unknown: only Codex has a login-status command we can trust. */
  readonly loggedIn: boolean | null;
};

const PROBE_TIMEOUT_MS = 3000;
const CACHE_TTL_MS = 5 * 60 * 1000;

const state: {
  cache: { at: number; writers: readonly ProbedWriter[] } | null;
} = { cache: null };

const canRun = (
  bin: string,
  args: readonly string[] = ["--version"],
): Promise<boolean> =>
  new Promise((resolve) => {
    const child = spawn(bin, [...args], { stdio: "ignore" });
    const timer = setTimeout(() => {
      child.kill();
      resolve(false);
    }, PROBE_TIMEOUT_MS);
    child.on("error", () => {
      clearTimeout(timer);
      resolve(false);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve(code === 0);
    });
  });

/**
 * Which coding tools run on this computer. Cached for 5 minutes so the
 * 30-second heartbeat does not spawn four processes every time.
 */
export const probeAgentWitchWriters = async (
  commands: WriterCliCommands,
  nowMs: number = Date.now(),
): Promise<readonly ProbedWriter[]> => {
  if (state.cache !== null && nowMs - state.cache.at < CACHE_TTL_MS) {
    return state.cache.writers;
  }
  const entries: readonly (readonly [string, string])[] = [
    ["claude-cli", commands.claudeCommand],
    ["codex", commands.codexCommand],
    ["cursor", commands.cursorCommand],
    ["antigravity", commands.antigravityCommand],
  ];
  const writers = await Promise.all(
    entries.map(async ([writerAgent, bin]) => {
      const ready = await canRun(bin);
      const loggedIn =
        ready && writerAgent === "codex"
          ? await canRun(bin, ["login", "status"])
          : null;
      return { writerAgent, ready, loggedIn };
    }),
  );
  state.cache = { at: nowMs, writers };
  return writers;
};
