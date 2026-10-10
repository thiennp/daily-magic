import type { useWsTestTaskComposer } from "@/features/agent/hooks/public-api/types";
import type { useAgentRunQueue } from "@/features/agent/hooks/public-api/types";

export const buildAgentLiveTerminalFeedbackEnqueuePayload = (
  composer: ReturnType<typeof useWsTestTaskComposer>,
  message: string,
): Parameters<ReturnType<typeof useAgentRunQueue>["enqueueRun"]>[0] => ({
  prompt: message.trim(),
  ...(composer.isTeamDispatch
    ? {
        executorUserId: composer.selectedTargetUserId,
        groupId: composer.selectedGroupId,
        capabilityId: composer.selectedCapabilityId,
      }
    : composer.libraryCapabilityId.length > 0
      ? { capabilityId: composer.libraryCapabilityId }
      : {}),
});
