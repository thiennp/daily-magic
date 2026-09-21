"use client";

import Button from "@/components/ui/button/Button";
import PlaybookBasicsFields from "@/features/capabilities/PlaybookBasicsFields";
import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import CreateWorkflowHarnessSections from "@/features/workflows/CreateWorkflowHarnessSections";
import CreateWorkflowTrialRunSection from "@/features/workflows/CreateWorkflowTrialRunSection";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { useCreateWorkflowForm } from "@/features/workflows/hooks/useCreateWorkflowForm";

interface CreateWorkflowFormProps {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
}

export default function CreateWorkflowForm({
  onCreated,
  onCancel,
}: CreateWorkflowFormProps) {
  const form = useCreateWorkflowForm({ onCreated, onCancel });

  return (
    <div className="mt-6 space-y-4">
      <PlaybookBasicsFields
        playbookType="workflow"
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
      <CreateWorkflowHarnessSections
        items={form.harness.items}
        onAdd={form.harness.addItem}
        onRemove={form.harness.removeItem}
        onChange={form.harness.updateItem}
      />
      <CreateWorkflowTrialRunSection
        name={form.name}
        exampleRequest={form.exampleRequest}
        draftFields={form.fields}
        harnessReadyItems={form.harness.readyItems}
      />
      {form.error ? (
        <p className="text-sm text-error-600 dark:text-error-400">
          {form.error}
        </p>
      ) : null}
      {form.notice ? (
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {form.notice}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={form.isSubmitting}
          onClick={() => void form.handleSubmit()}
        >
          {form.isSubmitting ? "Publishing…" : "Publish workflow"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
