"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import CreateWorkflowBasicsFields from "@/features/workflows/CreateWorkflowBasicsFields";
import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import { type DraftWorkflowField } from "@/features/workflows/WorkflowBuilderFieldRow";
import {
  buildWorkflowFieldsFromDrafts,
  submitCreateWorkflow,
} from "@/features/workflows/createWorkflowSubmit";

interface CreateWorkflowFormProps {
  readonly onCreated: () => void;
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

export default function CreateWorkflowForm({
  onCreated,
  onCancel,
}: CreateWorkflowFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exampleRequest, setExampleRequest] = useState("");
  const [fields, setFields] = useState<readonly DraftWorkflowField[]>(() => [
    createDraftField(),
  ]);
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
    const result = await submitCreateWorkflow({
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

    onCreated();
    onCancel();
  };

  return (
    <div className="mt-6 space-y-4">
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
          {isSubmitting ? "Publishing…" : "Publish workflow"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
