"use client";

import CapabilityHarnessItemsEditor from "@/features/capabilities/CapabilityHarnessItemsEditor";
import { PLAYBOOK_HARNESS_SECTION } from "@/features/capabilities/playbookBuilderCopy.constant";
import type { UseCapabilityHarnessDraftResult } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import CreateWorkflowOutputsEditor from "@/features/workflows/CreateWorkflowOutputsEditor";
import { createDraftWorkflowOutputField } from "@/features/workflows/createDraftWorkflowOutputField";
import { filterHarnessItemsByKinds } from "@/features/workflows/filterHarnessItemsByKinds";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import WorkflowBuilderCollapsibleSection from "@/features/workflows/WorkflowBuilderCollapsibleSection";
import { WORKFLOW_BUILDER_OUTPUTS_SECTION } from "@/features/workflows/workflowBuilderOutputsCopy.constant";
import { WORKFLOW_EXTRA_RULE_HARNESS_KINDS } from "@/features/workflows/workflowHarnessKindGroups.constant";

interface CreateWorkflowFormCollapsiblePanelsProps {
  readonly outputFields: readonly DraftWorkflowOutputField[];
  readonly onOutputFieldsChange: (
    updater: (
      current: readonly DraftWorkflowOutputField[],
    ) => readonly DraftWorkflowOutputField[],
  ) => void;
  readonly harness: UseCapabilityHarnessDraftResult;
}

export default function CreateWorkflowFormCollapsiblePanels({
  outputFields,
  onOutputFieldsChange,
  harness,
}: CreateWorkflowFormCollapsiblePanelsProps) {
  return (
    <>
      <WorkflowBuilderCollapsibleSection
        title={WORKFLOW_BUILDER_OUTPUTS_SECTION.title}
        description={WORKFLOW_BUILDER_OUTPUTS_SECTION.description}
        defaultExpanded={false}
      >
        <CreateWorkflowOutputsEditor
          variant="plain"
          fields={outputFields}
          onChange={(id, patch) => {
            onOutputFieldsChange((current) =>
              current.map((field) =>
                field.id === id ? { ...field, ...patch } : field,
              ),
            );
          }}
          onAdd={() => {
            onOutputFieldsChange((current) => [
              ...current,
              createDraftWorkflowOutputField(),
            ]);
          }}
          onRemove={(id) => {
            onOutputFieldsChange((current) =>
              current.filter((entry) => entry.id !== id),
            );
          }}
        />
      </WorkflowBuilderCollapsibleSection>

      <WorkflowBuilderCollapsibleSection
        title={PLAYBOOK_HARNESS_SECTION.title}
        description={PLAYBOOK_HARNESS_SECTION.description}
        defaultExpanded={false}
      >
        <CapabilityHarnessItemsEditor
          kinds={WORKFLOW_EXTRA_RULE_HARNESS_KINDS}
          items={filterHarnessItemsByKinds(
            harness.items,
            WORKFLOW_EXTRA_RULE_HARNESS_KINDS,
          )}
          onAdd={harness.addItem}
          onRemove={harness.removeItem}
          onChange={harness.updateItem}
          title={PLAYBOOK_HARNESS_SECTION.title}
          description={PLAYBOOK_HARNESS_SECTION.description}
        />
      </WorkflowBuilderCollapsibleSection>
    </>
  );
}
