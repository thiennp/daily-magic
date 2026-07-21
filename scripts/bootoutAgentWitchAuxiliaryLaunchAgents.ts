import { bootoutAgentWitchLaunchAgentSync } from "./bootoutAgentWitchLaunchAgent";
import { collectAgentWitchLaunchAgentLabels } from "./agentWitchUninstallLocal";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

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
