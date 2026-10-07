"use client";

import type { ProjectSkillKind } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_PLAYBOOKS_COPY as P } from "@/features/project-skill-share/internal/presentation/projectPlaybooksCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface Props {
  readonly kind: ProjectSkillKind;
  readonly disabled: boolean;
  readonly onKind: (kind: ProjectSkillKind) => void;
}

const OPTIONS: readonly { kind: ProjectSkillKind; label: string }[] = [
  { kind: "skill", label: P.kindSkill },
  { kind: "playbook", label: P.kindPlaybook },
];

/** Skill | Playbook switch for the Resources share form (same lifecycle). */
export default function ProjectSkillKindToggle({
  kind,
  disabled,
  onKind,
}: Props) {
  return (
    <span
      role="radiogroup"
      aria-label={P.kindGroupLabel}
      className="flex gap-1"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.kind}
          type="button"
          role="radio"
          aria-checked={kind === option.kind}
          disabled={disabled}
          className={
            kind === option.kind
              ? PROJECT_SKILLS_CTA.primary
              : PROJECT_SKILLS_CTA.secondary
          }
          onClick={() => onKind(option.kind)}
        >
          {option.label}
        </button>
      ))}
    </span>
  );
}
