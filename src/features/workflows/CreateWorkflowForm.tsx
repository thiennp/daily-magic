"use client";

import PlaybookBasicsFields from "@/features/capabilities/PlaybookBasicsFields";
import CreateWorkflowFormSubmitFooter from "@/features/workflows/CreateWorkflowFormSubmitFooter";
import CreateWorkflowFormEditors from "@/features/workflows/CreateWorkflowFormEditors";
import CreateWorkflowHarnessSections from "@/features/workflows/CreateWorkflowHarnessSections";
import CreateWorkflowTrialRunSection from "@/features/workflows/CreateWorkflowTrialRunSection";
import {
  type CreatePlaybookPayload,
  type CreatePlaybookResult,
} from "@/features/capabilities/submitCreatePlaybook";
import { useCreateWorkflowForm } from "@/features/workflows/hooks/useCreateWorkflowForm";

interface CreateWorkflowFormProps {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
  readonly submitPlaybook?: (
    payload: CreatePlaybookPayload,
  ) => Promise<CreatePlaybookResult>;
  readonly submitLabel?: string;
}

export default function CreateWorkflowForm({
  onCreated,
  onCancel,
  submitPlaybook,
  submitLabel = "Publish workflow",
}: CreateWorkflowFormProps) {
  const form = useCreateWorkflowForm({ onCreated, onCancel, submitPlaybook });

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
      <CreateWorkflowFormEditors
        fields={form.fields}
        outputFields={form.outputFields}
        onFieldsChange={form.setFields}
        onOutputFieldsChange={form.setOutputFields}
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
      <CreateWorkflowFormSubmitFooter
        error={form.error}
        notice={form.notice}
        isSubmitting={form.isSubmitting}
        submitLabel={submitLabel}
        onSubmit={() => void form.handleSubmit()}
        onCancel={onCancel}
      />
    </div>
  );
}
