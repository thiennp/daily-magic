import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";

export const buildWsTestSendOptions = (
  composer: ReturnType<typeof useWsTestTaskComposer>,
  writerAgent: HarnessWriterAgent,
): {
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly targetDeviceId?: string;
} => ({
  writerAgent,
  ...(composer.isTeamDispatch
    ? {
        targetUserId: composer.selectedTargetUserId,
        groupId: composer.selectedGroupId,
        capabilityId: composer.selectedCapabilityId,
      }
    : {
        ...(composer.selectedDeviceId.length > 0
          ? { targetDeviceId: composer.selectedDeviceId }
          : {}),
        ...(composer.isLibraryPlaybook && composer.libraryCapabilityId.length > 0
          ? { capabilityId: composer.libraryCapabilityId }
          : {}),
      }),
});
