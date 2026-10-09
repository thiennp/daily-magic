import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import {
  resolveAgentWitchCloudApiConfig,
  syncProjectKnowledgeCandidateToCloud,
} from "@agent-witch/live-projects";

import type { UpdateProjectKnowledgeWakeResponse } from "../public-api/types";
import { parseUpdateProjectKnowledgeWakeBody } from "./parseUpdateProjectKnowledgeWakeBody";

/** POST /knowledge/update — loopback path for local agents (global rules, no AWC session). */
export const updateProjectKnowledgeFromWakeServer = async (
  body: unknown,
): Promise<UpdateProjectKnowledgeWakeResponse> => {
  const parsed = parseUpdateProjectKnowledgeWakeBody(body);
  if (parsed === null) {
    return {
      ok: false,
      errorMessage: "Send projectId and a non-empty lesson string.",
    };
  }

  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return {
      ok: false,
      httpStatus: 409,
      errorMessage: "Connect this computer to AgentWitch first.",
    };
  }

  const cloudConfig = resolveAgentWitchCloudApiConfig({
    wsUrl: runConfig.wsUrl,
    pairingToken: runConfig.pairingToken,
  });
  if (cloudConfig === null) {
    return {
      ok: false,
      httpStatus: 409,
      errorMessage: "Connect this computer to AgentWitch first.",
    };
  }

  const result = await syncProjectKnowledgeCandidateToCloud(
    cloudConfig,
    parsed.projectId,
    {
      lesson: parsed.lesson,
      ...(parsed.sourceRunId !== undefined
        ? { sourceRunId: parsed.sourceRunId }
        : {}),
    },
  );

  if (!result.ok) {
    const status = result.httpStatus ?? 502;
    const errorMessage =
      status === 401
        ? "This computer is not authorized with AgentWitch."
        : status === 404
          ? "Project not found or you cannot report knowledge for it."
          : "AgentWitch could not save that knowledge update.";
    return { ok: false, httpStatus: status, errorMessage };
  }

  return { ok: true, id: result.id };
};
