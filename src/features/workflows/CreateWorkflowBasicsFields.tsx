"use client";

import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import {
  WORKFLOW_BUILDER_ABOUT_SECTION,
  WORKFLOW_BUILDER_INSTRUCTIONS_LABEL,
  WORKFLOW_BUILDER_INSTRUCTIONS_PLACEHOLDER,
} from "@/features/workflows/workflowBuilderCopy.constant";

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
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {WORKFLOW_BUILDER_ABOUT_SECTION.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {WORKFLOW_BUILDER_ABOUT_SECTION.description}
        </p>
      </div>
      <div>
        <Label htmlFor="workflow-name">Workflow name</Label>
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
        <Label htmlFor="workflow-description">Description (optional)</Label>
        <TextArea
          placeholder="What this workflow is for — shown in Library only"
          rows={2}
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div>
        <Label htmlFor="workflow-instructions">
          {WORKFLOW_BUILDER_INSTRUCTIONS_LABEL}
        </Label>
        <TextArea
          placeholder={WORKFLOW_BUILDER_INSTRUCTIONS_PLACEHOLDER}
          rows={3}
          value={exampleRequest}
          onChange={onExampleRequestChange}
        />
      </div>
    </section>
  );
}
