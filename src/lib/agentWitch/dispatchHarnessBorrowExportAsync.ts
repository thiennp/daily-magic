import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { filterVisibleSetSlugs } from "@/lib/harness/filterBorrowableManifest";
import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export const dispatchHarnessBorrowExportAsync = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly ownerAgent: AgentWitchHubClient;
  readonly borrowerUserId: string;
  readonly ownerUserId: string;
  readonly setSlugs: readonly string[];
  readonly targetDeviceId?: string;
  readonly requestId?: string;
}): Promise<void> => {
  const snapshot = await getHarnessCatalogSnapshot(input.ownerUserId);
  if (snapshot === null) {
    input.runtime.broadcastToDashboardUser(input.borrowerUserId, {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_EXPORT_RESULT,
      payload: {
        success: false,
        ownerUserId: input.ownerUserId,
        errorMessage: "Harness catalog snapshot not found.",
      },
      requestId: input.requestId,
    });
    return;
  }

  const visibleSlugs = await filterVisibleSetSlugs(
    input.setSlugs,
    input.borrowerUserId,
    input.ownerUserId,
  );

  if (visibleSlugs.length === 0) {
    input.runtime.broadcastToDashboardUser(input.borrowerUserId, {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_EXPORT_RESULT,
      payload: {
        success: false,
        ownerUserId: input.ownerUserId,
        errorMessage: "You cannot borrow this harness catalog.",
      },
      requestId: input.requestId,
    });
    return;
  }

  input.ownerAgent.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_EXPORT_REQUEST,
    payload: {
      borrowerUserId: input.borrowerUserId,
      setSlugs: visibleSlugs,
      ...(input.targetDeviceId !== undefined
        ? { targetDeviceId: input.targetDeviceId }
        : {}),
    },
    requestId: input.requestId,
  });
};
