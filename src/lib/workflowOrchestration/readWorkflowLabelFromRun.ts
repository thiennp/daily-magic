import { parseOfficialWorkflowDefinitionSnapshot } from "@/lib/workflowOrchestration/parseOfficialWorkflowDefinitionSnapshot";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

export const readWorkflowLabelFromRun = (
  run: WorkflowRunRecord,
): string | undefined => {
  const definition = parseOfficialWorkflowDefinitionSnapshot(
    run.definitionSnapshot,
  );
  const label = definition?.capabilityName.trim();
  return label !== undefined && label.length > 0 ? label : undefined;
};

export default readWorkflowLabelFromRun;
