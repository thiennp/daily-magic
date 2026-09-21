"use client";

import Button from "@/components/ui/button/Button";
import CapabilityHarnessItemsEditor from "@/features/capabilities/CapabilityHarnessItemsEditor";
import PlaybookBasicsFields from "@/features/capabilities/PlaybookBasicsFields";
import { PLAYBOOK_HARNESS_SECTION } from "@/features/capabilities/playbookBuilderCopy.constant";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { filterHarnessItemsByKinds } from "@/features/workflows/filterHarnessItemsByKinds";
import { useCreateWorkflowForm } from "@/features/workflows/hooks/useCreateWorkflowForm";
import WorkflowBuilderCollapsibleSection from "@/features/workflows/WorkflowBuilderCollapsibleSection";
import WorkflowBuilderFlowTree from "@/features/workflows/WorkflowBuilderFlowTree";
import { WORKFLOW_BUILDER_ABOUT_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import { WORKFLOW_EXTRA_RULE_HARNESS_KINDS } from "@/features/workflows/workflowHarnessKindGroups.constant";

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

      <WorkflowBuilderCollapsibleSection
        title={PLAYBOOK_HARNESS_SECTION.title}
        description={PLAYBOOK_HARNESS_SECTION.description}
        defaultExpanded={false}
      >
        <CapabilityHarnessItemsEditor
          kinds={WORKFLOW_EXTRA_RULE_HARNESS_KINDS}
          items={filterHarnessItemsByKinds(
            form.harness.items,
            WORKFLOW_EXTRA_RULE_HARNESS_KINDS,
          )}
          onAdd={form.harness.addItem}
          onRemove={form.harness.removeItem}
          onChange={form.harness.updateItem}
          title={PLAYBOOK_HARNESS_SECTION.title}
          description={PLAYBOOK_HARNESS_SECTION.description}
        />
      </WorkflowBuilderCollapsibleSection>

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
