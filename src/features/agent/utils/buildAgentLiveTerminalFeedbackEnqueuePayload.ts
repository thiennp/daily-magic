import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import type { useAgentRunQueue } from "@/features/agent/hooks/useAgentRunQueue";

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
