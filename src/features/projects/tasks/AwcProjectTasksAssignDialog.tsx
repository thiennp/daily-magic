"use client";

import { useState } from "react";

import { AWC_TASKS_PRIMARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_INPUT_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

/**
 * Assign dialog only — no standalone New task page (EN PASS).
 * Branch/Worktree/Create worktree only when project has git.
 */
export default function AwcProjectTasksAssignDialog({
  open,
  hasGit,
  assistants,
  onClose,
  onAssign,
}: {
  readonly open: boolean;
  readonly hasGit: boolean;
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
  readonly onClose: () => void;
  readonly onAssign: (input: {
    readonly assistantId: string;
    readonly prompt: string;
    readonly branch: string | null;
    readonly worktree: string | null;
    readonly createWorktree: boolean;
  }) => void;
}) {
  const [assistantId, setAssistantId] = useState(assistants[0]?.id ?? "");
  const [prompt, setPrompt] = useState("");
  const [branch, setBranch] = useState("");
  const [worktree, setWorktree] = useState("");
  const [createWorktree, setCreateWorktree] = useState(false);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={C.assignTitle}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-awc-border bg-awc-surface p-4 shadow-lg dark:border-gray-700 dark:bg-gray-950">
        <h3 className={PANEL_HEADING_CLASS}>{C.assignTitle}</h3>
        <label className="mt-3 block text-[12px] font-medium text-awc-fg-muted">
          {C.assignAssistant}
          <select
            className={`${PANEL_INPUT_CLASS} mt-1`}
            value={assistantId}
            onChange={(e) => {
              setAssistantId(e.target.value);
            }}
          >
            {assistants.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-[12px] font-medium text-awc-fg-muted">
          {C.assignPrompt}
          <textarea
            className={`${PANEL_INPUT_CLASS} mt-1 min-h-[5rem]`}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </label>
        {hasGit ? (
          <div className="mt-3 flex flex-col gap-2">
            <label className="block text-[12px] font-medium text-awc-fg-muted">
              {C.branch}
              <input
                className={`${PANEL_INPUT_CLASS} mt-1`}
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
              />
            </label>
            <label className="block text-[12px] font-medium text-awc-fg-muted">
              {C.worktree}
              <input
                className={`${PANEL_INPUT_CLASS} mt-1`}
                value={worktree}
                onChange={(e) => {
                  setWorktree(e.target.value);
                }}
              />
            </label>
            <label className="flex items-center gap-2 text-[13px] text-awc-fg dark:text-gray-200">
              <input
                type="checkbox"
                checked={createWorktree}
                onChange={(e) => {
                  setCreateWorktree(e.target.checked);
                }}
              />
              {C.createWorktree}
            </label>
          </div>
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className={PANEL_BUTTON_SECONDARY_CLASS} onClick={onClose}>
            {C.assignCancel}
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={prompt.trim().length === 0 || assistantId.length === 0}
            onClick={() => {
              onAssign({
                assistantId,
                prompt: prompt.trim(),
                branch: hasGit && branch.trim() ? branch.trim() : null,
                worktree: hasGit && worktree.trim() ? worktree.trim() : null,
                createWorktree: hasGit && createWorktree,
              });
              onClose();
            }}
          >
            {C.assignSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}
