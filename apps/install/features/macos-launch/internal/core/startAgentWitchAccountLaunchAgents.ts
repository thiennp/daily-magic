import { execFile } from "node:child_process";
import os from "node:os";
import { promisify } from "node:util";

import type { AgentWitchHostServicesFile } from "@agent-witch/install-layout/types";
import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "@agent-witch/shared/host-side-effects";

import { writeAgentWitchAccountLaunchAgentPlist } from "./agentWitchAccountLaunchAgent";

export type AgentWitchLaunchctlExec = (
  args: readonly string[],
) => Promise<void>;

export interface AgentWitchAccountServiceStartResult {
  readonly email: string;
  readonly service: string;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

const execFileAsync = promisify(execFile);

const defaultLaunchctl: AgentWitchLaunchctlExec = async (args) => {
  await execFileAsync("launchctl", [...args]);
};

const succeeds = async (run: () => Promise<void>): Promise<boolean> => {
  try {
    await run();
    return true;
  } catch {
    return false;
  }
};

/**
 * Per account: write its plist, bootstrap it when not loaded, then `kickstart`
 * WITHOUT -k so an already running account host is never restarted.
 */
export const startAgentWitchAccountLaunchAgents = async (input: {
  readonly installDir: string;
  readonly services: AgentWitchHostServicesFile;
  readonly homeDir?: string;
  readonly uid?: number;
  readonly launchctl?: AgentWitchLaunchctlExec;
}): Promise<readonly AgentWitchAccountServiceStartResult[]> => {
  const homeDir = input.homeDir ?? os.homedir();
  const uid = input.uid ?? process.getuid?.() ?? 0;
  const domain = `gui/${String(uid)}`;
  const launchctl = input.launchctl ?? defaultLaunchctl;
  const allowed = input.launchctl !== undefined || isHostSideEffectAllowed();

  const results: AgentWitchAccountServiceStartResult[] = [];
  for (const account of input.services.accounts) {
    const service = account.launchAgentLabel;
    if (!allowed) {
      results.push({
        email: account.email,
        service,
        ok: false,
        errorMessage: buildHostSideEffectRefusalMessage("launchctl"),
      });
      continue;
    }
    try {
      const { plistPath } = writeAgentWitchAccountLaunchAgentPlist({
        installDir: input.installDir,
        homeDir,
        account,
      });
      const target = `${domain}/${service}`;
      const loaded = await succeeds(() => launchctl(["print", target]));
      if (!loaded) {
        await launchctl(["bootstrap", domain, plistPath]);
        await succeeds(() => launchctl(["enable", target]));
      }
      await launchctl(["kickstart", target]);
      results.push({ email: account.email, service, ok: true });
    } catch (error) {
      results.push({
        email: account.email,
        service,
        ok: false,
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
};
