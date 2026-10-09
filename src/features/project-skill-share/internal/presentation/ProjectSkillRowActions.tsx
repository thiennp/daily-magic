"use client";

import { useId } from "react";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

const HELPER = "text-[11px] text-awc-fg-muted dark:text-gray-400";

interface Props {
  readonly skill: ProjectSkillView;
  readonly busy: boolean;
  readonly hasPendingDraft: boolean;
  readonly onRevoke: (skillId: string) => void;
  readonly onPublishDraft: (skillId: string) => void;
}

/** Publish draft + Revoke/Discard; others get disabled + Product EN reason. */
export default function ProjectSkillRowActions({
  skill,
  busy,
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
            disabled={!skill.canPublish || busy}
            aria-describedby={!skill.canPublish ? publishReasonId : undefined}
            className={`${PROJECT_SKILLS_CTA.secondary}${!skill.canPublish ? " cursor-not-allowed" : ""}`}
            onClick={() => {
              if (skill.canPublish) onPublishDraft(skill.skillId);
            }}
          >
            {copy.publishDraft}
          </button>
        ) : null}
        {skill.state !== "revoked" ? (
          <button
            type="button"
            disabled={!skill.canRevoke || busy}
            aria-describedby={!skill.canRevoke ? deleteReasonId : undefined}
            className={`${PROJECT_SKILLS_CTA.danger}${!skill.canRevoke ? " cursor-not-allowed" : ""}`}
            onClick={() => {
              if (skill.canRevoke) onRevoke(skill.skillId);
            }}
          >
            {busy ? revokingLabel : revokeLabel}
          </button>
        ) : null}
      </span>
      {!skill.canPublish && hasPendingDraft ? (
        <span id={publishReasonId} className={HELPER}>
          {copy.disabledPublish}
        </span>
      ) : null}
      {!skill.canRevoke && skill.state !== "revoked" ? (
        <span id={deleteReasonId} className={HELPER}>
          {copy.disabledDelete}
        </span>
      ) : null}
    </span>
  );
}
