"use client";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import type { CapabilityHarnessItemPayload } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import CreateWorkflowTrialRunPromptPreview from "@/features/workflows/CreateWorkflowTrialRunPromptPreview";
import { useCreateWorkflowTrialRun } from "@/features/workflows/hooks/useCreateWorkflowTrialRun";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { WORKFLOW_TRIAL_RUN_SECTION } from "@/features/workflows/workflowTrialRunCopy.constant";
import WorkflowTaskFields from "@/features/workflows/WorkflowTaskFields";

interface CreateWorkflowTrialRunSectionProps {
  readonly name: string;
  readonly exampleRequest: string;
  readonly draftFields: readonly DraftWorkflowField[];
  readonly harnessReadyItems: readonly CapabilityHarnessItemPayload[];
}

export default function CreateWorkflowTrialRunSection(
  props: CreateWorkflowTrialRunSectionProps,
) {
  const trial = useCreateWorkflowTrialRun(props);

  if (!trial.canShowTrial) {
    return null;
  }

  return (
    <section className={`space-y-4 ${APP_SURFACE_NESTED_CARD_CLASS}`}>
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          {WORKFLOW_TRIAL_RUN_SECTION.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {WORKFLOW_TRIAL_RUN_SECTION.description}
        </p>
      </div>
      <WorkflowTaskFields
        fields={trial.visibleFields}
        values={trial.trialFieldValues}
        fieldErrors={trial.fieldErrors}
        onChange={trial.onTrialFieldChange}
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => {
            trial.setShowPreview((open) => !open);
          }}
        >
          {trial.showPreview
            ? WORKFLOW_TRIAL_RUN_SECTION.hidePreview
            : WORKFLOW_TRIAL_RUN_SECTION.showPreview}
        </Button>
        <Button onClick={trial.handleTryOnMac}>
          {WORKFLOW_TRIAL_RUN_SECTION.tryOnMac}
        </Button>
      </div>
      <CreateWorkflowTrialRunPromptPreview
        visible={trial.showPreview}
        prompt={trial.promptPreview}
      />
      {trial.error ? (
        <p className="text-sm text-error-600 dark:text-error-400">
          {trial.error}
        </p>
      ) : null}
    </section>
  );
}
