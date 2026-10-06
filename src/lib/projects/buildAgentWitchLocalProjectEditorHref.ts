import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

const buildAgentWitchLocalProjectEditorHref = (projectId: string): string => {
  const id = projectId.trim();
  const params = new URLSearchParams({ id });
  return `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}/project?${params.toString()}`;
};

export default buildAgentWitchLocalProjectEditorHref;
