"use client";

import Button from "@/components/ui/button/Button";

interface CreateWorkflowFormSubmitFooterProps {
  readonly error: string | null;
  readonly notice: string | null;
  readonly isSubmitting: boolean;
  readonly submitLabel: string;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
}

export default function CreateWorkflowFormSubmitFooter({
  error,
  notice,
  isSubmitting,
  submitLabel,
  onSubmit,
  onCancel,
}: CreateWorkflowFormSubmitFooterProps) {
  return (
    <>
      {error ? (
        <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
      ) : null}
      {notice ? (
        <p className="text-sm text-amber-700 dark:text-amber-300">{notice}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}
