"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PANEL_INPUT_CLASS } from "@/features/projects/projectPagePanelChrome.constant";

export interface ProjectLibrarySkillDraft {
  readonly name: string;
  readonly description: string;
  readonly body: string;
}

interface AwcProjectLibrarySkillFieldsProps {
  readonly draft: ProjectLibrarySkillDraft;
  readonly onChange: (draft: ProjectLibrarySkillDraft) => void;
}

/** Name · short description · content, sr-only labels + Product placeholders. */
export default function AwcProjectLibrarySkillFields({
  draft,
  onChange,
}: AwcProjectLibrarySkillFieldsProps) {
  const id = useId();

  return (
    <>
      <label htmlFor={`${id}-name`} className="sr-only">
        {A["library.skills.name.sr"]}
      </label>
      <input
        id={`${id}-name`}
        value={draft.name}
        maxLength={120}
        placeholder={A["library.skills.name.placeholder"]}
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
        {A["library.skills.body.sr"]}
      </label>
      <textarea
        id={`${id}-body`}
        value={draft.body}
        placeholder={A["library.skills.body.placeholder"]}
        className={`${PANEL_INPUT_CLASS} min-h-32 font-mono`}
        onChange={(event) => onChange({ ...draft, body: event.target.value })}
      />
    </>
  );
}
