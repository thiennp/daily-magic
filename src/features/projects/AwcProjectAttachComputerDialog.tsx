"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectComputerChoices from "@/features/projects/AwcProjectComputerChoices";
import { attachProjectComputer } from "@/features/projects/utils/public-api/presentation";
import {
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";

interface AwcProjectAttachComputerDialogProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly onClose: () => void;
}

/** Owner picks one of their paired computers to bind to the project. */
export default function AwcProjectAttachComputerDialog({
  projectId,
  projectName,
  onClose,
}: AwcProjectAttachComputerDialogProps) {
  const router = useRouter();
  const titleId = useId();
  const { devices, isLoading } = useMyMacDevices();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    if (selectedId === null) {
      return;
    }
    setPending(true);
    setError(null);
    const failure = await attachProjectComputer(projectId, selectedId);
    setPending(false);
    if (failure !== null) {
      setError(failure);
      return;
    }
    onClose();
    router.refresh();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-awc-border-strong bg-awc-surface shadow-[0_12px_32px_rgba(16,24,40,0.18)]">
        <div className="flex flex-col gap-3 px-4 py-4">
          <h3
            id={titleId}
            className="m-0 text-[16px] font-semibold text-awc-fg"
          >
            Attach a computer to {projectName}
          </h3>
          <AwcProjectComputerChoices
            devices={devices}
            isLoading={isLoading}
            selectedId={selectedId}
            disabled={pending}
            onSelect={setSelectedId}
          />
          {error !== null ? (
            <p role="alert" className="m-0 text-[13px] text-red-600">
              {error}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2 border-t border-awc-border bg-awc-surface-2 px-4 py-3">
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            disabled={pending}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={pending || selectedId === null}
            onClick={() => void submit()}
          >
            {pending ? "Attaching…" : "Attach"}
          </button>
        </div>
      </div>
    </div>
  );
}
