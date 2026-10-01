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
    router.replace(`/projects/${encodeURIComponent(input.projectId)}`, {
      scroll: false,
    });
  }, [input.projectId, router]);

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
