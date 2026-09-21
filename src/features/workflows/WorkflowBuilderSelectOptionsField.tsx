"use client";

import Label from "@/components/form/Label";

interface WorkflowBuilderSelectOptionsFieldProps {
  readonly fieldId: string;
  readonly options: readonly string[];
  readonly onChange: (options: readonly string[]) => void;
}

export default function WorkflowBuilderSelectOptionsField({
  fieldId,
  options,
  onChange,
}: WorkflowBuilderSelectOptionsFieldProps) {
  return (
    <div className="sm:col-span-2">
      <Label htmlFor={`wf-options-${fieldId}`}>Choices (one per line)</Label>
      <textarea
        id={`wf-options-${fieldId}`}
        value={options.join("\n")}
        placeholder={"Option A\nOption B"}
        rows={3}
        onChange={(event) => {
          onChange(event.target.value.split("\n"));
        }}
        className="mt-0 h-auto min-h-20 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800"
      />
    </div>
  );
}
