import { buildWorkflowPrompt } from "@/lib/workflows/buildWorkflowPrompt";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";
import { WORKFLOW_TRIAL_RUN_SECTION } from "@/features/workflows/workflowTrialRunCopy.constant";

interface CreateWorkflowTrialRunPromptPreviewProps {
  readonly visible: boolean;
  readonly prompt: string;
}

export default function CreateWorkflowTrialRunPromptPreview({
  visible,
  prompt,
}: CreateWorkflowTrialRunPromptPreviewProps) {
  if (!visible || prompt.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {WORKFLOW_TRIAL_RUN_SECTION.previewTitle}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {WORKFLOW_TRIAL_RUN_SECTION.previewHint}
      </p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
        {prompt}
      </pre>
    </div>
  );
}

export const buildCreateWorkflowTrialPromptPreview = (input: {
  readonly name: string;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly trialFieldValues: Readonly<Record<string, string>>;
  readonly operatorSteps: readonly OperatorStepDefinition[];
}): string => {
  const displayName =
    input.name.trim().length > 0 ? input.name.trim() : "Untitled workflow";
  return buildWorkflowPrompt(
    displayName,
    input.workflowFields,
    input.trialFieldValues,
    input.exampleRequest,
    input.operatorSteps,
  );
};
