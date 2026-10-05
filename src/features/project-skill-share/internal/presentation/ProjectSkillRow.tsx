"use client";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import {
  PROJECT_SKILLS_BADGE_CLASS,
  PROJECT_SKILLS_CTA,
} from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

interface ProjectSkillRowProps {
  readonly skill: ProjectSkillView;
  readonly busy: boolean;
  readonly onRevoke: (skillId: string) => void;
  readonly onPublishDraft: (skillId: string) => void;
}

export default function ProjectSkillRow({
  skill,
  busy,
  onRevoke,
  onPublishDraft,
}: ProjectSkillRowProps) {
  const copy = PROJECT_SKILLS_COPY;
  const shownVersion = skill.publishedVersion ?? skill.latestVersion;
  const hasPendingDraft =
    skill.isPublisher && skill.latestVersion !== skill.publishedVersion;

  return (
    <li
      data-skill-id={skill.skillId}
      className="flex flex-wrap items-start justify-between gap-2 text-sm"
    >
      <span className="min-w-0 space-y-0.5">
        <span className="flex items-center gap-2">
          <span className="font-medium text-gray-800 dark:text-white/90">
            {skill.name}
          </span>
          <span className={PROJECT_SKILLS_BADGE_CLASS}>
            {copy.versionLabel(shownVersion)}
          </span>
          {skill.state === "draft" ? (
            <span className={PROJECT_SKILLS_BADGE_CLASS}>
              {copy.draftBadge}
            </span>
          ) : null}
        </span>
        {skill.description ? (
          <span className="block text-xs text-gray-500">
            {skill.description}
          </span>
        ) : null}
        <span className={`block text-[11px] ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>{skill.skillId}</span>
      </span>
      <span className="flex flex-wrap gap-2">
        {hasPendingDraft ? (
          <button
            type="button"
            disabled={busy}
            className={PROJECT_SKILLS_CTA.secondary}
            onClick={() => onPublishDraft(skill.skillId)}
          >
            {copy.publishDraft}
          </button>
        ) : null}
        {skill.canRevoke ? (
          <button
            type="button"
            disabled={busy}
            className={PROJECT_SKILLS_CTA.danger}
            onClick={() => onRevoke(skill.skillId)}
          >
            {busy ? (skill.state === "draft" ? copy.discarding : copy.revoking) : skill.state === "draft" ? copy.discardDraft : copy.revoke}
          </button>
        ) : null}
      </span>
    </li>
  );
}
