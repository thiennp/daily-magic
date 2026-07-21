import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

export const renderUpdateAgentWitchScript = (origin: string): string =>
  renderInstallAgentWitchScript(origin, { updateExistingInstall: true });
