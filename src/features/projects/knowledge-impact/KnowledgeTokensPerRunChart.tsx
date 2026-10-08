import {
  CHART_HEIGHT,
  CHART_PAD,
  CHART_WIDTH,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export default function KnowledgeTokensPerRunChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const maxValue = Math.max(
    1,
    ...impact.weekly.map((week) => week.injectedTokensPerRun),
  );
  const barWidth = Math.max(
    6,
    Math.floor(
      (CHART_WIDTH - 2 * CHART_PAD) / Math.max(1, impact.weekly.length),
    ) - 4,
  );
  return (
    <figure className="min-w-0">
      <figcaption className="mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
        {C["chart.tokens.title"]}
      </figcaption>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={C["chart.tokens.title"]}
        className="w-full max-w-md"
      >
        <line
          x1={CHART_PAD}
          y1={CHART_HEIGHT - CHART_PAD}
          x2={CHART_WIDTH - CHART_PAD}
          y2={CHART_HEIGHT - CHART_PAD}
          className="stroke-gray-300 dark:stroke-gray-600"
        />
        {impact.weekly.map((week, index) => {
          const height =
            (week.injectedTokensPerRun / maxValue) *
            (CHART_HEIGHT - 2 * CHART_PAD);
          return (
            <rect
              key={week.weekStart}
              x={CHART_PAD + index * (barWidth + 4)}
              y={CHART_HEIGHT - CHART_PAD - height}
              width={barWidth}
              height={height}
              className="fill-blue-600 dark:fill-blue-400"
            >
              <title>{`${week.weekStart}: ${week.injectedTokensPerRun}`}</title>
            </rect>
          );
        })}
      </svg>
    </figure>
  );
}
