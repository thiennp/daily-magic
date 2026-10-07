"use client";

import { useId, useState, type ReactNode } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";

interface ConfirmDestructiveModalProps {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description: string;
  readonly confirmLabel?: string;
  readonly isConfirming?: boolean;
  /** When set, Confirm stays disabled until this exact text is typed. */
  readonly typedConfirmText?: string;
  readonly typedConfirmLabel?: ReactNode;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export default function ConfirmDestructiveModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  isConfirming = false,
  typedConfirmText,
  typedConfirmLabel,
  onClose,
  onConfirm,
}: ConfirmDestructiveModalProps) {
  const typedInputId = useId();
  const [typed, setTyped] = useState("");
  const needsTyped = typedConfirmText !== undefined;
  const typedMatches = !needsTyped || typed.trim() === typedConfirmText;
  const handleClose = (): void => {
    setTyped("");
    onClose();
  };
  const handleConfirm = (): void => {
    setTyped("");
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={false}
      className="max-w-md p-6"
    >
      <h2 className="text-lg font-semibold text-awc-fg dark:text-white/90">
        {title}
      </h2>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        {description}
      </p>
      {needsTyped ? (
        <div className="mt-4 flex flex-col gap-1.5">
          <label
            htmlFor={typedInputId}
            className="text-sm text-awc-fg dark:text-white/90"
          >
            {typedConfirmLabel}
          </label>
          <input
            id={typedInputId}
            value={typed}
            autoComplete="off"
            autoFocus
            onChange={(event) => {
              setTyped(event.target.value);
            }}
            className="rounded-lg border border-awc-border px-3 py-2 text-sm"
          />
        </div>
      ) : null}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={handleClose} disabled={isConfirming}>
          Cancel
        </Button>
        <Button
          variant="outline"
          className="border-error-200 text-error-700 hover:bg-error-50 dark:border-error-900/50 dark:text-error-300 dark:hover:bg-error-950/30"
          disabled={isConfirming || !typedMatches}
          onClick={handleConfirm}
        >
          {isConfirming ? "Working…" : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
