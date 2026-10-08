import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

import { retireAgentWitchLegacyHostLauncher } from "../hostServicesMigration/retireAgentWitchLegacyHostLauncher";

import { AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS } from "./superviseAgentWitchAccountHosts";
import {
  startAgentWitchAccountHosts,
  type AgentWitchAccountHostStartResult,
} from "./startAgentWitchAccountHosts";

const describeResults = (
  results: readonly AgentWitchAccountHostStartResult[],
): string =>
  results
    .map((row) =>
      row.ok
        ? `${row.email} (${row.service})`
        : `${row.email} (${row.service} failed: ${row.errorMessage ?? "unknown"})`,
    )
    .join(", ");

/**
 * Launcher scope (host-services.json present, no AGENT_WITCH_HOST_ACCOUNT): start each
 * account's own service, then idle. Never claims a lease, binds a port or opens a socket.
 *
 * dd5c338d / d5e39215: stopping the legacy launcher must NOT stop account hosts. AWL 0.2.6+
 * Start/Stop target the selected account's own LaunchAgent; an accidental bootstrap of
 * `com.agent-witch` (old AWL, login KeepAlive) must not take every account offline.
 * In launchd mode the launcher has nothing left to supervise: it retires the legacy
 * LaunchAgent (no-op plist + bootout) and exits; each account's own LaunchAgent keeps
 * its host alive.
 */
export const runAgentWitchHostLauncher = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly startHosts?: typeof startAgentWitchAccountHosts;
  readonly retireLegacyLauncher?: (installDir: string) => Promise<{
    readonly message: string;
  }>;
  readonly setIntervalFn?: typeof setInterval;
  readonly onSignal?: (
    signal: "SIGINT" | "SIGTERM",
    handler: () => void,
  ) => void;
  readonly exitProcess?: (code: number) => void;
}): Promise<{ readonly stop: () => void }> => {
  const startHosts = input.startHosts ?? startAgentWitchAccountHosts;
  const setIntervalFn = input.setIntervalFn ?? setInterval;
  const lastSpawnAtByEmail = new Map<string, number>();

  const started = await startHosts({
    installDir: input.installDir,
    services: input.services,
    lastSpawnAtByEmail,
  });
  console.log(
    `[agent-witch] Host launcher (${started.mode}): ${String(started.results.length)} account host(s): ${describeResults(started.results)}`,
  );

  const timer = setIntervalFn(() => {
    if (started.mode !== "spawn") {
      return;
    }
    void startHosts({
      installDir: input.installDir,
      services: input.services,
      lastSpawnAtByEmail,
    }).catch((error: unknown) => {
      console.error(
        `[agent-witch] Host launcher supervise failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    });
  }, AGENT_WITCH_ACCOUNT_HOST_RESPAWN_MS);

  const stop = (): void => {
    clearInterval(timer);
  };
  const onSignal =
    input.onSignal ??
    ((signal, handler) => {
      process.on(signal, handler);
    });
  const exitProcess =
    input.exitProcess ?? ((code: number) => process.exit(code));
  const shutdownState = { started: false };
  const shutdown = (): void => {
    if (shutdownState.started) {
      return;
    }
    shutdownState.started = true;
    stop();
    console.log(
      "[agent-witch] Host launcher stopping; leaving account hosts running.",
    );
    exitProcess(0);
  };
  onSignal("SIGINT", shutdown);
  onSignal("SIGTERM", shutdown);

  if (started.mode === "launchd") {
    const retire =
      input.retireLegacyLauncher ??
      ((installDir: string) => retireAgentWitchLegacyHostLauncher({ installDir }));
    try {
      const retired = await retire(input.installDir);
      console.log(`[agent-witch] ${retired.message}`);
    } catch (error) {
      console.error(
        `[agent-witch] Could not retire the legacy launcher: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    // Still alive: not the loaded legacy job (e.g. nohup run.sh). Nothing to supervise.
    shutdown();
  }
  return { stop };
};
