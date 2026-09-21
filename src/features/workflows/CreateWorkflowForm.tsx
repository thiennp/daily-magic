"use client";

import PlaybookBasicsFields from "@/features/capabilities/PlaybookBasicsFields";
import {
  type CreatePlaybookPayload,
  type CreatePlaybookResult,
} from "@/features/capabilities/submitCreatePlaybook";
import CreateWorkflowFormCollapsiblePanels from "@/features/workflows/CreateWorkflowFormCollapsiblePanels";
import CreateWorkflowFormSubmitFooter from "@/features/workflows/CreateWorkflowFormSubmitFooter";
import CreateWorkflowTrialRunSection from "@/features/workflows/CreateWorkflowTrialRunSection";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { useCreateWorkflowForm } from "@/features/workflows/hooks/useCreateWorkflowForm";
import WorkflowBuilderCollapsibleSection from "@/features/workflows/WorkflowBuilderCollapsibleSection";
import WorkflowBuilderFlowTree from "@/features/workflows/WorkflowBuilderFlowTree";
import { WORKFLOW_BUILDER_ABOUT_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";

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
      <WorkflowBuilderCollapsibleSection
        title={WORKFLOW_BUILDER_ABOUT_SECTION.title}
        description={WORKFLOW_BUILDER_ABOUT_SECTION.description}
        defaultExpanded
      >
        <PlaybookBasicsFields
          playbookType="workflow"
          name={form.name}
          description={form.description}
          exampleRequest={form.exampleRequest}
          onNameChange={form.setName}
          onDescriptionChange={form.setDescription}
          onExampleRequestChange={form.setExampleRequest}
        />
      </WorkflowBuilderCollapsibleSection>

      <WorkflowBuilderFlowTree
        fields={form.fields}
        onFieldChange={(id, patch) => {
          form.setFields((current) =>
            current.map((field) =>
              field.id === id ? { ...field, ...patch } : field,
            ),
          );
        }}
        onFieldAdd={() => {
          form.setFields((current) => [...current, createDraftWorkflowField()]);
        }}
        onFieldRemove={(id) => {
          form.setFields((current) =>
            current.filter((entry) => entry.id !== id),
          );
        }}
        harnessItems={form.harness.items}
        onHarnessAdd={form.harness.addItem}
        onHarnessRemove={form.harness.removeItem}
        onHarnessChange={form.harness.updateItem}
      />

      <CreateWorkflowFormCollapsiblePanels
        outputFields={form.outputFields}
        onOutputFieldsChange={form.setOutputFields}
        harness={form.harness}
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
