"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { CapabilityHarnessItemPayload } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import { buildCreateWorkflowTrialPromptPreview } from "@/features/workflows/CreateWorkflowTrialRunPromptPreview";
import { buildWorkflowCreateDraftRecord } from "@/features/workflows/buildWorkflowCreateDraftRecord";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";
import { findWorkflowDraftFieldError } from "@/features/workflows/findWorkflowDraftFieldError";
import { persistWorkflowCreateDraft } from "@/features/workflows/persistWorkflowCreateDraft";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowFieldValidationErrors";
import { filterNonProjectWorkflowFields } from "@/lib/workflows/workflowProjectFields";

export function useCreateWorkflowTrialRun(input: {
  readonly name: string;
  readonly exampleRequest: string;
  readonly draftFields: readonly DraftWorkflowField[];
  readonly harnessReadyItems: readonly CapabilityHarnessItemPayload[];
}) {
  const router = useRouter();
  const [trialFieldValues, setTrialFieldValues] = useState<
    Record<string, string>
  >({});
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workflowFields = useMemo(
    () => buildWorkflowFieldsFromDrafts(input.draftFields),
    [input.draftFields],
  );
  const visibleFields = useMemo(
    () => filterNonProjectWorkflowFields(workflowFields),
    [workflowFields],
  );
  const operatorSteps = useMemo(
    () => mapHarnessItemsToOperatorSteps(input.harnessReadyItems),
    [input.harnessReadyItems],
  );
  const fieldErrors = useMemo(
    () => buildWorkflowFieldValidationErrors(workflowFields, trialFieldValues),
    [trialFieldValues, workflowFields],
  );
  const promptPreview = useMemo(
    () =>
      visibleFields.length === 0
        ? ""
        : buildCreateWorkflowTrialPromptPreview({
            name: input.name,
            exampleRequest: input.exampleRequest,
            workflowFields,
            trialFieldValues,
            operatorSteps,
          }),
    [
      input.exampleRequest,
      input.name,
      operatorSteps,
      trialFieldValues,
      visibleFields.length,
      workflowFields,
    ],
  );

  const canShowTrial =
    findWorkflowDraftFieldError(input.draftFields) === null &&
    visibleFields.length > 0;

  const handleTryOnMac = (): void => {
    setError(null);
    const built = buildWorkflowCreateDraftRecord({
      name: input.name,
      exampleRequest: input.exampleRequest,
      draftFields: input.draftFields,
      harnessReadyItems: input.harnessReadyItems,
      trialFieldValues,
    });

    if (!built.ok) {
      setError(built.errorMessage);
      return;
    }

    persistWorkflowCreateDraft(built.record);
    router.push(
      buildAgentComposerHref({
        workflowDraft: true,
        prompt: input.exampleRequest.trim(),
      }),
    );
  };

  return {
    canShowTrial,
    visibleFields,
    trialFieldValues,
    fieldErrors,
    showPreview,
    setShowPreview,
    promptPreview,
    error,
    onTrialFieldChange: (key: string, value: string) => {
      setTrialFieldValues((current) => ({ ...current, [key]: value }));
    },
    handleTryOnMac,
  };
}
