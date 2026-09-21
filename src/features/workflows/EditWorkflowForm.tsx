"use client";

import Button from "@/components/ui/button/Button";
import CreateWorkflowBasicsFields from "@/features/workflows/CreateWorkflowBasicsFields";
import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import CreateWorkflowOutputsEditor from "@/features/workflows/CreateWorkflowOutputsEditor";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { createDraftWorkflowOutputField } from "@/features/workflows/createDraftWorkflowOutputField";
import { useEditWorkflowForm } from "@/features/workflows/hooks/useEditWorkflowForm";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface EditWorkflowFormProps {
  readonly capability: PublishedCapabilityRecord;
  readonly onSaved: () => void;
  readonly onCancel: () => void;
}

export default function EditWorkflowForm({
  capability,
  onSaved,
  onCancel,
}: EditWorkflowFormProps) {
  const form = useEditWorkflowForm({ capability, onSaved, onCancel });

  return (
    <div className="mt-4 space-y-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
      <CreateWorkflowBasicsFields
        name={form.name}
        description={form.description}
        exampleRequest={form.exampleRequest}
        onNameChange={form.setName}
        onDescriptionChange={form.setDescription}
        onExampleRequestChange={form.setExampleRequest}
      />
      <CreateWorkflowFieldsEditor
        fields={form.fields}
        onChange={(id, patch) => {
          form.setFields((current) =>
            current.map((field) =>
              field.id === id ? { ...field, ...patch } : field,
            ),
          );
        }}
        onAdd={() => {
          form.setFields((current) => [...current, createDraftWorkflowField()]);
        }}
        onRemove={(id) => {
          form.setFields((current) =>
            current.filter((entry) => entry.id !== id),
          );
        }}
      />
      <CreateWorkflowOutputsEditor
        fields={form.outputFields}
        onChange={(id, patch) => {
          form.setOutputFields((current) =>
            current.map((field) =>
              field.id === id ? { ...field, ...patch } : field,
            ),
          );
        }}
        onAdd={() => {
          form.setOutputFields((current) => [
            ...current,
            createDraftWorkflowOutputField(),
          ]);
        }}
        onRemove={(id) => {
          form.setOutputFields((current) =>
            current.filter((entry) => entry.id !== id),
          );
        }}
      />
      {form.error ? (
        <p className="text-sm text-error-600 dark:text-error-400">
          {form.error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={form.isSubmitting}
          onClick={() => void form.handleSubmit()}
        >
          {form.isSubmitting ? "Saving…" : "Save changes"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
