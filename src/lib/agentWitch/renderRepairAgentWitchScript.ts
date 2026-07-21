import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

export const renderRepairAgentWitchScript = (origin: string): string =>
  renderInstallAgentWitchScript(origin, { repairExistingInstall: true });
