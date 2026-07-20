import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { DispatchTargetCapability } from "@/features/dispatch/hooks/useDispatchTargets";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";

export const resolveComposerPlaybookContext = (
  selectedCapability: DispatchTargetCapability | null,
  libraryPlaybook: LibraryPlaybookTemplate | null,
): {
  readonly playbookName: string;
  readonly isWorkflowTask: boolean;
} => {
  const playbookType =
    libraryPlaybook?.type ?? selectedCapability?.type ?? CapabilityType.AGENT;

  return {
    playbookName: libraryPlaybook?.name ?? selectedCapability?.name ?? "",
    isWorkflowTask: playbookType === CapabilityType.WORKFLOW,
  };
};
