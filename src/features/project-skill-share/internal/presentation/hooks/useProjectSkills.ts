"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import { fetchProjectSkills } from "@/features/project-skill-share/internal/presentation/utils/fetchProjectSkills";
import { postProjectSkillMutation } from "@/features/project-skill-share/internal/presentation/utils/postProjectSkillMutation";

export interface PublishProjectSkillDraft {
  readonly skillId?: string;
  readonly name?: string;
  readonly description?: string;
  readonly body?: string;
  readonly asDraft?: boolean;
}

/** Skills list + publish / revoke for the Project Access panel. */
export const useProjectSkills = (projectId: string) => {
  const [skills, setSkills] = useState<readonly ProjectSkillView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const generationRef = useRef(0);
  const base = `/api/projects/${encodeURIComponent(projectId)}/skills`;

  const applyResult = useCallback(
    (result: Awaited<ReturnType<typeof fetchProjectSkills>>) => {
      setSkills(result.ok ? result.skills : []);
      setForbidden(!result.ok && result.forbidden);
      if (!result.ok && !result.forbidden) setMessage(result.errorMessage);
      setIsLoading(false);
    },
    [],
  );

  const reload = useCallback(async () => {
    const result = await fetchProjectSkills(projectId);
    applyResult(result);
  }, [projectId, applyResult]);

  useEffect(() => {
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      const result = await fetchProjectSkills(projectId);
      if (generationRef.current !== generation) return;
      applyResult(result);
    };
    void load();
  }, [projectId, applyResult]);

  const mutate = useCallback(
    async (
      url: string,
      payload: Record<string, unknown>,
      okMessage: string,
    ) => {
      setBusy(true);
      const result = await postProjectSkillMutation({ url, payload });
      setMessage(result.ok ? okMessage : result.errorMessage);
      if (result.ok) await reload();
      setBusy(false);
      return result.ok;
    },
    [reload],
  );

  const publish = useCallback(
    (draft: PublishProjectSkillDraft) =>
      mutate(
        base,
        { ...draft },
        draft.asDraft === true
          ? PROJECT_SKILLS_COPY.draftSaved
          : PROJECT_SKILLS_COPY.published,
      ),
    [base, mutate],
  );

  const revoke = useCallback(
    (skillId: string) =>
      mutate(
        `${base}/${encodeURIComponent(skillId)}/revoke`,
        {},
        PROJECT_SKILLS_COPY.revoked,
      ),
    [base, mutate],
  );

  return { skills, isLoading, forbidden, busy, message, publish, revoke };
};
