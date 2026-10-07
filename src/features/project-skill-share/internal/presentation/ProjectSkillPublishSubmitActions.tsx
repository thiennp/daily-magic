"use client";

import { useId } from "react";

import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface Props {
  readonly busy: boolean;
  readonly canSubmit: boolean;
  /** false for members: Publish disabled with the owner-only hint. */
  readonly canPublish: boolean;
  readonly onSaveDraft: () => void;
}

/** Publish (owner) + Save draft (owner or member) buttons. */
export default function ProjectSkillPublishSubmitActions({
  busy,
  canSubmit,
  canPublish,
  onSaveDraft,
}: Props) {
  const copy = PROJECT_SKILLS_COPY;
  const reasonId = useId();
  return (
    <span className="flex flex-col items-start gap-0.5">
      <span className="flex flex-wrap gap-2">
        <button
          type={canPublish ? "submit" : "button"}
          disabled={!canSubmit || !canPublish}
          aria-describedby={canPublish ? undefined : reasonId}
          className={`${PROJECT_SKILLS_CTA.primary}${canPublish ? "" : " cursor-not-allowed"}`}
        >
          {busy ? copy.publishing : copy.publish}
        </button>
        <button
          type="button"
          disabled={!canSubmit}
          className={PROJECT_SKILLS_CTA.secondary}
          onClick={onSaveDraft}
        >
          {copy.saveDraft}
        </button>
      </span>
      {canPublish ? null : (
        <span id={reasonId} className="max-w-xs text-[11px] text-awc-fg-muted">
          {copy.memberDraftHint}
        </span>
      )}
    </span>
  );
}
