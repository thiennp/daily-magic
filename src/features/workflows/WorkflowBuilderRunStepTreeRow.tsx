"use client";

import { HARNESS_KIND_LABELS } from "@/features/harness/constants/harnessFormOptions";
import type { HarnessItemDraft } from "@/features/harness/types/HarnessItemDraft.type";
import { WORKFLOW_BUILDER_FLOW_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";

interface WorkflowBuilderRunStepTreeRowProps {
  readonly item: HarnessItemDraft;
  readonly onEdit: () => void;
  readonly onRemove: () => void;
}

const resolveRunStepTitle = (item: HarnessItemDraft): string => {
  const trimmed = item.title.trim();
  if (trimmed.length > 0) {
    return trimmed;
  }
  return WORKFLOW_BUILDER_FLOW_SECTION.untitledStep;
};

export default function WorkflowBuilderRunStepTreeRow({
  item,
  onEdit,
  onRemove,
}: WorkflowBuilderRunStepTreeRowProps) {
  return (
    <div role="treeitem" aria-selected={false}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-4 text-center text-xs text-gray-400">│</span>
        <button
          type="button"
          onClick={onEdit}
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm transition hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800"
        >
          <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
            {HARNESS_KIND_LABELS[item.kind]}
          </span>
          <span className="mt-0.5 block truncate font-medium text-gray-900 dark:text-white/90">
            {resolveRunStepTitle(item)}
          </span>
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="px-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
