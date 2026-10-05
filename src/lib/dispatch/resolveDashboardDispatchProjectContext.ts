import { buildClaudeDispatchPayloadFromBody } from "@/lib/dispatch/buildWriterDispatchPayloadFromBody";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveAgentRunDispatchProject } from "@/lib/dispatch/resolveAgentRunDispatchProject";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export const resolveDashboardDispatchProjectContext = async (input: {
  readonly body: AgentRunDispatchBody;
  readonly requesterUserId: string;
  readonly targetDeviceId: string | null;
  readonly requestId: string;
}): Promise<
  | {
      readonly ok: true;
      readonly body: AgentRunDispatchBody;
      readonly payload: Readonly<Record<string, unknown>> & {
        readonly prompt: string;
      };
    }
  | {
      readonly ok: false;
      readonly message: AgentWitchMessage;
      readonly status: 400 | 403 | 404;
      readonly code: string;
    }
> => {
  const projectResolution = await resolveAgentRunDispatchProject({
    body: input.body,
    requesterUserId: input.requesterUserId,
    targetDeviceId: input.targetDeviceId,
  });

  if (!projectResolution.ok) {
    return {
      ok: false,
      status: projectResolution.status,
      code: projectResolution.code,
      message: buildDispatchError(
        projectResolution.errorMessage,
        input.requestId,
        projectResolution.code,
        projectResolution.status,
      ),
    };
  }

  const body = {
    ...input.body,
    projectId: projectResolution.projectId,
    projectFolderPath: projectResolution.projectFolderPath,
  };

  return {
    ok: true,
    body,
    payload: buildClaudeDispatchPayloadFromBody(body),
  };
};
