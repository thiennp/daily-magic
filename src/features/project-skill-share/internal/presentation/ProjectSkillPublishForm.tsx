"use client";

import { useState } from "react";

import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import type { PublishProjectSkillDraft } from "@/features/project-skill-share/internal/presentation/hooks/useProjectSkills";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import {
  PROJECT_SKILLS_CTA,
  PROJECT_SKILLS_INPUT_CLASS,
} from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface ProjectSkillPublishFormProps {
  readonly busy: boolean;
  readonly onSubmit: (draft: PublishProjectSkillDraft) => Promise<boolean>;
}

export default function ProjectSkillPublishForm({
  busy,
  onSubmit,
}: ProjectSkillPublishFormProps) {
  const copy = PROJECT_SKILLS_COPY;
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
      <input
        aria-label={copy.nameLabel}
        placeholder={copy.nameLabel}
        className={PROJECT_SKILLS_INPUT_CLASS}
        value={name}
        maxLength={120}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        aria-label={copy.descriptionLabel}
        placeholder={copy.descriptionLabel}
        className={PROJECT_SKILLS_INPUT_CLASS}
        value={description}
        maxLength={500}
        onChange={(event) => setDescription(event.target.value)}
      />
      <textarea
        aria-label={copy.bodyLabel}
        placeholder={copy.bodyLabel}
        className={`${PROJECT_SKILLS_INPUT_CLASS} min-h-24 font-mono`}
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <p
        className={`text-[11px] ${tooLarge ? "text-red-600" : "text-gray-400"}`}
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
