"use client";

import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface Props {
  readonly busy: boolean;
  readonly canSubmit: boolean;
  readonly onSaveDraft: () => void;
}

/** Owner Publish + Save draft buttons. */
export default function ProjectSkillPublishSubmitActions({
  busy,
  canSubmit,
  onSaveDraft,
}: Props) {
  const copy = PROJECT_SKILLS_COPY;
  return (
    <span className="flex flex-wrap gap-2">
      <button
        type="submit"
        disabled={!canSubmit}
        className={PROJECT_SKILLS_CTA.primary}
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
  );
}
