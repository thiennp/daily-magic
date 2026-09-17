import type { AgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { fetchAgentWitchProjectsForLocalApp } from "./fetchAgentWitchProjectsForLocalApp";

export interface SyncAgentWitchLocalProjectsResult {
  readonly ok: boolean;
  readonly syncedCount: number;
  readonly message: string;
}

/** @deprecated Layout unused — project metadata lives in AWC DB only. */
export const syncAgentWitchLocalProjectsFromCloud = async (
  _layout: AgentWitchLocalLayout,
  runConfig: AgentWitchRunConfig,
): Promise<SyncAgentWitchLocalProjectsResult> => {
  const result = await fetchAgentWitchProjectsForLocalApp(runConfig);

  return {
    ok: result.ok,
    syncedCount: result.projects.length,
    message: result.message,
  };
};
