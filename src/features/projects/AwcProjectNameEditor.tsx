"use client";

import { useId } from "react";

import Button from "@/components/ui/button/Button";
import useAwcProjectRename from "@/features/projects/hooks/useAwcProjectRename";
import {
  APP_SURFACE_FIELD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectNameEditorProps {
  readonly projectId: string;
  readonly initialName: string;
  readonly startInEditMode: boolean;
}

const AwcProjectNameEditor = ({
  projectId,
  initialName,
  startInEditMode,
}: AwcProjectNameEditorProps) => {
  const inputId = useId();
  const rename = useAwcProjectRename({
    projectId,
    initialName,
    startInEditMode,
  });
  const {
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
  } = rename;

  if (!isEditing) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>{name}</h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={startEditing}
        >
          Rename
        </Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        void saveDraft();
      }}
    >
      {startInEditMode && isEditing ? (
        <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
          Rename mode — from AgentWitch Local or the card menu. Press Escape to
          cancel.
        </p>
      ) : null}
      <label htmlFor={inputId} className="text-xs font-medium text-awc-fg-muted">
        Project name
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
        }}
        className={APP_SURFACE_FIELD_CLASS}
        autoComplete="off"
        disabled={isSaving}
      />
      {errorMessage !== null ? (
        <p
          className="text-sm text-error-600 dark:text-error-400"
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" size="sm" disabled={isSaving}>
          {isSaving ? "Saving…" : "Save name"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isSaving}
          onClick={cancelEditing}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AwcProjectNameEditor;
