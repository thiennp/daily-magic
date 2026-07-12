"use client";

import Button from "@/components/ui/button/Button";
import WorkflowBuilderFieldRow, {
  type DraftWorkflowField,
} from "@/features/workflows/WorkflowBuilderFieldRow";

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
    <>
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
        Add field
      </Button>
    </>
  );
}
