import {
  readAgentWitchHostServices,
  resolveAgentWitchHostAccountFromEnv,
  resolveAgentWitchInstallDir,
} from "@agent-witch/install-layout";

import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { collectAgentWitchLaunchAgentLabels } from "./collectAgentWitchLaunchAgentLabels";

/**
 * Labels this process may bootout when the macOS console user goes away.
 * Per-account hosts (host-services.json): never another account's LaunchAgent —
 * each account host has its own guard and stops itself (dd5c338d).
 */
export const filterAgentWitchLaunchAgentLabelsForProcess = (input: {
  readonly labels: readonly string[];
  readonly accountLabels: readonly string[] | null;
  readonly ownAccountLabel: string | null;
}): readonly string[] => {
  if (input.accountLabels === null) {
    return input.labels;
  }
  const others = new Set(
    input.accountLabels.filter((label) => label !== input.ownAccountLabel),
  );
  return input.labels.filter((label) => !others.has(label));
};

export const bootoutAgentWitchLaunchAgentsForCurrentUser = (
  installDir: string = resolveAgentWitchInstallDir(),
): void => {
  const services = readAgentWitchHostServices(installDir);
  const ownEmail = resolveAgentWitchHostAccountFromEnv();
  const ownAccountLabel =
    services?.accounts.find((account) => account.email === ownEmail)
      ?.launchAgentLabel ?? null;
  for (const launchAgentLabel of filterAgentWitchLaunchAgentLabelsForProcess({
    labels: collectAgentWitchLaunchAgentLabels(installDir),
    accountLabels:
      services === null
        ? null
        : services.accounts.map((account) => account.launchAgentLabel),
    ownAccountLabel,
  })) {
    bootoutAgentWitchLaunchAgentSync(launchAgentLabel);
  }
};
