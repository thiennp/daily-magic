"use client";

import { useEffect, useMemo, useState } from "react";

import {
  inboxDispatchPeerOptions,
  type InboxDispatchPeerOption,
} from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";
import { fetchProjectAccess } from "@/features/projects/access/utils/fetchProjectAccess";
import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";
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
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Assign dialog — Screen D (EN PASS). Submits via existing
 * POST /api/projects/:id/inbox/dispatch (sendMessengerTask → task.assign).
 * Branch/Worktree UI stays meta-only (names); allowlisted refs do not include
 * branch/worktree, so they are not POSTed (no new schema on this tip).
 */
export default function AwcProjectTasksAssignDialog({
  open,
  projectId,
  hasGit,
  defaultBranch = null,
  branches,
  worktrees,
  onClose,
  onAssigned,
}: {
  readonly open: boolean;
  readonly projectId: string;
  readonly hasGit: boolean;
  readonly defaultBranch?: string | null;
  readonly branches?: readonly string[];
  readonly worktrees?: readonly string[];
  readonly onClose: () => void;
  readonly onAssigned: () => void;
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

  const [peers, setPeers] = useState<readonly InboxDispatchPeerOption[]>([]);
  const [peersLoading, setPeersLoading] = useState(false);
  const [peersError, setPeersError] = useState<string | null>(null);
  const [assistantId, setAssistantId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [branch, setBranch] = useState("");
  const [worktree, setWorktree] = useState("");
  const [createWorktree, setCreateWorktree] = useState(false);
  const [newWorktreeName, setNewWorktreeName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Seed the form when the dialog opens (or its project changes while open):
  // render-time reset instead of setState in the load effect.
  const [seededFor, setSeededFor] = useState<{
    readonly open: boolean;
    readonly projectId: string;
  }>({ open: false, projectId });
  if (seededFor.open !== open || seededFor.projectId !== projectId) {
    setSeededFor({ open, projectId });
    if (open) {
      setPrompt("");
      setBranch(branchOptions[0]?.id ?? "");
      setWorktree("");
      setCreateWorktree(false);
      setNewWorktreeName("");
      setPending(false);
      setError(null);
      setPeersError(null);
      setPeers([]);
      setAssistantId("");
      setPeersLoading(true);
    }
  }

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    void fetchProjectAccess(projectId)
      .then((access) => {
        if (cancelled) return;
        if (!access.ok || access.members === undefined) {
          setPeersError(C.assignPeersLoadFailed);
          setPeersLoading(false);
          return;
        }
        const next = inboxDispatchPeerOptions(access.members);
        setPeers(next);
        setAssistantId(next[0]?.membershipId ?? "");
        setPeersLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setPeersError(C.assignPeersLoadFailed);
        setPeersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, projectId]);

  if (!open) return null;

  const trimmedPrompt = prompt.trim();
  const summaryTooLarge = trimmedPrompt.length > PROJECT_MESSAGE_SUMMARY_MAX_CHARS;
  const createWorktreeInvalid =
    hasGit &&
    createWorktree &&
    sanitizeProjectTaskGitRefName(newWorktreeName) === null;
  const canSubmit =
    !pending &&
    !peersLoading &&
    peers.length > 0 &&
    assistantId.length > 0 &&
    trimmedPrompt.length > 0 &&
    !summaryTooLarge &&
    !createWorktreeInvalid;

  const submit = (): void => {
    if (!canSubmit || pending) return;
    setPending(true);
    setError(null);
    void sendMessengerTask({
      projectId,
      draft: {
        assigneeMembershipId: assistantId,
        summary: trimmedPrompt,
      },
    }).then((result) => {
      setPending(false);
      if (!result.ok) {
        setError(result.errorMessage);
        return;
      }
      onAssigned();
      onClose();
    });
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
            disabled={pending}
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
              disabled={pending || peersLoading || peers.length === 0}
              onChange={(e) => {
                setAssistantId(e.target.value);
              }}
            >
              {peersLoading ? (
                <option value="">{C.assignPeersLoading}</option>
              ) : peers.length === 0 ? (
                <option value="">{C.assignPeersEmpty}</option>
              ) : (
                peers.map((p) => (
                  <option key={p.membershipId} value={p.membershipId}>
                    {p.projectDisplayName}
                  </option>
                ))
              )}
            </select>
          </label>
          <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
            <span>{C.assignPrompt}</span>
            <textarea
              className={`${AWC_TASKS_INPUT_CLASS} min-h-[5rem] font-normal`}
              value={prompt}
              disabled={pending}
              maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <span className="text-[12px] font-normal text-awc-fg-subtle">
              {C.assignSummaryCounter(trimmedPrompt.length)}
            </span>
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
          ) : null}
          {peersError !== null ? (
            <p role="alert" className="mt-2 text-[13px] text-red-600">
              {peersError}
            </p>
          ) : null}
          {error !== null ? (
            <p role="alert" className="mt-2 text-[13px] text-red-600">
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
            {C.assignCancel}
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={!canSubmit}
            onClick={submit}
          >
            {pending ? C.assignPending : C.assignSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}
