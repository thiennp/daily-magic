import KnowledgeBarSvg from "@/features/projects/knowledge-impact/KnowledgeBarSvg";
import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import { hasNoChartData } from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export default function KnowledgeRunsSplitChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const withNotes = impact.weekly.map((w) => w.runsWith);
  const holdout = impact.weekly.map((w) => w.runsHoldout);
  return (
    <KnowledgeChartCard
      title={C["chart.runs.title"]}
      description={C["chart.runs.description"]}
      tip={C["chart.runs.tip"]}
      isEmpty={hasNoChartData([withNotes, holdout])}
      table={{
        headers: [
          C["chart.col.week"],
          C["chart.runs.with"],
          C["chart.runs.holdout"],
        ],
        rows: impact.weekly.map((w) => [
          w.weekStart,
          w.runsWith,
          w.runsHoldout,
        ]),
      }}
    >
      <KnowledgeBarSvg
        stacked
        label={C["chart.runs.title"]}
        weeks={impact.weekly.map((w) => w.weekStart)}
        series={[
          {
            label: C["chart.runs.with"],
            className: "fill-awc-blue-600",
            swatch: "bg-awc-blue-600",
            values: withNotes,
          },
          {
            label: C["chart.runs.holdout"],
            className: "fill-awc-fg-subtle",
            swatch: "bg-awc-fg-subtle",
            values: holdout,
          },
        ]}
      />
    </KnowledgeChartCard>
  );
}
