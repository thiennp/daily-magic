"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import CreateWorkflowBasicsFields from "@/features/workflows/CreateWorkflowBasicsFields";
import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import { capabilityWorkflowFieldsToDrafts } from "@/features/workflows/capabilityWorkflowFieldsToDrafts";
import { type DraftWorkflowField } from "@/features/workflows/WorkflowBuilderFieldRow";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/createWorkflowSubmit";
import { submitUpdateWorkflow } from "@/features/workflows/submitUpdateWorkflow";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface EditWorkflowFormProps {
  readonly capability: PublishedCapabilityRecord;
  readonly onSaved: () => void;
  readonly onCancel: () => void;
}

function createDraftField(): DraftWorkflowField {
  return {
    id: crypto.randomUUID(),
    label: "",
    type: "text",
    required: true,
  };
}

export default function EditWorkflowForm({
  capability,
  onSaved,
  onCancel,
}: EditWorkflowFormProps) {
  const [name, setName] = useState(capability.name);
  const [description, setDescription] = useState(capability.description);
  const [exampleRequest, setExampleRequest] = useState(
    capability.exampleRequest,
  );
  const [fields, setFields] = useState<readonly DraftWorkflowField[]>(() =>
    capability.workflowFields.length > 0
      ? capabilityWorkflowFieldsToDrafts(capability.workflowFields)
      : [createDraftField()],
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

    const workflowFields = buildWorkflowFieldsFromDrafts(fields);
    if (workflowFields.length === 0) {
      setError("Add at least one field with a label.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitUpdateWorkflow({
      capabilityId: capability.id,
      name: trimmedName,
      description: description.trim(),
      exampleRequest: exampleRequest.trim(),
      workflowFields,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onSaved();
    onCancel();
  };

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
      <CreateWorkflowBasicsFields
        name={name}
        description={description}
        exampleRequest={exampleRequest}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onExampleRequestChange={setExampleRequest}
      />
      <CreateWorkflowFieldsEditor
        fields={fields}
        onChange={(id, patch) => {
          setFields((current) =>
            current.map((field) =>
              field.id === id ? { ...field, ...patch } : field,
            ),
          );
        }}
        onAdd={() => {
          setFields((current) => [...current, createDraftField()]);
        }}
        onRemove={(id) => {
          setFields((current) => current.filter((entry) => entry.id !== id));
        }}
      />
      {error ? (
        <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button disabled={isSubmitting} onClick={() => void handleSubmit()}>
          {isSubmitting ? "Saving…" : "Save changes"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
