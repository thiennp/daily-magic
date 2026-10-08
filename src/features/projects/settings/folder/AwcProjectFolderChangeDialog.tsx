"use client";

import { useEffect, useId, useRef } from "react";

import { useProjectFolderChange } from "@/features/projects/settings/folder/useProjectFolderChange";
import {
  AWC_TASKS_INPUT_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";

interface Props {
  readonly projectId: string;
  readonly wakePort: number;
  readonly computerName: string;
  readonly initialPath: string;
  readonly onClose: () => void;
  readonly onLinked: () => void;
}

/** Typed-path folder change, validated on the project's computer through the local bridge. */
export default function AwcProjectFolderChangeDialog(props: Props) {
  const { computerName, onClose } = props;
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useProjectFolderChange(props);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
            Change project folder
          </h3>
          <label className="flex flex-col gap-1 text-[13px] text-awc-fg-muted">
            Full folder path on {computerName}
            <input
              ref={inputRef}
              value={form.folderPath}
              disabled={form.pending}
              placeholder="/Users/you/baby-care"
              spellCheck={false}
              className={`${AWC_TASKS_INPUT_CLASS} font-mono`}
              onChange={(event) => form.setFolderPath(event.target.value)}
            />
          </label>
          <label className="flex items-start gap-2 text-[13px] text-awc-fg">
            <input
              type="checkbox"
              checked={form.allowOutsideHome}
              disabled={form.pending}
              className="mt-0.5"
              onChange={(event) =>
                form.setAllowOutsideHome(event.target.checked)
              }
            />
            <span>
              Allow outside home
              <span className="block text-awc-fg-muted">
                Assistants will be able to read and change files in that folder,
                even though it is outside your home folder.
              </span>
            </span>
          </label>
          {form.error !== null ? (
            <p role="alert" className="m-0 text-[13px] text-red-600">
              {form.error}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2 border-t border-awc-border bg-awc-surface-2 px-4 py-3">
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            disabled={form.pending}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={form.pending || form.folderPath.trim().length === 0}
            onClick={() => void form.submit()}
          >
            {form.pending ? "Checking…" : "Use this folder"}
          </button>
        </div>
      </div>
    </div>
  );
}
