import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";

import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { collectAgentWitchLaunchAgentLabels } from "./collectAgentWitchLaunchAgentLabels";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";

export const collectAgentWitchAuxiliaryLaunchAgentLabels = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => {
  const mainLabels = new Set(
    listAgentWitchLaunchTargets(installDir).map(
      (target) => target.launchAgentLabel,
    ),
  );

  return collectAgentWitchLaunchAgentLabels(installDir).filter(
    (label) => !mainLabels.has(label),
  );
};

export const bootoutAgentWitchAuxiliaryLaunchAgents = (
  installDir: string = resolveAgentWitchInstallDir(),
): void => {
  for (const launchAgentLabel of collectAgentWitchAuxiliaryLaunchAgentLabels(
    installDir,
  )) {
    bootoutAgentWitchLaunchAgentSync(launchAgentLabel);
  }
};
