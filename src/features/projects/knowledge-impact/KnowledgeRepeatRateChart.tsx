import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import KnowledgeChartLegend from "@/features/projects/knowledge-impact/KnowledgeChartLegend";
import { formatWeekLabel } from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import {
  buildPolylineSegments,
  buildSeriesPoints,
  CHART_HEIGHT,
  CHART_PAD,
  CHART_WIDTH,
  formatChartPercent,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const rate = (repeats: number, runs: number): number | null =>
  runs === 0 ? null : repeats / runs;

export default function KnowledgeRepeatRateChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const { weekly } = impact;
  const withNotes = weekly.map((w) => rate(w.repeatsWith, w.runsWith));
  const holdout = weekly.map((w) => rate(w.repeatsHoldout, w.runsHoldout));
  const maxValue = Math.max(
    0.05,
    ...[...withNotes, ...holdout].map((value) => value ?? 0),
  );
  const baseline = CHART_HEIGHT - CHART_PAD;
  const series = [
    {
      key: "with",
      label: C["chart.repeat.withNotes"],
      values: withNotes,
      dashed: false,
      stroke: "stroke-awc-blue-600",
      swatch: "bg-awc-blue-600",
    },
    {
      key: "holdout",
      label: C["chart.repeat.holdout"],
      values: holdout,
      dashed: true,
      stroke: "stroke-awc-fg-subtle",
      swatch: "bg-awc-fg-subtle",
    },
  ];
  return (
    <KnowledgeChartCard
      title={C["chart.repeat.title"]}
      description={C["chart.repeat.description"]}
      tip={C["chart.repeat.tip"]}
      isEmpty={!weekly.some((w) => w.runsWith + w.runsHoldout > 0)}
      table={{
        headers: [
          C["chart.col.week"],
          C["chart.repeat.withNotes"],
          C["chart.repeat.holdout"],
        ],
        rows: weekly.map((w, i) => [
          w.weekStart,
          formatChartPercent(withNotes[i] ?? null),
          formatChartPercent(holdout[i] ?? null),
        ]),
      }}
    >
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={C["chart.repeat.title"]}
        className="w-full max-w-md text-awc-fg-muted"
      >
        <line
          x1={CHART_PAD}
          y1={baseline}
          x2={CHART_WIDTH - CHART_PAD}
          y2={baseline}
          className="stroke-awc-border-strong"
        />
        <text x={CHART_PAD} y={10} fontSize={10} fill="currentColor">
          {formatChartPercent(maxValue)}
        </text>
        <text
          x={CHART_PAD}
          y={CHART_HEIGHT - 3}
          fontSize={9}
          fill="currentColor"
        >
          {formatWeekLabel(weekly[0]?.weekStart ?? "")}
        </text>
        {series.map((entry) =>
          buildPolylineSegments(buildSeriesPoints(entry.values, maxValue)).map(
            (segment, index) => (
              <polyline
                key={`${entry.key}-${index}`}
                fill="none"
                strokeWidth={2}
                strokeDasharray={entry.dashed ? "4 3" : undefined}
                className={entry.stroke}
                points={segment.map((p) => `${p.x},${p.y}`).join(" ")}
              />
            ),
          ),
        )}
      </svg>
      <KnowledgeChartLegend items={series} />
    </KnowledgeChartCard>
  );
}
