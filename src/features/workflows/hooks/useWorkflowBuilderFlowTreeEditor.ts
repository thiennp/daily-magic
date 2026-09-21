import { useMemo, useState } from "react";

import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import { describeWorkflowEntryPointSummary } from "@/features/workflows/describeWorkflowEntryPointSummary";
import { filterHarnessItemsByKinds } from "@/features/workflows/filterHarnessItemsByKinds";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { WORKFLOW_RUN_STEP_HARNESS_KINDS } from "@/features/workflows/workflowHarnessKindGroups.constant";

type WorkflowBuilderEditorModal =
  | { readonly type: "entry-form" }
  | { readonly type: "run-step"; readonly itemId: string }
  | null;

interface UseWorkflowBuilderFlowTreeEditorInput {
  readonly fields: readonly DraftWorkflowField[];
  readonly harnessItems: readonly HarnessItemDraft[];
}

export function useWorkflowBuilderFlowTreeEditor({
  fields,
  harnessItems,
}: UseWorkflowBuilderFlowTreeEditorInput) {
  const [isEntryExpanded, setIsEntryExpanded] = useState(true);
  const [editorModal, setEditorModal] =
    useState<WorkflowBuilderEditorModal>(null);

  const runSteps = useMemo(
    () =>
      filterHarnessItemsByKinds(harnessItems, WORKFLOW_RUN_STEP_HARNESS_KINDS),
    [harnessItems],
  );

  const entrySummary = useMemo(
    () => describeWorkflowEntryPointSummary(fields.map((field) => field.label)),
    [fields],
  );

  const activeRunStep =
    editorModal?.type === "run-step"
      ? harnessItems.find((item) => item.id === editorModal.itemId)
      : undefined;

  const activeRunStepIndex =
    activeRunStep === undefined
      ? -1
      : runSteps.findIndex((item) => item.id === activeRunStep.id);

  return {
    isEntryExpanded,
    setIsEntryExpanded,
    editorModal,
    setEditorModal,
    runSteps,
    entrySummary,
    activeRunStep,
    activeRunStepIndex,
  };
}
