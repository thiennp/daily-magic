"use client";

import { useState, type ReactElement } from "react";

import Button from "@/components/ui/button/Button";
import WorkflowTaskFieldBlock from "@/features/workflows/WorkflowTaskFieldBlock";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

interface MobileWorkflowStepperProps {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly fieldErrors?: Readonly<Record<string, string>>;
  readonly onChange: (key: string, value: string) => void;
}

export default function MobileWorkflowStepper({
  fields,
  values,
  fieldErrors = {},
  onChange,
}: MobileWorkflowStepperProps): ReactElement | null {
  const [stepIndex, setStepIndex] = useState(0);
  const visibleFields = fields.filter(
    (field) => field.type !== WorkflowFieldInputType.PROJECT,
  );

  if (visibleFields.length === 0) {
    return null;
  }

  const field = visibleFields[stepIndex];
  const isLastStep = stepIndex === visibleFields.length - 1;

  return (
    <div className="md:hidden">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Step {stepIndex + 1} of {visibleFields.length}
      </p>
      <div className="mt-3">
        <WorkflowTaskFieldBlock
          field={field}
          value={values[field.key] ?? ""}
          errorMessage={fieldErrors[field.key]}
          onChange={(value) => {
            onChange(field.key, value);
          }}
        />
      </div>
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
                Math.min(visibleFields.length - 1, current + 1),
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
