"use client";

import { useId } from "react";

import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

const HELPER = "max-w-xs text-[11px] text-gray-500 dark:text-gray-400";

/** Publish + Save draft disabled with Product EN owner-only reason. */
export default function ProjectSkillOwnerOnlyActions() {
  const reasonId = useId();
  const copy = PROJECT_SKILLS_COPY;
  return (
    <span className="flex flex-col items-start gap-0.5">
      <span className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled
          aria-describedby={reasonId}
          className={`${PROJECT_SKILLS_CTA.primary} cursor-not-allowed`}
        >
          {copy.publish}
        </button>
        <button
          type="button"
          disabled
          aria-describedby={reasonId}
          className={`${PROJECT_SKILLS_CTA.secondary} cursor-not-allowed`}
        >
          {copy.saveDraft}
        </button>
      </span>
      <span id={reasonId} className={HELPER}>
        {copy.disabledAdd}
      </span>
    </span>
  );
}
