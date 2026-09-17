import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import loadAgentRunDispatchCompositionExtras from "@/lib/dispatch/loadAgentRunDispatchCompositionExtras";

const listRunScopedEntriesFromAgentRun = async (
  agentRunId: string,
): Promise<readonly ProjectCompositionSnapshotItemWire[]> => {
  const extras = await loadAgentRunDispatchCompositionExtras(agentRunId);

  if (extras.compositionSnapshot === null) {
    return [];
  }

  return extras.compositionSnapshot.entries.filter(
    (entry) => entry.scope === "run",
  );
};

export default listRunScopedEntriesFromAgentRun;
