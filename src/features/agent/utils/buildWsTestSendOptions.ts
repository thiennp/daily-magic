import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";

export const buildWsTestSendOptions = (
  composer: ReturnType<typeof useWsTestTaskComposer>,
  writerAgent: HarnessWriterAgent,
  activeDeviceId?: string,
): {
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly targetDeviceId?: string;
  readonly projectFolderPath?: string;
} => ({
  writerAgent,
  ...(composer.isTeamDispatch
    ? {
        targetUserId: composer.selectedTargetUserId,
        groupId: composer.selectedGroupId,
        capabilityId: composer.selectedCapabilityId,
      }
    : {
        ...(activeDeviceId !== undefined && activeDeviceId.length > 0
          ? { targetDeviceId: activeDeviceId }
          : {}),
        ...(composer.isLibraryPlaybook &&
        composer.libraryCapabilityId.length > 0
          ? { capabilityId: composer.libraryCapabilityId }
          : {}),
        ...(composer.selectedProject?.folderPath !== undefined &&
        composer.selectedProject.folderPath.length > 0
          ? { projectFolderPath: composer.selectedProject.folderPath }
          : {}),
      }),
});
