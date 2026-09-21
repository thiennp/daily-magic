"use client";

import { useState } from "react";

import { buildWorkflowOutputFieldsFromDrafts } from "@/features/workflows/buildWorkflowOutputFieldsFromDrafts";
import { capabilityWorkflowOutputFieldsToDrafts } from "@/features/workflows/capabilityWorkflowOutputFieldsToDrafts";
import { capabilityWorkflowFieldsToDrafts } from "@/features/workflows/capabilityWorkflowFieldsToDrafts";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/createWorkflowSubmit";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { findWorkflowDraftFieldError } from "@/features/workflows/findWorkflowDraftFieldError";
import { submitUpdateWorkflow } from "@/features/workflows/submitUpdateWorkflow";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface UseEditWorkflowFormOptions {
  readonly capability: PublishedCapabilityRecord;
  readonly onSaved: () => void;
  readonly onCancel: () => void;
}

export function useEditWorkflowForm({
  capability,
  onSaved,
  onCancel,
}: UseEditWorkflowFormOptions) {
  const [name, setName] = useState(capability.name);
  const [description, setDescription] = useState(capability.description);
  const [exampleRequest, setExampleRequest] = useState(
    capability.exampleRequest,
  );
  const [fields, setFields] = useState<readonly DraftWorkflowField[]>(() =>
    capability.workflowFields.length > 0
      ? capabilityWorkflowFieldsToDrafts(capability.workflowFields)
      : [createDraftWorkflowField()],
  );
  const [outputFields, setOutputFields] = useState(
    () =>
      capabilityWorkflowOutputFieldsToDrafts(
        capability.workflowOutputFields,
      ) as readonly DraftWorkflowOutputField[],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (): Promise<void> => {
    setError(null);
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
    const result = await submitUpdateWorkflow({
      capabilityId: capability.id,
      name: trimmedName,
      description: description.trim(),
      exampleRequest: exampleRequest.trim(),
      workflowFields,
      workflowOutputFields,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onSaved();
    onCancel();
  };

  return {
    name,
    description,
    exampleRequest,
    fields,
    outputFields,
    isSubmitting,
    error,
    setName,
    setDescription,
    setExampleRequest,
    setFields,
    setOutputFields,
    handleSubmit,
  };
}
