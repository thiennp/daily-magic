"use client";

import Button from "@/components/ui/button/Button";
import WorkflowBuilderOutputFieldRow from "@/features/workflows/WorkflowBuilderOutputFieldRow";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";
import { WORKFLOW_BUILDER_OUTPUTS_SECTION } from "@/features/workflows/workflowBuilderOutputsCopy.constant";

interface CreateWorkflowOutputsEditorProps {
  readonly fields: readonly DraftWorkflowOutputField[];
  readonly onChange: (
    id: string,
    patch: Partial<DraftWorkflowOutputField>,
  ) => void;
  readonly onAdd: () => void;
  readonly onRemove: (id: string) => void;
  readonly variant?: "section" | "plain";
}

export default function CreateWorkflowOutputsEditor({
  fields,
  onChange,
  onAdd,
  onRemove,
  variant = "section",
}: CreateWorkflowOutputsEditorProps) {
  const sectionClass =
    variant === "section"
      ? "space-y-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800"
      : "space-y-4";

  return (
    <section className={sectionClass}>
      {variant === "section" ? (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
            {WORKFLOW_BUILDER_OUTPUTS_SECTION.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {WORKFLOW_BUILDER_OUTPUTS_SECTION.description}
          </p>
        </div>
      ) : null}
      {fields.length > 0 ? (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <WorkflowBuilderOutputFieldRow
              key={field.id}
              field={field}
              index={index}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : null}
      <Button variant="outline" onClick={onAdd}>
        {WORKFLOW_BUILDER_OUTPUTS_SECTION.addButton}
      </Button>
    </section>
  );
}
