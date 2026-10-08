import {
  buildPolylineSegments,
  buildSeriesPoints,
  CHART_HEIGHT,
  CHART_PAD,
  CHART_WIDTH,
  formatChartPercent,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";
import { MUTED_CLASS } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export default function KnowledgeRepeatRateChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const withNotes = impact.weekly.map((week) =>
    week.runsWith === 0 ? null : week.repeatsWith / week.runsWith,
  );
  const holdout = impact.weekly.map((week) =>
    week.runsHoldout === 0 ? null : week.repeatsHoldout / week.runsHoldout,
  );
  const maxValue = Math.max(
    0.05,
    ...withNotes.map((value) => value ?? 0),
    ...holdout.map((value) => value ?? 0),
  );
  const series = [
    {
      key: "with",
      label: C["chart.repeat.withNotes"],
      className: "stroke-blue-600 dark:stroke-blue-400",
      segments: buildPolylineSegments(buildSeriesPoints(withNotes, maxValue)),
      dashed: false,
    },
    {
      key: "holdout",
      label: C["chart.repeat.holdout"],
      className: "stroke-gray-400",
      segments: buildPolylineSegments(buildSeriesPoints(holdout, maxValue)),
      dashed: true,
    },
  ];
  return (
    <figure className="min-w-0">
      <figcaption className="mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
        {C["chart.repeat.title"]}
      </figcaption>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={C["chart.repeat.title"]}
        className="w-full max-w-md text-gray-500"
      >
        <line
          x1={CHART_PAD}
          y1={CHART_HEIGHT - CHART_PAD}
          x2={CHART_WIDTH - CHART_PAD}
          y2={CHART_HEIGHT - CHART_PAD}
          className="stroke-gray-300 dark:stroke-gray-600"
        />
        <text x={CHART_PAD} y={12} fontSize={10} fill="currentColor">
          {formatChartPercent(maxValue)}
        </text>
        {series.map((entry) =>
          entry.segments.map((segment, index) => (
            <polyline
              key={`${entry.key}-${index}`}
              fill="none"
              strokeWidth={2}
              strokeDasharray={entry.dashed ? "4 3" : undefined}
              className={entry.className}
              points={segment.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          )),
        )}
      </svg>
      <p className={MUTED_CLASS}>
        {series.map((entry) => entry.label).join(" · ")}
      </p>
    </figure>
  );
}
