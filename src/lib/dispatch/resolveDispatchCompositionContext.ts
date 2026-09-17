import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";

import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import createProjectCompositionSnapshotForDispatch from "@/lib/projects/composition/createProjectCompositionSnapshotForDispatch";
import parseRunScopedComponentIdsFromDispatch from "@/lib/projects/composition/parseRunScopedComponentIdsFromDispatch";

export const resolveDispatchCompositionContext = async (input: {
  readonly requesterUserId: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly projectId: string;
  readonly requestId?: string;
}): Promise<
  | {
      readonly ok: true;
      readonly enrichedPayload: Readonly<Record<string, unknown>>;
      readonly compositionSnapshotId: string | null;
      readonly compositionSnapshot?: ProjectCompositionSnapshotWire;
    }
  | { readonly ok: false; readonly message: AgentWitchMessage }
> => {
  const trimmedProjectId = input.projectId.trim();

  if (trimmedProjectId.length === 0) {
    return {
      ok: true,
      enrichedPayload: input.payload,
      compositionSnapshotId: null,
    };
  }

  const runScopedComponentIds = parseRunScopedComponentIdsFromDispatch(
    input.payload,
  );
  const snapshotResult = await createProjectCompositionSnapshotForDispatch({
    ownerUserId: input.requesterUserId,
    projectId: trimmedProjectId,
    runScopedComponentIds,
  });

  if (!snapshotResult.ok) {
    return {
      ok: false,
      message: buildDispatchError(snapshotResult.errorMessage, input.requestId),
    };
  }

  return {
    ok: true,
    enrichedPayload: {
      ...input.payload,
      compositionSnapshot: snapshotResult.snapshot,
    },
    compositionSnapshotId: snapshotResult.snapshot.id,
    compositionSnapshot: snapshotResult.snapshot,
  };
};
