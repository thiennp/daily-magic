"use client";

import type { AutoSkillQuestionsState } from "@/features/project-auto-skills/public-api/presentation";
import AwcAutoSkillQuestionCard from "@/features/projects/autoskills/AwcAutoSkillQuestionCard";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface HomeAttentionSkillRowsProps {
  readonly questions: AutoSkillQuestionsState;
  readonly projects: readonly UserProjectRecord[];
}

/** Home "Skill question" rows: the shared Save-as-skill card per project. */
export default function HomeAttentionSkillRows({
  questions,
  projects,
}: HomeAttentionSkillRowsProps) {
  return (
    <>
      {questions.rows.map((row) => (
        <li key={row.suggestion.id} className="py-2">
          <AwcAutoSkillQuestionCard
            suggestion={row.suggestion}
            busy={questions.busy}
            projectName={projects.find((p) => p.id === row.projectId)?.name}
            onAnswer={(answer) => void questions.answer(row, answer)}
          />
        </li>
      ))}
    </>
  );
}
