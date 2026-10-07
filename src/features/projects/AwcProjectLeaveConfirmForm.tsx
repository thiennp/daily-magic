"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { AWC_PROJECT_LEAVE_COPY } from "@/features/projects/awcProjectLeaveCopy.constant";

interface AwcProjectLeaveConfirmFormProps {
  readonly pending?: boolean;
  readonly errorMessage?: string | null;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly variant?: "dialog" | "inline";
}

const AwcProjectLeaveConfirmForm = ({
  pending = false,
  errorMessage = null,
  onConfirm,
  onCancel,
  variant = "dialog",
}: AwcProjectLeaveConfirmFormProps) => {
  const fields = (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
        {AWC_PROJECT_LEAVE_COPY.title}
      </h2>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {AWC_PROJECT_LEAVE_COPY.body}
      </p>
      {errorMessage !== null ? (
        <p className="text-xs text-error-600 dark:text-error-400" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          disabled={pending}
          className="min-h-11 bg-error-600 hover:bg-error-700 sm:min-h-0"
          onClick={onConfirm}
        >
          {pending
            ? AWC_PROJECT_LEAVE_COPY.leaving
            : AWC_PROJECT_LEAVE_COPY.confirm}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          className="min-h-11 sm:min-h-0"
          onClick={onCancel}
        >
          {AWC_PROJECT_LEAVE_COPY.cancel}
        </Button>
      </div>
    </div>
  );

  if (variant === "dialog") {
    return (
      <Modal
        isOpen
        onClose={onCancel}
        showCloseButton={false}
        className="mx-4 max-w-md p-5"
      >
        {fields}
      </Modal>
    );
  }

  return fields;
};

export default AwcProjectLeaveConfirmForm;
