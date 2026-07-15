import { randomUUID } from "node:crypto";

import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { registerHarnessExportRequest } from "@/lib/harness/harnessExportRequestRegistry";
import type { BorrowedHarnessExportSet } from "@/lib/harness/types/HarnessExportResult.type";

export const requestHarnessExportSetsFromOwner = async (input: {
  readonly ownerAgent: AgentWitchHubClient;
  readonly borrowerUserId: string;
  readonly setSlugs: readonly string[];
}): Promise<readonly BorrowedHarnessExportSet[]> => {
  const requestId = randomUUID();

  const exportPromise = registerHarnessExportRequest(requestId);

  input.ownerAgent.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_EXPORT_REQUEST,
    payload: {
      borrowerUserId: input.borrowerUserId,
      setSlugs: input.setSlugs,
    },
    requestId,
  });

  return exportPromise;
};
