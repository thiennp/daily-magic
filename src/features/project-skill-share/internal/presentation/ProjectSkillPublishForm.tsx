"use client";

import { useId, useState } from "react";

import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import type { ProjectSkillKind } from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { PublishProjectSkillDraft } from "@/features/project-skill-share/internal/presentation/hooks/useProjectSkills";
import ProjectSkillKindToggle from "@/features/project-skill-share/internal/presentation/ProjectSkillKindToggle";
import ProjectSkillOwnerOnlyActions from "@/features/project-skill-share/internal/presentation/ProjectSkillOwnerOnlyActions";
import ProjectSkillPublishFields from "@/features/project-skill-share/internal/presentation/ProjectSkillPublishFields";
import ProjectSkillPublishSubmitActions from "@/features/project-skill-share/internal/presentation/ProjectSkillPublishSubmitActions";
import { PROJECT_PLAYBOOKS_COPY } from "@/features/project-skill-share/internal/presentation/projectPlaybooksCopy.constant";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/public-api/types";

interface Props {
  readonly busy: boolean;
  /** Owner or active member: may Publish and Save draft (the server limits members to their own skills). */
  readonly canDraft: boolean;
  readonly kind: ProjectSkillKind;
  readonly onKind: (kind: ProjectSkillKind) => void;
  readonly onSubmit: (draft: PublishProjectSkillDraft) => Promise<boolean>;
}

export default function ProjectSkillPublishForm({
  busy,
  canDraft,
  kind,
  onKind,
  onSubmit,
}: Props) {
  const copy = PROJECT_SKILLS_COPY;
  const idBase = useId();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const bytes = measureProjectSkillBodyBytes(body);
  const tooLarge = bytes > PROJECT_SKILL_MAX_BODY_BYTES;
  const canSubmit =
    canDraft && !busy && !tooLarge && name.trim() !== "" && body.trim() !== "";

  const submit = async (asDraft: boolean) => {
    if (!canDraft) return;
    const ok = await onSubmit({
      name: name.trim(),
      ...(description.trim() === "" ? {} : { description: description.trim() }),
      body,
      asDraft,
      kind,
    });
    if (ok) {
      setName("");
      setDescription("");
      setBody("");
    }
  };

  return (
    <form
      className="space-y-2 border-t border-awc-border/70 pt-3 dark:border-gray-800/70"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(false);
      }}
    >
      <span className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold text-awc-fg dark:text-gray-200">
          {kind === "playbook"
            ? PROJECT_PLAYBOOKS_COPY.publishHeading
            : copy.publishHeading}
        </p>
        <ProjectSkillKindToggle
          kind={kind}
          disabled={!canDraft}
          onKind={onKind}
        />
      </span>
      <ProjectSkillPublishFields
        kind={kind}
        nameId={`${idBase}-name`}
        descriptionId={`${idBase}-description`}
        bodyId={`${idBase}-body`}
        name={name}
        description={description}
        body={body}
        onName={setName}
        onDescription={setDescription}
        onBody={setBody}
      />
      <p
        className={`text-[11px] ${tooLarge ? "text-red-600" : PROJECT_PAGE_METADATA_TEXT_CLASS}`}
      >
        {tooLarge
          ? copy.tooLarge
          : copy.bytesLabel(bytes, PROJECT_SKILL_MAX_BODY_BYTES)}
      </p>
      {canDraft ? (
        <ProjectSkillPublishSubmitActions
          busy={busy}
          canSubmit={canSubmit}
          onSaveDraft={() => void submit(true)}
        />
      ) : (
        <ProjectSkillOwnerOnlyActions />
      )}
    </form>
  );
}
