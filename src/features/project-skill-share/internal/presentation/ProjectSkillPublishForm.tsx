"use client";

import { useId, useState } from "react";

import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import type { PublishProjectSkillDraft } from "@/features/project-skill-share/internal/presentation/hooks/useProjectSkills";
import ProjectSkillPublishFields from "@/features/project-skill-share/internal/presentation/ProjectSkillPublishFields";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

interface ProjectSkillPublishFormProps {
  readonly busy: boolean;
  readonly onSubmit: (draft: PublishProjectSkillDraft) => Promise<boolean>;
}

export default function ProjectSkillPublishForm({
  busy,
  onSubmit,
}: ProjectSkillPublishFormProps) {
  const copy = PROJECT_SKILLS_COPY;
  const idBase = useId();
  const nameId = `${idBase}-name`;
  const descriptionId = `${idBase}-description`;
  const bodyId = `${idBase}-body`;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const bytes = measureProjectSkillBodyBytes(body);
  const tooLarge = bytes > PROJECT_SKILL_MAX_BODY_BYTES;
  const canSubmit =
    !busy && !tooLarge && name.trim() !== "" && body.trim() !== "";

  const submit = async (asDraft: boolean) => {
    const ok = await onSubmit({
      name: name.trim(),
      ...(description.trim() === "" ? {} : { description: description.trim() }),
      body,
      asDraft,
    });
    if (ok) {
      setName("");
      setDescription("");
      setBody("");
    }
  };

  return (
    <form
      className="space-y-2 border-t border-gray-200/70 pt-3 dark:border-gray-800/70"
      onSubmit={(event) => {
        event.preventDefault();
        void submit(false);
      }}
    >
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
        {copy.publishHeading}
      </p>
      <ProjectSkillPublishFields
        nameId={nameId}
        descriptionId={descriptionId}
        bodyId={bodyId}
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
          onClick={() => void submit(true)}
        >
          {copy.saveDraft}
        </button>
      </span>
    </form>
  );
}
