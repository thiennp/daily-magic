import { execFile } from "node:child_process";
import os from "node:os";
import { promisify } from "node:util";

import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";
import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "@agent-witch/shared/host-side-effects";

import { writeAgentWitchAccountSystemdUnit } from "./agentWitchAccountSystemdUnit";

export type AgentWitchSystemctlExec = (
  args: readonly string[],
) => Promise<void>;

export interface AgentWitchAccountUnitStartResult {
  readonly email: string;
  readonly service: string;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

const execFileAsync = promisify(execFile);

const defaultSystemctl: AgentWitchSystemctlExec = async (args) => {
  await execFileAsync("systemctl", ["--user", ...args]);
};

const toMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

/** Writes every account unit, daemon-reload once when one changed, then `enable` + `start` (never restart). */
export const startAgentWitchAccountSystemdUnits = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly homeDir?: string;
  readonly systemctl?: AgentWitchSystemctlExec;
}): Promise<readonly AgentWitchAccountUnitStartResult[]> => {
  const homeDir = input.homeDir ?? os.homedir();
  const systemctl = input.systemctl ?? defaultSystemctl;
  if (input.systemctl === undefined && !isHostSideEffectAllowed()) {
    return input.services.accounts.map((account) => ({
      email: account.email,
      service: account.systemdUnitName,
      ok: false,
      errorMessage: buildHostSideEffectRefusalMessage("systemctl"),
    }));
  }

  const written = input.services.accounts.map((account) => {
    try {
      const unit = writeAgentWitchAccountSystemdUnit({
        installDir: input.installDir,
        homeDir,
        account,
      });
      return { account, changed: unit.changed, errorMessage: null };
    } catch (error) {
      return { account, changed: false, errorMessage: toMessage(error) };
    }
  });
  if (written.some((row) => row.changed)) {
    await systemctl(["daemon-reload"]).catch(() => undefined);
  }

  const results: AgentWitchAccountUnitStartResult[] = [];
  for (const row of written) {
    const service = row.account.systemdUnitName;
    if (row.errorMessage !== null) {
      results.push({
        email: row.account.email,
        service,
        ok: false,
        errorMessage: row.errorMessage,
      });
      continue;
    }
    try {
      await systemctl(["enable", service]);
      await systemctl(["start", service]);
      results.push({ email: row.account.email, service, ok: true });
    } catch (error) {
      results.push({
        email: row.account.email,
        service,
        ok: false,
        errorMessage: toMessage(error),
      });
    }
  }
  return results;
};
