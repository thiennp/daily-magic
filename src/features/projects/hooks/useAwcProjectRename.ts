"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import patchUserProjectName from "@/features/projects/utils/patchUserProjectName";

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

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelEditing();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [cancelEditing, isEditing]);

  const saveDraft = useCallback(async (): Promise<void> => {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      setErrorMessage("Enter a project name.");
      return;
    }

    if (trimmed === name) {
      setIsEditing(false);
      setErrorMessage(null);
      clearRenameQuery();
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    const result = await patchUserProjectName(input.projectId, trimmed);
    setIsSaving(false);

    if (result.kind === "error") {
      setErrorMessage(result.message);
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
