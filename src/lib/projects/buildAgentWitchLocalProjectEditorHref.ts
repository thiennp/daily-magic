import { AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME } from "@agent-witch/shared/network";

/** Tabs on the AgentWitch Local project editor that Cloud can deep-link to. */
export type AgentWitchLocalProjectEditorTab = "pitfalls";

/**
 * "Edit on this computer" target. DF-033: the old
 * `http://127.0.0.1:43347/project?id=…` is dead since H6 (per-account port)
 * and retired since H7 (no browser AWL pages). Deep-link the Mac app instead:
 * `agentwitch-local://status` raises the AgentWitch Local window on every H7
 * build (the Mac matcher ignores the query); `project` / `tab` ride along so
 * a future Mac project view can open the right project without a new link.
 */
const buildAgentWitchLocalProjectEditorHref = (
  projectId: string,
  tab?: AgentWitchLocalProjectEditorTab,
): string => {
  const params = new URLSearchParams({ project: projectId.trim() });
  if (tab !== undefined) {
    params.set("tab", tab);
  }
  return `${AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME}://status?${params.toString()}`;
};

export default buildAgentWitchLocalProjectEditorHref;
