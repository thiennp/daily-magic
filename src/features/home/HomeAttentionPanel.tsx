"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import Badge from "@/components/ui/badge/Badge";
import HomeAttentionRow from "@/features/home/HomeAttentionRow";
import useHomeAttentionRuns from "@/features/home/hooks/useHomeAttentionRuns";

/**
 * Design "Needs your attention": count badge plus runs waiting for approval
 * or failed in the last 24h (browser run cache). Bot join requests are
 * per-project only, so they are not listed here.
 */
export default function HomeAttentionPanel() {
  const runs = useHomeAttentionRuns();

  return (
    <AppPanel as="section" aria-labelledby="home-attention-heading">
      <h2
        id="home-attention-heading"
        className={`flex items-center gap-2 ${APP_SURFACE_SECTION_TITLE_CLASS}`}
      >
        Needs your attention
        <Badge size="sm" color={runs.length > 0 ? "error" : "light"}>
          {runs.length}
        </Badge>
      </h2>
      {runs.length === 0 ? (
        <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Nothing needs you right now.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-awc-border">
          {runs.map((run) => (
            <HomeAttentionRow key={run.id} run={run} />
          ))}
        </ul>
      )}
    </AppPanel>
  );
}
