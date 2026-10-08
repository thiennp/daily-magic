"use client";

import { useState } from "react";

import { useTaskSkillSuggestions } from "@/features/projects/tasks/useTaskSkillSuggestions";
import { useAwcProjectTasksAssignWriter } from "@/features/projects/tasks/useAwcProjectTasksAssignWriter";
import { useAwcProjectTasksRefOptions } from "@/features/projects/tasks/useAwcProjectTasksRefOptions";
import { runAssignTaskSubmit } from "@/features/projects/tasks/utils/runAssignTaskSubmit";
import { sanitizeProjectTaskGitRefName } from "@/features/projects/tasks/projectTaskGitRefs";
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
export const useAwcProjectTasksAssignForm = (
  input: AwcProjectTasksAssignFormInput,
) => {
  const {
    open,
    projectId,
    hasGit,
    defaultBranch = null,
    branches,
    worktrees,
  } = input;
  const { branchOptions, worktreeOptions } = useAwcProjectTasksRefOptions({
    defaultBranch,
    branches,
    worktrees,
  });
  const peers = useAwcProjectTasksAssignPeers({ open, projectId });
  const writer = useAwcProjectTasksAssignWriter(peers);
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

  const skillSuggestions = useTaskSkillSuggestions({ open, projectId, prompt });
  const trimmedPrompt = prompt.trim();
  const canSubmit =
    !pending &&
    !peers.peersLoading &&
    peers.assistantId.length > 0 &&
    trimmedPrompt.length > 0 &&
    trimmedPrompt.length <= PROJECT_MESSAGE_SUMMARY_MAX_CHARS &&
    !(
      hasGit &&
      createWorktree &&
      !sanitizeProjectTaskGitRefName(newWorktreeName)
    );

  const submit = (): void => {
    if (!canSubmit) return;
    const draft = {
      assigneeMembershipId: peers.assistantId,
      summary: trimmedPrompt,
      ...writer.draftFields,
    };
    runAssignTaskSubmit({ draft, setPending, setError, ...input });
  };

  return {
    ...peers,
    branchOptions,
    worktreeOptions,
    fields: { prompt, branch, worktree, createWorktree, newWorktreeName },
    setters: {
      setPrompt,
      setBranch,
      setWorktree,
      setCreateWorktree,
      setNewWorktreeName,
    },
    trimmedPrompt,
    skillSuggestions,
    writer,
    pending,
    error,
    canSubmit,
    submit,
  };
};
