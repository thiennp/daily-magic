"use client";

import { useState } from "react";

import {
  measureProjectSkillBodyBytes,
  PROJECT_SKILL_MAX_BODY_BYTES,
} from "@/features/project-skill-share/public-api/presentation";
import {
  PROJECT_LIBRARY_AUTHOR_COPY,
  type ProjectLibraryAuthorKind,
} from "@/features/projects/library/projectLibraryAuthorCopy.constant";
import AwcProjectLibrarySkillFields from "@/features/projects/library/AwcProjectLibrarySkillFields";
import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import type { AwcProjectLibraryState } from "@/features/projects/library/useAwcProjectLibrary";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/public-api/types";
import { fillProjectPageCopy } from "@/features/projects/utils/public-api/presentation";

interface AwcProjectLibrarySkillFormProps {
  readonly skills: AwcProjectLibraryState["skills"];
  readonly kind?: ProjectLibraryAuthorKind;
  readonly onDone: (toast: string | null) => void;
}

/** New → Skill / Add playbook: project skill form by kind (same publish rules). */
export default function AwcProjectLibrarySkillForm({
  skills,
  kind = "skill",
  onDone,
}: AwcProjectLibrarySkillFormProps) {
  const [draft, setDraft] = useState({ name: "", description: "", body: "" });
  const [failed, setFailed] = useState(false);
  const bytes = measureProjectSkillBodyBytes(draft.body);
  const canSubmit =
    !skills.busy &&
    bytes <= PROJECT_SKILL_MAX_BODY_BYTES &&
    draft.name.trim() !== "" &&
    draft.body.trim() !== "";
  const K = PROJECT_LIBRARY_AUTHOR_COPY[kind];
  const liveCount = skills.skills.filter(
    (skill) => skill.state !== "revoked" && skill.kind === kind,
  ).length;

  const submit = async (asDraft: boolean): Promise<void> => {
    const description = draft.description.trim();
    const ok = await skills.publish({
      name: draft.name.trim(),
      ...(description === "" ? {} : { description }),
      body: draft.body,
      asDraft,
      kind,
    });
    setFailed(!ok);
    if (ok)
      onDone(
        asDraft ? A["library.save_draft.toast"] : A["library.publish.toast"],
      );
  };

  return (
    <form
      className="flex min-w-0 flex-col gap-2 px-1"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(false);
      }}
    >
      <div className="flex items-baseline gap-2">
        <h4 className={PANEL_HEADING_CLASS}>{K.heading}</h4>
        <span className={PANEL_INTRO_CLASS}>
          {fillProjectPageCopy(K.count, { n: liveCount })}
        </span>
      </div>
      {liveCount === 0 ? <p className={PANEL_INTRO_CLASS}>{K.empty}</p> : null}
      <AwcProjectLibrarySkillFields
        draft={draft}
        kind={kind}
        onChange={setDraft}
      />
      <p className={PANEL_INTRO_CLASS} aria-live="polite">
        {fillProjectPageCopy(A["library.skills.size"], {
          used: Math.ceil(bytes / 1024),
        })}
      </p>
      {failed && skills.message !== null ? (
        <p role="alert" className={PANEL_STATUS_CLASS}>
          {skills.message}
        </p>
      ) : null}
      <span className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className={PANEL_BUTTON_PRIMARY_CLASS}
        >
          {A["library.publish"]}
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={() => void submit(true)}
        >
          {A["library.save_draft"]}
        </button>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={() => onDone(null)}
        >
          {A["library.add_from.cancel"]}
        </button>
      </span>
    </form>
  );
}
