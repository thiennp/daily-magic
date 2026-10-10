"use client";

import { useId } from "react";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_FIELD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import useAwcProjectDefinitionOfDone from "@/features/projects/hooks/useAwcProjectDefinitionOfDone";
import { PROJECT_PAGE_SETTINGS_COPY as C } from "@/features/projects/public-api/types";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/public-api/types";
import { DEFINITION_OF_DONE_MAX_CHARS } from "@/lib/projects/definitionOfDone/parseDefinitionOfDoneBody";

/** Settings · Definition of done — owner edits, members and viewers read. */
export default function AwcProjectSettingsDefinitionOfDone({
  projectId,
  canEdit,
}: {
  readonly projectId: string;
  readonly canEdit: boolean;
}) {
  const fieldId = useId();
  const { saved, draft, setDraft, loadState, isSaving, errorMessage, save } =
    useAwcProjectDefinitionOfDone(projectId);
  const dirty = draft.trim() !== saved;

  return (
    <section
      className={`flex flex-col gap-3 ${CARD}`}
      aria-labelledby="p-set-dod-h"
    >
      <h3
        id="p-set-dod-h"
        className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.dodHeading}
      </h3>
      {loadState === "loading" ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          {C.dodLoading}
        </p>
      ) : null}
      {loadState === "failed" ? (
        <p className="text-sm text-error-600 dark:text-error-400" role="alert">
          {C.dodLoadFailed}
        </p>
      ) : null}
      {loadState === "ready" && !canEdit ? (
        <p className="whitespace-pre-wrap px-3.5 py-2 text-sm text-awc-fg dark:text-white/90">
          {saved === "" ? C.dodEmptyReadOnly : saved}
        </p>
      ) : null}
      {loadState === "ready" && canEdit ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
        >
          <label htmlFor={fieldId} className="sr-only">
            {C.dodHeading}
          </label>
          <textarea
            id={fieldId}
            value={draft}
            rows={3}
            maxLength={DEFINITION_OF_DONE_MAX_CHARS}
            placeholder={C.dodPlaceholder}
            onChange={(event) => {
              setDraft(event.target.value);
            }}
            className={`${APP_SURFACE_FIELD_CLASS} w-full`}
            readOnly={isSaving}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] text-awc-fg-muted dark:text-gray-400">
              {draft.length}/{DEFINITION_OF_DONE_MAX_CHARS}
            </span>
            <Button type="submit" size="sm" disabled={isSaving || !dirty}>
              {isSaving ? C.nameSaving : C.dodSave}
            </Button>
          </div>
          {errorMessage !== null ? (
            <p
              className="text-sm text-error-600 dark:text-error-400"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
        </form>
      ) : null}
      <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
        {C.dodNote}
      </p>
    </section>
  );
}
