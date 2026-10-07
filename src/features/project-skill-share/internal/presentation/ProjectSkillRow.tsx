"use client";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import ProjectSkillRowActions from "@/features/project-skill-share/internal/presentation/ProjectSkillRowActions";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_BADGE_CLASS } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

interface ProjectSkillRowProps {
  readonly skill: ProjectSkillView;
  readonly busy: boolean;
  readonly canEdit: boolean;
  readonly onRevoke: (skillId: string) => void;
  readonly onPublishDraft: (skillId: string) => void;
}

export default function ProjectSkillRow({
  skill,
  busy,
  canEdit,
  onRevoke,
  onPublishDraft,
}: ProjectSkillRowProps) {
  const copy = PROJECT_SKILLS_COPY;
  const shownVersion = skill.publishedVersion ?? skill.latestVersion;
  /** Owner (and publisher) can publish any pending draft — not publisher-only. */
  const hasPendingDraft = skill.latestVersion !== skill.publishedVersion;

  return (
    <li
      data-skill-id={skill.skillId}
      className="flex flex-wrap items-start justify-between gap-2 text-sm"
    >
      <span className="min-w-0 space-y-0.5">
        <span className="flex items-center gap-2">
          <span className="font-medium text-awc-fg dark:text-white/90">
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
          <span className="block text-xs text-awc-fg-muted">
            {skill.description}
          </span>
        ) : null}
        <span
          className={`block text-[11px] ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}
        >
          {skill.skillId}
        </span>
      </span>
      <ProjectSkillRowActions
        skill={skill}
        busy={busy}
        canEdit={canEdit}
        hasPendingDraft={hasPendingDraft}
        onRevoke={onRevoke}
        onPublishDraft={onPublishDraft}
      />
    </li>
  );
}
