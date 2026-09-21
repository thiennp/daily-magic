"use client";

import CreateWorkflowFieldsEditor from "@/features/workflows/CreateWorkflowFieldsEditor";
import CreateWorkflowOutputsEditor from "@/features/workflows/CreateWorkflowOutputsEditor";
import { createDraftWorkflowField } from "@/features/workflows/createDraftWorkflowField";
import { createDraftWorkflowOutputField } from "@/features/workflows/createDraftWorkflowOutputField";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import type DraftWorkflowOutputField from "@/features/workflows/types/DraftWorkflowOutputField.type";

interface CreateWorkflowFormEditorsProps {
  readonly fields: readonly DraftWorkflowField[];
  readonly outputFields: readonly DraftWorkflowOutputField[];
  readonly onFieldsChange: (
    updater: (
      current: readonly DraftWorkflowField[],
    ) => readonly DraftWorkflowField[],
  ) => void;
  readonly onOutputFieldsChange: (
    updater: (
      current: readonly DraftWorkflowOutputField[],
    ) => readonly DraftWorkflowOutputField[],
  ) => void;
}

export default function CreateWorkflowFormEditors({
  fields,
  outputFields,
  onFieldsChange,
  onOutputFieldsChange,
}: CreateWorkflowFormEditorsProps) {
  return (
    <>
      <CreateWorkflowFieldsEditor
        fields={fields}
        onChange={(id, patch) => {
          onFieldsChange((current) =>
            current.map((field) =>
              field.id === id ? { ...field, ...patch } : field,
            ),
          );
        }}
        onAdd={() => {
          onFieldsChange((current) => [...current, createDraftWorkflowField()]);
        }}
        onRemove={(id) => {
          onFieldsChange((current) =>
            current.filter((entry) => entry.id !== id),
          );
        }}
      />
      <CreateWorkflowOutputsEditor
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
    </>
  );
}
