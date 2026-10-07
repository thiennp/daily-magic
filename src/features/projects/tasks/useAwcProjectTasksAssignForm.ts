"use client";

import { useMemo, useState } from "react";

import { sendMessengerTask } from "@/features/projects/messenger/utils/sendMessengerTask";
import {
  buildProjectTaskBranchOptions,
  buildProjectTaskWorktreeOptions,
  sanitizeProjectTaskGitRefName,
} from "@/features/projects/tasks/projectTaskGitRefs";
import { useAwcProjectTasksAssignPeers } from "@/features/projects/tasks/useAwcProjectTasksAssignPeers";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

export type AwcProjectTasksAssignFormInput = {
  readonly open: boolean;
  readonly projectId: string;
  readonly hasGit: boolean;
  readonly defaultBranch?: string | null;
  readonly branches?: readonly string[];
  readonly worktrees?: readonly string[];
  readonly onClose: () => void;
  readonly onAssigned: () => void;
};

/** Assign dialog form: fields, open seed, validation, submit (task.assign). */
export const useAwcProjectTasksAssignForm = (input: AwcProjectTasksAssignFormInput) => {
  const { open, projectId, hasGit, defaultBranch = null, branches, worktrees } = input;
  const branchOptions = useMemo(
    () => buildProjectTaskBranchOptions({ defaultBranch: defaultBranch ?? null, branches }),
    [defaultBranch, branches],
  );
  const worktreeOptions = useMemo(
    () => buildProjectTaskWorktreeOptions({ worktrees }),
    [worktrees],
  );
  const peers = useAwcProjectTasksAssignPeers({ open, projectId });
  const [prompt, setPrompt] = useState("");
  const [branch, setBranch] = useState("");
  const [worktree, setWorktree] = useState("");
  const [createWorktree, setCreateWorktree] = useState(false);
  const [newWorktreeName, setNewWorktreeName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Seed the form when the dialog opens (or its project changes while open):
  // render-time reset instead of setState in the load effect.
  const [seededFor, setSeededFor] = useState({ open: false, projectId });
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
      peers.resetPeers();
    }
  }

  const trimmedPrompt = prompt.trim();
  const summaryTooLarge = trimmedPrompt.length > PROJECT_MESSAGE_SUMMARY_MAX_CHARS;
  const createWorktreeInvalid =
    hasGit && createWorktree && sanitizeProjectTaskGitRefName(newWorktreeName) === null;
  const canSubmit =
    !pending &&
    !peers.peersLoading &&
    peers.peers.length > 0 &&
    peers.assistantId.length > 0 &&
    trimmedPrompt.length > 0 &&
    !summaryTooLarge &&
    !createWorktreeInvalid;

  const submit = (): void => {
    if (!canSubmit || pending) return;
    setPending(true);
    setError(null);
    void sendMessengerTask({
      projectId,
      draft: { assigneeMembershipId: peers.assistantId, summary: trimmedPrompt },
    }).then((result) => {
      setPending(false);
      if (!result.ok) {
        setError(result.errorMessage);
        return;
      }
      input.onAssigned();
      input.onClose();
    });
  };

  return {
    ...peers,
    branchOptions,
    worktreeOptions,
    fields: { prompt, branch, worktree, createWorktree, newWorktreeName },
    setters: { setPrompt, setBranch, setWorktree, setCreateWorktree, setNewWorktreeName },
    trimmedPrompt,
    pending,
    error,
    canSubmit,
    submit,
  };
};
