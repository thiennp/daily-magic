"use client";

import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";
import { buildSkillHintLine } from "@/features/projects/tasks/utils/suggestSkillsForTask";

interface AwcProjectTasksSkillSuggestionsProps {
  readonly skills: readonly ProjectSkillView[];
  readonly prompt: string;
  readonly disabled: boolean;
  readonly onAdd: (hintLine: string) => void;
}

/** Skills that fit the task being written; a click adds a hint line to the prompt. */
export default function AwcProjectTasksSkillSuggestions({
  skills,
  prompt,
  disabled,
  onAdd,
}: AwcProjectTasksSkillSuggestionsProps) {
  if (skills.length === 0) {
    return null;
  }
  return (
    <div className="mb-3.5 grid gap-1.5" aria-label="Suggested skills">
      <span className="text-[12px] font-semibold text-awc-fg-subtle">
        Suggested skills
      </span>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {skills.map((skill) => {
          const line = buildSkillHintLine(skill);
          const added = prompt.includes(line);
          return (
            <li key={skill.skillId}>
              <button
                type="button"
                disabled={disabled || added}
                title={skill.description ?? skill.name}
                onClick={() => onAdd(line)}
                className="inline-flex items-center gap-1 rounded-full border border-awc-border-strong bg-awc-tile px-3 py-1 text-[12.5px] font-medium text-awc-fg transition-colors hover:border-awc-control-border disabled:cursor-default disabled:opacity-70"
              >
                <span aria-hidden="true">{added ? "✓" : "+"}</span>
                {skill.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
