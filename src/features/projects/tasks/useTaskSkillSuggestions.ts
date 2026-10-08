"use client";

import { useEffect, useMemo, useState } from "react";

import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";
import { fetchProjectSkills } from "@/features/project-skill-share/public-api/presentation";
import { suggestSkillsForTask } from "@/features/projects/tasks/utils/suggestSkillsForTask";

/** Published skills that fit the task being written; loaded once per open dialog. */
export const useTaskSkillSuggestions = (input: {
  readonly open: boolean;
  readonly projectId: string;
  readonly prompt: string;
}): readonly ProjectSkillView[] => {
  const { open, projectId, prompt } = input;
  const [skills, setSkills] = useState<readonly ProjectSkillView[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const controller = new AbortController();
    void fetchProjectSkills(projectId).then((result) => {
      if (!controller.signal.aborted) setSkills(result.ok ? result.skills : []);
    });
    return () => {
      controller.abort();
    };
  }, [open, projectId]);

  return useMemo(() => suggestSkillsForTask(prompt, skills), [prompt, skills]);
};
