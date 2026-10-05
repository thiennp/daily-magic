import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

/** Tabs on the Agent Witch Local project editor that Cloud can deep-link to. */
export type AgentWitchLocalProjectEditorTab = "pitfalls";

const buildAgentWitchLocalProjectEditorHref = (
  projectId: string,
  tab?: AgentWitchLocalProjectEditorTab,
): string => {
  const id = projectId.trim();
  const params = new URLSearchParams({ id });
  if (tab !== undefined) {
    params.set("tab", tab);
  }
  return `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}/project?${params.toString()}`;
};

export default buildAgentWitchLocalProjectEditorHref;
