"use client";

import { useState } from "react";

import { useCapabilityHarnessDraft } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import {
  submitCreatePlaybook,
  type CreatePlaybookResult,
} from "@/features/capabilities/submitCreatePlaybook";
import type { CreatePlaybookPayload } from "@/features/capabilities/submitCreatePlaybook";
import { buildWorkflowOutputFieldsFromDrafts } from "@/features/workflows/buildWorkflowOutputFieldsFromDrafts";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { findWorkflowDraftFieldError } from "@/features/workflows/findWorkflowDraftFieldError";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface UseCreateWorkflowFormOptions {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
  readonly submitPlaybook?: (
    payload: CreatePlaybookPayload,
  ) => Promise<CreatePlaybookResult>;
}

export function useCreateWorkflowForm({
  onCreated,
  onCancel,
  submitPlaybook = submitCreatePlaybook,
}: UseCreateWorkflowFormOptions) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exampleRequest, setExampleRequest] = useState("");
  const [fields, setFields] = useState<readonly DraftWorkflowField[]>(() => [
    createDraftWorkflowField(),
  ]);
  const [outputFields, setOutputFields] = useState(
    [] as readonly DraftWorkflowOutputField[],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const harness = useCapabilityHarnessDraft();

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setNotice(null);
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      setError("Workflow name is required.");
      return;
    }

    const draftError = findWorkflowDraftFieldError(fields);
    if (draftError !== null) {
      setError(draftError);
      return;
    }

    const workflowFields = buildWorkflowFieldsFromDrafts(fields);
    if (workflowFields.length === 0) {
      setError("Add at least one question with a label.");
      return;
    }

    const workflowOutputFields =
      buildWorkflowOutputFieldsFromDrafts(outputFields);

    setIsSubmitting(true);
    const result = await submitPlaybook({
      type: CapabilityType.WORKFLOW,
      name: trimmedName,
      description: description.trim(),
      exampleRequest: exampleRequest.trim(),
      workflowFields,
      workflowOutputFields,
      harnessItems: harness.readyItems,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    if (!result.harnessInstalled && result.harnessInstallMessage) {
      setNotice(result.harnessInstallMessage);
    }

    onCreated();
    if (result.harnessInstalled || !result.harnessInstallMessage) {
      onCancel();
    }
  };

  return {
    name,
    description,
    exampleRequest,
    fields,
    outputFields,
    isSubmitting,
    error,
    notice,
    harness,
    setName,
    setDescription,
    setExampleRequest,
    setFields,
    setOutputFields,
    handleSubmit,
  };
}
