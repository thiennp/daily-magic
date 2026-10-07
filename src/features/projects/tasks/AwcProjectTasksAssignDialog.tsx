"use client";

import { useMemo, useState } from "react";

import {
  AWC_TASKS_INPUT_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
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
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-awc-border-strong bg-awc-surface shadow-[0_12px_32px_rgba(16,24,40,0.18)]">
        <div className="flex items-center gap-2 border-b border-awc-border px-4 py-3.5">
          <h3 className="m-0 flex-1 text-[16px] font-semibold text-awc-fg">{C.assignTitle}</h3>
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto px-4 py-4">
          <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
            <span>{C.assignAssistant}</span>
            <select
              className={AWC_TASKS_INPUT_CLASS}
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
          <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
            <span>{C.assignPrompt}</span>
            <textarea
              className={`${AWC_TASKS_INPUT_CLASS} min-h-[5rem] font-normal`}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </label>
          {hasGit ? (
            <fieldset className="mb-1 rounded-lg border border-awc-border bg-awc-surface-2 px-3 pb-0.5 pt-3">
              <legend className={`${AWC_TASKS_PANEL_HEADING_CLASS} px-1.5`}>
                Git
              </legend>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
                  <span>{C.branch}</span>
                  <select
                    className={`${AWC_TASKS_INPUT_CLASS} font-normal`}
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
                <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
                  <span>{C.worktree}</span>
                  <select
                    className={`${AWC_TASKS_INPUT_CLASS} font-normal`}
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
              <label className="mb-3 flex cursor-pointer items-center gap-2 text-[13.5px] text-awc-fg">
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
                <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
                  <span>{C.worktreeName}</span>
                  <input
                    className={`${AWC_TASKS_INPUT_CLASS} font-normal`}
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
        </div>
        <div className="flex justify-end gap-2 border-t border-awc-border bg-awc-surface-2 px-4 py-3">
          <button type="button" className={AWC_TASKS_SECONDARY_BUTTON_CLASS} onClick={onClose}>
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
