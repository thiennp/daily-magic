"use client";

import { useMemo, useState } from "react";

import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_INPUT_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { AWC_TASKS_PRIMARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import {
  buildProjectTaskBranchOptions,
  buildProjectTaskWorktreeOptions,
  sanitizeProjectTaskGitRefName,
  type ProjectTaskGitRefOption,
} from "@/features/projects/tasks/projectTaskGitRefs";

/**
 * Assign dialog only — no standalone New task page (EN PASS / UI Box chrome).
 * Screen D: Branch/Worktree/Create worktree only when project has git.
 * Meta refs only (names); local paths never enter assign payload / Neon meta.
 */
export default function AwcProjectTasksAssignDialog({
  open,
  hasGit,
  assistants,
  defaultBranch = null,
  branches,
  worktrees,
  onClose,
  onAssign,
}: {
  readonly open: boolean;
  readonly hasGit: boolean;
  readonly assistants: readonly { readonly id: string; readonly name: string }[];
  readonly defaultBranch?: string | null;
  readonly branches?: readonly string[];
  readonly worktrees?: readonly string[];
  readonly onClose: () => void;
  readonly onAssign: (input: {
    readonly assistantId: string;
    readonly prompt: string;
    readonly branch: string | null;
    readonly worktree: string | null;
    readonly createWorktree: boolean;
  }) => void;
}) {
  const branchOptions = useMemo(
    () =>
      buildProjectTaskBranchOptions({
        defaultBranch: defaultBranch ?? null,
        branches,
      }),
    [defaultBranch, branches],
  );
  const worktreeOptions = useMemo(
    () => buildProjectTaskWorktreeOptions({ worktrees }),
    [worktrees],
  );

  const [assistantId, setAssistantId] = useState(assistants[0]?.id ?? "");
  const [prompt, setPrompt] = useState("");
  const [branch, setBranch] = useState(branchOptions[0]?.id ?? "");
  const [worktree, setWorktree] = useState("");
  const [createWorktree, setCreateWorktree] = useState(false);
  const [newWorktreeName, setNewWorktreeName] = useState("");

  if (!open) return null;

  const resolveWorktree = (): string | null => {
    if (!hasGit) return null;
    if (createWorktree) {
      return sanitizeProjectTaskGitRefName(newWorktreeName);
    }
    return sanitizeProjectTaskGitRefName(worktree);
  };

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
          <fieldset className="mt-3 rounded-xl border border-awc-border px-3 py-2.5 dark:border-gray-700">
            <legend className="px-1 text-[12px] font-medium text-awc-fg-muted">
              Git
            </legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label className="block text-[12px] font-medium text-awc-fg-muted">
                {C.branch}
                <select
                  className={`${PANEL_INPUT_CLASS} mt-1`}
                  value={branch}
                  aria-label={C.branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                >
                  {branchOptions.map((opt: ProjectTaskGitRefOption) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[12px] font-medium text-awc-fg-muted">
                {C.worktree}
                <select
                  className={`${PANEL_INPUT_CLASS} mt-1`}
                  value={worktree}
                  disabled={createWorktree}
                  aria-label={C.worktree}
                  onChange={(e) => {
                    setWorktree(e.target.value);
                  }}
                >
                  <option value="">{C.worktreeNone}</option>
                  {worktreeOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-2 flex items-center gap-2 text-[13px] text-awc-fg dark:text-gray-200">
              <input
                type="checkbox"
                checked={createWorktree}
                onChange={(e) => {
                  setCreateWorktree(e.target.checked);
                }}
              />
              {C.createWorktree}
            </label>
            {createWorktree ? (
              <label className="mt-2 block text-[12px] font-medium text-awc-fg-muted">
                {C.worktreeName}
                <input
                  className={`${PANEL_INPUT_CLASS} mt-1`}
                  value={newWorktreeName}
                  placeholder="wt-csv-export"
                  aria-label={C.worktreeName}
                  onChange={(e) => {
                    setNewWorktreeName(e.target.value);
                  }}
                />
              </label>
            ) : null}
          </fieldset>
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" className={PANEL_BUTTON_SECONDARY_CLASS} onClick={onClose}>
            {C.assignCancel}
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={
              prompt.trim().length === 0 ||
              assistantId.length === 0 ||
              (hasGit &&
                createWorktree &&
                sanitizeProjectTaskGitRefName(newWorktreeName) === null)
            }
            onClick={() => {
              onAssign({
                assistantId,
                prompt: prompt.trim(),
                branch: hasGit ? sanitizeProjectTaskGitRefName(branch) : null,
                worktree: resolveWorktree(),
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
