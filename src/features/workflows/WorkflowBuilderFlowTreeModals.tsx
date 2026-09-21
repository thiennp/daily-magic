"use client";

import { Modal } from "@/components/ui/modal";
import HarnessItemFieldsEditor from "@/features/harness/components/HarnessItemFieldsEditor";
import { HARNESS_KIND_LABELS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { WORKFLOW_BUILDER_FLOW_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";
import { WORKFLOW_RUN_STEP_HARNESS_KINDS } from "@/features/workflows/workflowHarnessKindGroups.constant";

interface WorkflowBuilderFlowTreeModalsProps {
  readonly isEntryFormOpen: boolean;
  readonly onCloseEntryForm: () => void;
  readonly fields: readonly DraftWorkflowField[];
  readonly onFieldChange: (
    id: string,
    patch: Partial<DraftWorkflowField>,
  ) => void;
  readonly onFieldAdd: () => void;
  readonly onFieldRemove: (id: string) => void;
  readonly activeRunStep: HarnessItemDraft | undefined;
  readonly activeRunStepIndex: number;
  readonly onCloseRunStep: () => void;
  readonly onHarnessRemove: (itemId: string) => void;
  readonly onHarnessChange: (nextItem: HarnessItemDraft) => void;
}

export default function WorkflowBuilderFlowTreeModals({
  isEntryFormOpen,
  onCloseEntryForm,
  fields,
  onFieldChange,
  onFieldAdd,
  onFieldRemove,
  activeRunStep,
  activeRunStepIndex,
  onCloseRunStep,
  onHarnessRemove,
  onHarnessChange,
}: WorkflowBuilderFlowTreeModalsProps) {
  return (
    <>
      <Modal
        isOpen={isEntryFormOpen}
        onClose={onCloseEntryForm}
        className="max-w-2xl p-6 sm:p-8"
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white/90">
          {WORKFLOW_BUILDER_FLOW_SECTION.entryPointLabel}
        </h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {WORKFLOW_BUILDER_FLOW_SECTION.entryPointHint}
        </p>
        <div className="mt-6">
          <CreateWorkflowFieldsEditor
            variant="plain"
            fields={fields}
            onChange={onFieldChange}
            onAdd={onFieldAdd}
            onRemove={onFieldRemove}
          />
        </div>
      </Modal>

      <Modal
        isOpen={activeRunStep !== undefined}
        onClose={onCloseRunStep}
        className="max-w-2xl p-6 sm:p-8"
      >
        {activeRunStep !== undefined ? (
          <>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white/90">
              {HARNESS_KIND_LABELS[activeRunStep.kind]}
            </h4>
            <div className="mt-6">
              <HarnessItemFieldsEditor
                item={activeRunStep}
                index={activeRunStepIndex < 0 ? 0 : activeRunStepIndex}
                canRemove
                allowedKinds={[...WORKFLOW_RUN_STEP_HARNESS_KINDS]}
                onRemove={() => {
                  onHarnessRemove(activeRunStep.id);
                  onCloseRunStep();
                }}
                onChange={onHarnessChange}
              />
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}
