"use client";

import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";

interface CreateWorkflowBasicsFieldsProps {
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly onNameChange: (value: string) => void;
  readonly onDescriptionChange: (value: string) => void;
  readonly onExampleRequestChange: (value: string) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900";

export default function CreateWorkflowBasicsFields({
  name,
  description,
  exampleRequest,
  onNameChange,
  onDescriptionChange,
  onExampleRequestChange,
}: CreateWorkflowBasicsFieldsProps) {
  return (
    <>
      <div>
        <Label htmlFor="workflow-name">Name</Label>
        <input
          id="workflow-name"
          value={name}
          placeholder="Weekly client report"
          onChange={(event) => {
            onNameChange(event.target.value);
          }}
          className={inputClass}
        />
      </div>
      <div>
        <Label htmlFor="workflow-description">Description</Label>
        <TextArea
          placeholder="What this workflow is for"
          rows={2}
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div>
        <Label htmlFor="workflow-instructions">
          Default instructions (optional)
        </Label>
        <TextArea
          placeholder="Tone, format, or standing rules"
          rows={3}
          value={exampleRequest}
          onChange={onExampleRequestChange}
        />
      </div>
    </>
  );
}
