"use client";

import { useId } from "react";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

const HELPER = "text-[11px] text-gray-500 dark:text-gray-400";

interface Props {
  readonly skill: ProjectSkillView;
  readonly busy: boolean;
  readonly canEdit: boolean;
  readonly hasPendingDraft: boolean;
  readonly onRevoke: (skillId: string) => void;
  readonly onPublishDraft: (skillId: string) => void;
}

/** Publish draft + Revoke/Discard; non-owners get disabled + Product EN reason. */
export default function ProjectSkillRowActions({
  skill,
  busy,
  canEdit,
  hasPendingDraft,
  onRevoke,
  onPublishDraft,
}: Props) {
  const copy = PROJECT_SKILLS_COPY;
  const publishReasonId = useId();
  const deleteReasonId = useId();
  const isDraft = skill.state === "draft";
  const revokeLabel = isDraft ? copy.discardDraft : copy.revoke;
  const revokingLabel = isDraft ? copy.discarding : copy.revoking;
  return (
    <span className="flex flex-col items-end gap-0.5">
      <span className="flex flex-wrap gap-2">
        {hasPendingDraft ? (
          <button
            type="button"
            disabled={!canEdit || busy}
            aria-describedby={!canEdit ? publishReasonId : undefined}
            className={`${PROJECT_SKILLS_CTA.secondary}${!canEdit ? " cursor-not-allowed" : ""}`}
            onClick={() => {
              if (canEdit) onPublishDraft(skill.skillId);
            }}
          >
            {copy.publishDraft}
          </button>
        ) : null}
        {skill.state !== "revoked" ? (
          <button
            type="button"
            disabled={!canEdit || !skill.canRevoke || busy}
            aria-describedby={!canEdit ? deleteReasonId : undefined}
            className={`${PROJECT_SKILLS_CTA.danger}${!canEdit ? " cursor-not-allowed" : ""}`}
            onClick={() => {
              if (canEdit && skill.canRevoke) onRevoke(skill.skillId);
            }}
          >
            {busy ? revokingLabel : revokeLabel}
          </button>
        ) : null}
      </span>
      {!canEdit && hasPendingDraft ? (
        <span id={publishReasonId} className={HELPER}>
          {copy.disabledPublish}
        </span>
      ) : null}
      {!canEdit && skill.state !== "revoked" ? (
        <span id={deleteReasonId} className={HELPER}>
          {copy.disabledDelete}
        </span>
      ) : null}
    </span>
  );
}
