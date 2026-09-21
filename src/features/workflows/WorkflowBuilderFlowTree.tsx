"use client";

import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import { useWorkflowBuilderFlowTreeEditor } from "@/features/workflows/hooks/useWorkflowBuilderFlowTreeEditor";
import WorkflowBuilderEntryPointTreeNode from "@/features/workflows/WorkflowBuilderEntryPointTreeNode";
import WorkflowBuilderFlowTreeAddStepActions from "@/features/workflows/WorkflowBuilderFlowTreeAddStepActions";
import WorkflowBuilderFlowTreeModals from "@/features/workflows/WorkflowBuilderFlowTreeModals";
import WorkflowBuilderRunStepTreeRow from "@/features/workflows/WorkflowBuilderRunStepTreeRow";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { WORKFLOW_BUILDER_FLOW_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

interface WorkflowBuilderFlowTreeProps {
  readonly fields: readonly DraftWorkflowField[];
  readonly onFieldChange: (
    id: string,
    patch: Partial<DraftWorkflowField>,
  ) => void;
  readonly onFieldAdd: () => void;
  readonly onFieldRemove: (id: string) => void;
  readonly harnessItems: readonly HarnessItemDraft[];
  readonly onHarnessAdd: (kind: HarnessItemKind) => void;
  readonly onHarnessRemove: (itemId: string) => void;
  readonly onHarnessChange: (nextItem: HarnessItemDraft) => void;
}

export default function WorkflowBuilderFlowTree({
  fields,
  onFieldChange,
  onFieldAdd,
  onFieldRemove,
  harnessItems,
  onHarnessAdd,
  onHarnessRemove,
  onHarnessChange,
}: WorkflowBuilderFlowTreeProps) {
  const tree = useWorkflowBuilderFlowTreeEditor({ fields, harnessItems });

  return (
    <section className="space-y-3 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {WORKFLOW_BUILDER_FLOW_SECTION.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {WORKFLOW_BUILDER_FLOW_SECTION.description}
        </p>
      </div>

      <div
        className="space-y-2 border-l-2 border-gray-200 pl-4 dark:border-gray-700"
        role="tree"
        aria-label={WORKFLOW_BUILDER_FLOW_SECTION.title}
      >
        <WorkflowBuilderEntryPointTreeNode
          fields={fields}
          summary={tree.entrySummary}
          isExpanded={tree.isEntryExpanded}
          onToggleExpanded={() => {
            tree.setIsEntryExpanded((current) => !current);
          }}
          onOpenEditor={() => {
            tree.setEditorModal({ type: "entry-form" });
          }}
          onAddQuestion={onFieldAdd}
        />

        {tree.runSteps.map((item) => (
          <WorkflowBuilderRunStepTreeRow
            key={item.id}
            item={item}
            onEdit={() => {
              tree.setEditorModal({ type: "run-step", itemId: item.id });
            }}
            onRemove={() => {
              onHarnessRemove(item.id);
            }}
          />
        ))}

        <WorkflowBuilderFlowTreeAddStepActions onAddStep={onHarnessAdd} />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {WORKFLOW_BUILDER_FLOW_SECTION.branchComingSoon}
      </p>

      <WorkflowBuilderFlowTreeModals
        isEntryFormOpen={tree.editorModal?.type === "entry-form"}
        onCloseEntryForm={() => {
          tree.setEditorModal(null);
        }}
        fields={fields}
        onFieldChange={onFieldChange}
        onFieldAdd={onFieldAdd}
        onFieldRemove={onFieldRemove}
        activeRunStep={tree.activeRunStep}
        activeRunStepIndex={tree.activeRunStepIndex}
        onCloseRunStep={() => {
          tree.setEditorModal(null);
        }}
        onHarnessRemove={onHarnessRemove}
        onHarnessChange={onHarnessChange}
      />
    </section>
  );
}
