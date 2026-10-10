"use client";

import { useId } from "react";

import {
  PROJECT_LIBRARY_AUTHOR_COPY,
  type ProjectLibraryAuthorKind,
} from "@/features/projects/library/projectLibraryAuthorCopy.constant";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PANEL_INPUT_CLASS } from "@/features/projects/public-api/types";

export interface ProjectLibrarySkillDraft {
  readonly name: string;
  readonly description: string;
  readonly body: string;
}

interface AwcProjectLibrarySkillFieldsProps {
  readonly draft: ProjectLibrarySkillDraft;
  readonly kind?: ProjectLibraryAuthorKind;
  readonly onChange: (draft: ProjectLibrarySkillDraft) => void;
}

/** Name · short description · content, sr-only labels + Product placeholders. */
export default function AwcProjectLibrarySkillFields({
  draft,
  kind = "skill",
  onChange,
}: AwcProjectLibrarySkillFieldsProps) {
  const id = useId();
  const K = PROJECT_LIBRARY_AUTHOR_COPY[kind];

  return (
    <>
      <label htmlFor={`${id}-name`} className="sr-only">
        {K.nameSr}
      </label>
      <input
        id={`${id}-name`}
        value={draft.name}
        maxLength={120}
        placeholder={K.namePlaceholder}
        className={PANEL_INPUT_CLASS}
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
      />
      <label htmlFor={`${id}-desc`} className="sr-only">
        {A["library.skills.desc.sr"]}
      </label>
      <input
        id={`${id}-desc`}
        value={draft.description}
        maxLength={500}
        placeholder={A["library.skills.desc.placeholder"]}
        className={PANEL_INPUT_CLASS}
        onChange={(event) =>
          onChange({ ...draft, description: event.target.value })
        }
      />
      <label htmlFor={`${id}-body`} className="sr-only">
        {K.bodySr}
      </label>
      <textarea
        id={`${id}-body`}
        value={draft.body}
        placeholder={K.bodyPlaceholder}
        className={`${PANEL_INPUT_CLASS} min-h-32 font-mono`}
        onChange={(event) => onChange({ ...draft, body: event.target.value })}
      />
    </>
  );
}
