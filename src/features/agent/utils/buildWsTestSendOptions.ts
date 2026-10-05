import { buildOfficialWorkflowOrchestrationContext } from "@/features/agent/utils/buildOfficialWorkflowOrchestrationContext";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";
import { shouldUseOfficialWorkflowOrchestration } from "@/lib/workflowOrchestration/shouldUseOfficialWorkflowOrchestration";

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
  readonly projectId: string;
  readonly fieldValues?: Readonly<Record<string, string>>;
  readonly useOfficialWorkflowOrchestration?: boolean;
  readonly runScopedComponentIds?: readonly string[];
} => {
  const orchestrationContext =
    buildOfficialWorkflowOrchestrationContext(composer);
  const useOfficialWorkflowOrchestration =
    shouldUseOfficialWorkflowOrchestration(orchestrationContext);

  return {
    writerAgent,
    // Always the current project; no Default/empty fallback (NRG project_required).
    projectId: composer.selectedProjectId,
    ...(composer.selectedProject !== null &&
    composer.selectedProject !== undefined
      ? { projectFolderPath: composer.selectedProject.folderPath }
      : {}),
    ...(useOfficialWorkflowOrchestration
      ? {
          useOfficialWorkflowOrchestration: true,
          fieldValues: composer.workflowFieldValues,
        }
      : {}),
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
        }),
    ...((composer.runScopedComponentIds ?? []).length > 0
      ? { runScopedComponentIds: [...(composer.runScopedComponentIds ?? [])] }
      : {}),
  };
};
