"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, type RefObject } from "react";

import saveAwcProjectRenameDraft from "@/features/projects/hooks/saveAwcProjectRenameDraft";
import useAwcProjectRenameEditKeyboard from "@/features/projects/hooks/useAwcProjectRenameEditKeyboard";

const useAwcProjectRename = (input: {
  readonly projectId: string;
  readonly initialName: string;
  readonly startInEditMode: boolean;
}): {
  readonly inputRef: RefObject<HTMLInputElement | null>;
  readonly isEditing: boolean;
  readonly name: string;
  readonly draft: string;
  readonly setDraft: (value: string) => void;
  readonly isSaving: boolean;
  readonly errorMessage: string | null;
  readonly startEditing: () => void;
  readonly cancelEditing: () => void;
  readonly saveDraft: () => Promise<void>;
} => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(input.startInEditMode);
  const [name, setName] = useState(input.initialName);
  const [draft, setDraft] = useState(input.initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const renamePropsKey = `${input.initialName}\0${input.startInEditMode}`;
  const [lastRenamePropsKey, setLastRenamePropsKey] = useState(renamePropsKey);
  if (lastRenamePropsKey !== renamePropsKey) {
    setLastRenamePropsKey(renamePropsKey);
    setName(input.initialName);
    setDraft(input.initialName);
    if (input.startInEditMode) {
      setIsEditing(true);
      setErrorMessage(null);
    }
  }

  const clearRenameQuery = useCallback((): void => {
    // DF-015: drop `?rename=` in place (Next syncs history.replaceState into
    // the router, like the #tab hash in useAwcProjectDetailTab). The old
    // router.replace ran on every Save/Cancel, dropped the #tab hash, and a
    // search change re-keys the page segment → whole panel remount.
    if (!new URLSearchParams(window.location.search).has("rename")) {
      return;
    }
    window.history.replaceState(
      null,
      "",
      `/projects/${encodeURIComponent(input.projectId)}${window.location.hash}`,
    );
  }, [input.projectId]);

  const startEditing = useCallback((): void => {
    setDraft(name);
    setIsEditing(true);
    setErrorMessage(null);
  }, [name]);

  const cancelEditing = useCallback((): void => {
    setDraft(name);
    setIsEditing(false);
    setErrorMessage(null);
    clearRenameQuery();
  }, [clearRenameQuery, name]);

  useAwcProjectRenameEditKeyboard(isEditing, cancelEditing, inputRef);

  const saveDraft = useCallback(async (): Promise<void> => {
    setIsSaving(true);
    setErrorMessage(null);

    const result = await saveAwcProjectRenameDraft({
      projectId: input.projectId,
      draft,
      currentName: name,
    });
    setIsSaving(false);

    if (result.kind === "validation" || result.kind === "error") {
      setErrorMessage(result.message);
      return;
    }

    if (result.kind === "unchanged") {
      setIsEditing(false);
      setErrorMessage(null);
      clearRenameQuery();
      return;
    }

    setName(result.name);
    setDraft(result.name);
    setIsEditing(false);
    clearRenameQuery();
    router.refresh();
  }, [clearRenameQuery, draft, input.projectId, name, router]);

  return {
    inputRef,
    isEditing,
    name,
    draft,
    setDraft,
    isSaving,
    errorMessage,
    startEditing,
    cancelEditing,
    saveDraft,
  };
};

export default useAwcProjectRename;
