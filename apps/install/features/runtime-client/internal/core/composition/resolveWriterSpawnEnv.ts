import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { isSafeRunId } from "./safeRunPaths";
import { resolveRunCompositionOverlayCursorDir } from "./materializeRunScopedCompositionOverlay";

const resolveWriterSpawnEnv = (
  layout: AgentWitchLocalLayout,
  agentRunId: string | undefined,
  hasRunScopedOverlay: boolean,
): NodeJS.ProcessEnv => {
  if (
    agentRunId === undefined ||
    !hasRunScopedOverlay ||
    !isSafeRunId(agentRunId)
  ) {
    return process.env;
  }

  const overlayCursorDir = resolveRunCompositionOverlayCursorDir(
    layout,
    agentRunId,
  );

  return {
    ...process.env,
    AGENT_WITCH_CURSOR_OVERLAY_DIR: overlayCursorDir,
  };
};

export default resolveWriterSpawnEnv;
