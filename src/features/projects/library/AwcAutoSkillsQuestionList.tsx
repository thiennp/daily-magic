"use client";

import type { AutoSkillsState } from "@/features/project-auto-skills/public-api/presentation";
import type { AutoSkillsOverview } from "@/features/project-auto-skills/public-api/types";
import {
  AwcAutoSkillQuestionCard,
  AwcSkillCheckQuestionCard,
} from "@/features/projects/autoskills/public-api/presentation";

interface AwcAutoSkillsQuestionListProps {
  readonly auto: AutoSkillsState;
  readonly overview: AutoSkillsOverview;
  /** Refresh the skill list after a skill was saved or replaced. */
  readonly onSaved: () => void;
}

/** Waiting questions: drafts to save as skills, then skills the judge would improve. */
export default function AwcAutoSkillsQuestionList({
  auto,
  overview,
  onSaved,
}: AwcAutoSkillsQuestionListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {overview.pending.map((suggestion) => (
        <li key={suggestion.id}>
          <AwcAutoSkillQuestionCard
            suggestion={suggestion}
            busy={auto.busy}
            onAnswer={(answer) => {
              void auto.answer(suggestion.id, answer).then((ok) => {
                if (ok && answer === "save") onSaved();
              });
            }}
          />
        </li>
      ))}
      {overview.skillChecks.map((question) => (
        <li key={`check-${question.id}`}>
          <AwcSkillCheckQuestionCard
            question={question}
            busy={auto.busy}
            onAnswer={(answer) => {
              void auto.answerSkillCheck(question.id, answer).then((ok) => {
                if (ok && answer !== "old") onSaved();
              });
            }}
          />
        </li>
      ))}
    </ul>
  );
}
