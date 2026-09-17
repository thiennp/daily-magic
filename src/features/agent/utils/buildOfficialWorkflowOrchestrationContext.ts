import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { OfficialWorkflowOrchestrationCapabilityContext } from "@/lib/workflowOrchestration/shouldUseOfficialWorkflowOrchestration";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";

export const buildOfficialWorkflowOrchestrationContext = (
  composer: ReturnType<typeof useWsTestTaskComposer>,
): OfficialWorkflowOrchestrationCapabilityContext | null => {
  if (!composer.isWorkflowTask) {
    return null;
  }

  return {
    type: CapabilityType.WORKFLOW,
    harnessSetSlug: composer.harnessSetSlug,
  };
};

export default buildOfficialWorkflowOrchestrationContext;
