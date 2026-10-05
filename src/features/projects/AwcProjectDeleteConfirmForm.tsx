"use client";

import { Modal } from "@/components/ui/modal";
import AwcProjectDeleteConfirmFields from "@/features/projects/AwcProjectDeleteConfirmFields";

export type AwcProjectDeleteConfirmVariant = "dialog" | "inline";

interface AwcProjectDeleteConfirmFormProps {
  readonly projectName: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly pending?: boolean;
  /** @deprecated Prefer `pending`. */
  readonly isDeleting?: boolean;
  readonly errorMessage?: string | null;
  /** `dialog` = modal for /projects; `inline` = Settings danger zone. */
  readonly variant?: AwcProjectDeleteConfirmVariant;
}

const AwcProjectDeleteConfirmForm = ({
  projectName,
  onConfirm,
  onCancel,
  pending,
  isDeleting,
  errorMessage = null,
  variant = "inline",
}: AwcProjectDeleteConfirmFormProps) => {
  const isPending = pending ?? isDeleting ?? false;
  const fields = (
    <AwcProjectDeleteConfirmFields
      projectName={projectName}
      pending={isPending}
      errorMessage={errorMessage}
      showTitle={variant === "dialog"}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
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

export default AwcProjectDeleteConfirmForm;
