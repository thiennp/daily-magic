"use client";

import {
  AWC_TASKS_INPUT_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskGitRefOption } from "@/features/projects/tasks/projectTaskGitRefs";
import type { useAwcProjectTasksAssignForm } from "@/features/projects/tasks/useAwcProjectTasksAssignForm";

type AssignForm = ReturnType<typeof useAwcProjectTasksAssignForm>;

/** Assign dialog Git block: branch / worktree pickers + new worktree name (meta only). */
export default function AwcProjectTasksAssignGitFields({
  form,
}: {
  readonly form: AssignForm;
}) {
  const { branchOptions, worktreeOptions, pending } = form;
  const { branch, worktree, createWorktree, newWorktreeName } = form.fields;
  const { setBranch, setWorktree, setCreateWorktree, setNewWorktreeName } =
    form.setters;
  return (
    <fieldset className="mb-1 rounded-lg border border-awc-border bg-awc-surface-2 px-3 pb-0.5 pt-3">
      <legend className={`${AWC_TASKS_PANEL_HEADING_CLASS} px-1.5`}>Git</legend>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
          <span>{C.branch}</span>
          <select
            className={`${AWC_TASKS_INPUT_CLASS} font-normal`}
            value={branch}
            aria-label={C.branch}
            disabled={pending}
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
            disabled={pending || createWorktree}
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
          disabled={pending}
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
            disabled={pending}
            onChange={(e) => {
              setNewWorktreeName(e.target.value);
            }}
          />
        </label>
      ) : null}
      <p className="mb-3 text-[12px] font-normal text-awc-fg-subtle">
        {C.assignGitMetaHint}
      </p>
    </fieldset>
  );
}
