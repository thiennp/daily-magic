"use client";

import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { PROJECT_SKILLS_INPUT_CLASS } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

const LABEL_CLASS = "block text-xs text-awc-fg-muted dark:text-gray-400";

interface ProjectSkillPublishFieldsProps {
  readonly nameId: string;
  readonly descriptionId: string;
  readonly bodyId: string;
  readonly name: string;
  readonly description: string;
  readonly body: string;
  readonly onName: (value: string) => void;
  readonly onDescription: (value: string) => void;
  readonly onBody: (value: string) => void;
}

export default function ProjectSkillPublishFields({
  nameId,
  descriptionId,
  bodyId,
  name,
  description,
  body,
  onName,
  onDescription,
  onBody,
}: ProjectSkillPublishFieldsProps) {
  const copy = PROJECT_SKILLS_COPY;
  return (
    <>
      <label className={LABEL_CLASS} htmlFor={nameId}>
        {copy.nameLabel}
        <input
          id={nameId}
          placeholder={copy.nameLabel}
          className={PROJECT_SKILLS_INPUT_CLASS}
          value={name}
          maxLength={120}
          onChange={(event) => onName(event.target.value)}
        />
      </label>
      <label className={LABEL_CLASS} htmlFor={descriptionId}>
        {copy.descriptionLabel}
        <input
          id={descriptionId}
          placeholder={copy.descriptionLabel}
          className={PROJECT_SKILLS_INPUT_CLASS}
          value={description}
          maxLength={500}
          onChange={(event) => onDescription(event.target.value)}
        />
      </label>
      <label className={LABEL_CLASS} htmlFor={bodyId}>
        {copy.bodyLabel}
        <textarea
          id={bodyId}
          placeholder={copy.bodyLabel}
          className={`${PROJECT_SKILLS_INPUT_CLASS} min-h-24 font-mono`}
          value={body}
          onChange={(event) => onBody(event.target.value)}
        />
      </label>
    </>
  );
}
