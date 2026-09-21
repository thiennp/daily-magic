"use client";

import { useState } from "react";

import { useCapabilityHarnessDraft } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import { submitCreatePlaybook } from "@/features/capabilities/submitCreatePlaybook";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { findWorkflowDraftFieldError } from "@/features/workflows/findWorkflowDraftFieldError";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

interface UseCreateWorkflowFormOptions {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
}

export function useCreateWorkflowForm({
  onCreated,
  onCancel,
}: UseCreateWorkflowFormOptions) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exampleRequest, setExampleRequest] = useState("");
  const [fields, setFields] = useState<readonly DraftWorkflowField[]>(() => [
    createDraftWorkflowField(),
  ]);
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

    setIsSubmitting(true);
    const result = await submitCreatePlaybook({
      type: CapabilityType.WORKFLOW,
      name: trimmedName,
      description: description.trim(),
      exampleRequest: exampleRequest.trim(),
      workflowFields,
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
    isSubmitting,
    error,
    notice,
    harness,
    setName,
    setDescription,
    setExampleRequest,
    setFields,
    handleSubmit,
  };
}
