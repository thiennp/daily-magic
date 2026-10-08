"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AutoSkillAnswer,
  AutoSkillSuggestion,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import {
  fetchAutoSkillsOverview,
  postAutoSkillAnswer,
} from "@/features/project-auto-skills/internal/presentation/autoSkillsApi";

export interface AutoSkillQuestionRow {
  readonly projectId: string;
  readonly suggestion: AutoSkillSuggestion;
}

export interface AutoSkillQuestionsState {
  readonly rows: readonly AutoSkillQuestionRow[];
  readonly busy: boolean;
  readonly answer: (
    row: AutoSkillQuestionRow,
    answer: AutoSkillAnswer,
  ) => Promise<boolean>;
}

/**
 * Pending "Save as skill?" questions across projects (Home). One owner-only
 * GET per project id; non-owner projects answer 404 and contribute nothing.
 */
export const useAutoSkillQuestions = (
  projectIds: readonly string[],
): AutoSkillQuestionsState => {
  const key = projectIds.join("|");
  const [rows, setRows] = useState<readonly AutoSkillQuestionRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const ids = key === "" ? [] : key.split("|");
    void Promise.all(
      ids.map((projectId) =>
        fetchAutoSkillsOverview(projectId, controller.signal)
          .then((overview) =>
            (overview?.pending ?? []).map((suggestion) => ({
              projectId,
              suggestion,
            })),
          )
          .catch(() => []),
      ),
    ).then((lists) => {
      if (!controller.signal.aborted) {
        setRows(lists.flat());
      }
    });
    return () => controller.abort();
  }, [key, nonce]);

  const answer = useCallback(
    async (
      row: AutoSkillQuestionRow,
      value: AutoSkillAnswer,
    ): Promise<boolean> => {
      setBusy(true);
      const ok = await postAutoSkillAnswer(
        row.projectId,
        row.suggestion.id,
        value,
      );
      setBusy(false);
      setNonce((n) => n + 1);
      return ok;
    },
    [],
  );

  return { rows, busy, answer };
};
