"use client";

import { useMemo } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import Badge from "@/components/ui/badge/Badge";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import HomeAttentionRow from "@/features/home/HomeAttentionRow";
import HomeAttentionSkillRows from "@/features/home/HomeAttentionSkillRows";
import useHomeAttentionRuns from "@/features/home/hooks/useHomeAttentionRuns";
import selectHomeRecentProjects from "@/features/home/utils/selectHomeRecentProjects";
import { useAutoSkillQuestions } from "@/features/project-auto-skills/public-api/presentation";

/**
 * Design "Needs your attention": count badge plus runs waiting for approval
 * or failed in the last 24h (browser run cache), and "Save as skill?"
 * questions of the recent projects (owner-only, one request per project).
 * Bot join requests are per-project only, so they are not listed here.
 */
export default function HomeAttentionPanel() {
  const runs = useHomeAttentionRuns();
  const { projects } = useUserProjects("");
  const recentProjects = useMemo(
    () => selectHomeRecentProjects(projects),
    [projects],
  );
  const questions = useAutoSkillQuestions(recentProjects.map((p) => p.id));
  const total = runs.length + questions.rows.length;

  return (
    <AppPanel as="section" aria-labelledby="home-attention-heading">
      <h2
        id="home-attention-heading"
        className={`flex items-center gap-2 ${APP_SURFACE_SECTION_TITLE_CLASS}`}
      >
        Needs your attention
        <Badge size="sm" color={total > 0 ? "error" : "light"}>
          {total}
        </Badge>
      </h2>
      {total === 0 ? (
        <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Nothing needs you right now.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-awc-border">
          {runs.map((run) => (
            <HomeAttentionRow key={run.id} run={run} />
          ))}
          <HomeAttentionSkillRows
            questions={questions}
            projects={recentProjects}
          />
        </ul>
      )}
    </AppPanel>
  );
}
