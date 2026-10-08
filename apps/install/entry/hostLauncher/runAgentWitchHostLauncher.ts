import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";

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
 * account's own service, then idle. Never claims a lease, binds a port or opens a socket,
 * so old AWL Mac apps that kickstart the legacy `com.agent-witch` label keep working.
 * Without a service manager it re-checks the account hosts every minute.
 */
export const runAgentWitchHostLauncher = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly startHosts?: typeof startAgentWitchAccountHosts;
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
  const shutdown = (): void => {
    stop();
    console.log("[agent-witch] Host launcher shutting down.");
    exitProcess(0);
  };
  onSignal("SIGINT", shutdown);
  onSignal("SIGTERM", shutdown);
  return { stop };
};
