"use client";

import Button from "@/components/ui/button/Button";
import WorkflowBuilderFieldRow, {
  type DraftWorkflowField,
} from "@/features/workflows/WorkflowBuilderFieldRow";
import { WORKFLOW_BUILDER_QUESTIONS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";

interface CreateWorkflowFieldsEditorProps {
  readonly fields: readonly DraftWorkflowField[];
  readonly onChange: (id: string, patch: Partial<DraftWorkflowField>) => void;
  readonly onAdd: () => void;
  readonly onRemove: (id: string) => void;
}

export default function CreateWorkflowFieldsEditor({
  fields,
  onChange,
  onAdd,
  onRemove,
}: CreateWorkflowFieldsEditorProps) {
  return (
    <section className="space-y-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {WORKFLOW_BUILDER_QUESTIONS_SECTION.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {WORKFLOW_BUILDER_QUESTIONS_SECTION.description}
        </p>
      </div>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <WorkflowBuilderFieldRow
            key={field.id}
            field={field}
            index={index}
            canRemove={fields.length > 1}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </div>
      <Button variant="outline" onClick={onAdd}>
        {WORKFLOW_BUILDER_QUESTIONS_SECTION.addButton}
      </Button>
    </section>
  );
}
