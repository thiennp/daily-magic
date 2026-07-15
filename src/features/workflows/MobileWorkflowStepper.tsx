"use client";

import { useState, type ReactElement } from "react";

import Button from "@/components/ui/button/Button";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

interface MobileWorkflowStepperProps {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly onChange: (key: string, value: string) => void;
}

export default function MobileWorkflowStepper({
  fields,
  values,
  onChange,
}: MobileWorkflowStepperProps): ReactElement | null {
  const [stepIndex, setStepIndex] = useState(0);

  if (fields.length === 0) {
    return null;
  }

  const field = fields[stepIndex];
  const isLastStep = stepIndex === fields.length - 1;

  return (
    <div className="md:hidden">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Step {stepIndex + 1} of {fields.length}
      </p>
      <label className="mt-3 block text-sm font-medium text-gray-800 dark:text-white/90">
        {field.label}
        {field.required ? " *" : ""}
        {field.type === "textarea" ? (
          <textarea
            value={values[field.key] ?? ""}
            onChange={(event) => {
              onChange(field.key, event.target.value);
            }}
            rows={4}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
          />
        ) : (
          <input
            type="text"
            value={values[field.key] ?? ""}
            onChange={(event) => {
              onChange(field.key, event.target.value);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
          />
        )}
      </label>
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          disabled={stepIndex === 0}
          onClick={() => {
            setStepIndex((current) => Math.max(0, current - 1));
          }}
        >
          Back
        </Button>
        {!isLastStep ? (
          <Button
            onClick={() => {
              setStepIndex((current) =>
                Math.min(fields.length - 1, current + 1),
              );
            }}
          >
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
}
