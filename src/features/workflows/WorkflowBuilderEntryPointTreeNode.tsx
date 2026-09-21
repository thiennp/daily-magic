"use client";

import Button from "@/components/ui/button/Button";
import resolveWorkflowFieldRowTitle from "@/features/workflows/resolveWorkflowFieldRowTitle";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import { WORKFLOW_BUILDER_FLOW_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";

interface WorkflowBuilderEntryPointTreeNodeProps {
  readonly fields: readonly DraftWorkflowField[];
  readonly summary: string;
  readonly isExpanded: boolean;
  readonly onToggleExpanded: () => void;
  readonly onOpenEditor: () => void;
  readonly onAddQuestion: () => void;
}

export default function WorkflowBuilderEntryPointTreeNode({
  fields,
  summary,
  isExpanded,
  onToggleExpanded,
  onOpenEditor,
  onAddQuestion,
}: WorkflowBuilderEntryPointTreeNodeProps) {
  return (
    <div role="treeitem" aria-expanded={isExpanded} aria-selected={false}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleExpanded}
          className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={
            isExpanded ? "Collapse entry point" : "Expand entry point"
          }
        >
          {isExpanded ? "▾" : "▸"}
        </button>
        <button
          type="button"
          onClick={onOpenEditor}
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm transition hover:border-brand-300 dark:border-gray-700 dark:bg-gray-900/40"
        >
          <span className="font-medium text-gray-900 dark:text-white/90">
            {WORKFLOW_BUILDER_FLOW_SECTION.entryPointLabel}
          </span>
          <span className="mt-0.5 block truncate text-xs text-gray-600 dark:text-gray-400">
            {summary}
          </span>
        </button>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddQuestion}
          aria-label={WORKFLOW_BUILDER_FLOW_SECTION.addQuestionButton}
        >
          +
        </Button>
      </div>
      {isExpanded ? (
        <ul className="mt-2 space-y-1 pl-6">
          {fields.map((field, index) => (
            <li key={field.id}>
              <button
                type="button"
                onClick={onOpenEditor}
                className="w-full rounded-md px-2 py-1 text-left text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                {resolveWorkflowFieldRowTitle(field.label, index)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
