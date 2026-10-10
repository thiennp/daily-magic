"use client";

import { useCallback } from "react";

import type {
  SkillCheckAnswer,
  SkillComparisonAnswer,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import {
  postSkillCheckAnswer,
  postSkillComparisonAnswer,
} from "@/features/project-auto-skills/internal/presentation/skillQuestionsApi";

export interface SkillQuestionAnswers {
  readonly answerSkillCheck: (
    checkId: number,
    answer: SkillCheckAnswer,
  ) => Promise<boolean>;
  readonly answerSkillComparison: (
    comparisonId: number,
    answer: SkillComparisonAnswer,
  ) => Promise<boolean>;
}

/** Answers to the skill questions of the Library strip: improve a skill, pick a compared version. */
export const useSkillQuestionAnswers = (
  projectId: string,
  setBusy: (busy: boolean) => void,
  reload: () => void,
): SkillQuestionAnswers => {
  const answerSkillCheck = useCallback(
    async (checkId: number, value: SkillCheckAnswer): Promise<boolean> => {
      setBusy(true);
      const ok = await postSkillCheckAnswer(projectId, checkId, value);
      setBusy(false);
      reload();
      return ok;
    },
    [projectId, setBusy, reload],
  );
  const answerSkillComparison = useCallback(
    async (id: number, value: SkillComparisonAnswer): Promise<boolean> => {
      setBusy(true);
      const ok = await postSkillComparisonAnswer(projectId, id, value);
      setBusy(false);
      reload();
      return ok;
    },
    [projectId, setBusy, reload],
  );
  return { answerSkillCheck, answerSkillComparison };
};
