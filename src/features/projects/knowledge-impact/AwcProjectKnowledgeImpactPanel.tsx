"use client";

import KnowledgeComputersList from "@/features/projects/knowledge-impact/KnowledgeComputersList";
import KnowledgeImpactStat from "@/features/projects/knowledge-impact/KnowledgeImpactStat";
import KnowledgeRepeatRateChart from "@/features/projects/knowledge-impact/KnowledgeRepeatRateChart";
import KnowledgeSharedCardsList from "@/features/projects/knowledge-impact/KnowledgeSharedCardsList";
import KnowledgeTokensPerRunChart from "@/features/projects/knowledge-impact/KnowledgeTokensPerRunChart";
import { formatChartPercent } from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";
import {
  fillCopy,
  formatNumber,
  MUTED_CLASS,
} from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import useAwcProjectKnowledgeImpact from "@/features/projects/knowledge-impact/useAwcProjectKnowledgeImpact";
import type { KnowledgeImpactTotals } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const resolveRepeatHint = (totals: KnowledgeImpactTotals): string =>
  totals.repeatRateHoldout === null
    ? C["stat.repeat.hint.none"]
    : fillCopy(C["stat.repeat.hint.holdout"], {
        holdout: formatChartPercent(totals.repeatRateHoldout),
        runs: totals.holdoutRuns,
      });

/** Reports-tab block: token cost, avoided mistakes and install status. */
export default function AwcProjectKnowledgeImpactPanel({
  projectId,
}: {
  readonly projectId: string;
}) {
  const { impact, isLoading, loadFailed } =
    useAwcProjectKnowledgeImpact(projectId);

  if (isLoading) {
    return <p className={MUTED_CLASS}>{C["impact.loading"]}</p>;
  }
  if (loadFailed || impact === null) {
    return <p className={MUTED_CLASS}>{C["impact.error"]}</p>;
  }
  const { totals } = impact;
  return (
    <section
      aria-label={C["impact.aria"]}
      className="flex min-w-0 flex-col gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
    >
      <header className="space-y-0.5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {C["impact.heading"]}
        </h3>
        <p className={MUTED_CLASS}>
          {fillCopy(C["impact.intro"], { days: impact.windowDays })}
        </p>
      </header>
      {totals.runs > 0 ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <KnowledgeImpactStat
              label={C["stat.avoided.label"]}
              value={`≈ ${formatNumber(totals.mistakesAvoided)}`}
              hint={C["stat.avoided.hint"]}
            />
            <KnowledgeImpactStat
              label={C["stat.tokens.label"]}
              value={formatNumber(totals.injectedTokens)}
              hint={fillCopy(C["stat.tokens.hint"], {
                perRun: totals.injectedTokensPerRun,
              })}
            />
            <KnowledgeImpactStat
              label={C["stat.saved.label"]}
              value={`≈ ${formatNumber(totals.estTokensSaved)}`}
              hint={C["stat.saved.hint"]}
            />
            <KnowledgeImpactStat
              label={C["stat.repeat.label"]}
              value={formatChartPercent(totals.repeatRateWithKnowledge)}
              hint={resolveRepeatHint(totals)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <KnowledgeRepeatRateChart impact={impact} />
            <KnowledgeTokensPerRunChart impact={impact} />
          </div>
        </>
      ) : (
        <p className={MUTED_CLASS}>{C["impact.empty"]}</p>
      )}
      <KnowledgeComputersList impact={impact} />
      <KnowledgeSharedCardsList impact={impact} />
      <p className={MUTED_CLASS}>{C["footnote"]}</p>
    </section>
  );
}
