"use client";

import { useId } from "react";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_FIELD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useAwcProjectRename from "@/features/projects/hooks/useAwcProjectRename";
import { PROJECT_PAGE_SETTINGS_COPY as C } from "@/features/projects/projectPageSettingsCopy.constant";

interface AwcProjectSettingsNameSectionProps {
  readonly projectId: string;
  readonly initialName: string;
  readonly startInEditMode: boolean;
  readonly canEdit: boolean;
}

/** Settings · Project name — always-visible input + Save name (Cloud rename API). */
export default function AwcProjectSettingsNameSection({
  projectId,
  initialName,
  startInEditMode,
  canEdit,
}: AwcProjectSettingsNameSectionProps) {
  const inputId = useId();
  const rename = useAwcProjectRename({
    projectId,
    initialName,
    startInEditMode: canEdit ? true : startInEditMode,
  });

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-name-h">
      <h3
        id="p-set-name-h"
        className="text-[13px] font-semibold text-gray-500 dark:text-gray-400"
      >
        {C.nameHeading}
      </h3>
      {!canEdit ? (
        <p className="px-3.5 py-2 text-sm text-gray-800 dark:text-white/90">
          {rename.name}
        </p>
      ) : (
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void rename.saveDraft();
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            {C.nameSr}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={rename.inputRef}
              id={inputId}
              type="text"
              value={rename.draft}
              onChange={(event) => {
                rename.setDraft(event.target.value);
              }}
              className={`${APP_SURFACE_FIELD_CLASS} min-w-0 flex-1`}
              autoComplete="off"
              disabled={rename.isSaving}
            />
            <Button type="submit" size="sm" disabled={rename.isSaving}>
              {rename.isSaving ? C.nameSaving : C.nameSave}
            </Button>
          </div>
          {rename.errorMessage !== null ? (
            <p
              className="text-sm text-error-600 dark:text-error-400"
              role="alert"
            >
              {rename.errorMessage}
            </p>
          ) : null}
        </form>
      )}
      <p className="text-[13px] text-gray-500 dark:text-gray-400">{C.nameNote}</p>
    </section>
  );
}
