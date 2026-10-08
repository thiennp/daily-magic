"use client";

import { useAutoSkills } from "@/features/project-auto-skills/public-api/presentation";
import AwcAutoSkillQuestionCard from "@/features/projects/autoskills/AwcAutoSkillQuestionCard";

interface AwcOneWindowInFeedSkillQuestionsProps {
  readonly projectId: string;
  /** Owner-only; non-owners never request the questions. */
  readonly enabled: boolean;
}

/** In-feed "Save as skill?" cards (same hook and card as Library / Home). */
export default function AwcOneWindowInFeedSkillQuestions({
  projectId,
  enabled,
}: AwcOneWindowInFeedSkillQuestionsProps) {
  const auto = useAutoSkills(projectId, enabled);
  const pending = auto.overview?.pending ?? [];
  if (!enabled || pending.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-3 border-b border-awc-border bg-awc-surface px-4 py-3">
      {pending.map((suggestion) => (
        <AwcAutoSkillQuestionCard
          key={suggestion.id}
          suggestion={suggestion}
          busy={auto.busy}
          onAnswer={(answer) => void auto.answer(suggestion.id, answer)}
        />
      ))}
    </div>
  );
}
