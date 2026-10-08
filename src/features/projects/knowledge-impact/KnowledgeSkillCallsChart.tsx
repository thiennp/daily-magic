import KnowledgeBarSvg from "@/features/projects/knowledge-impact/KnowledgeBarSvg";
import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import { hasNoChartData } from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import { PROJECT_KNOWLEDGE_SKILL_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeSkillCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

/** Stacked weekly bars: skill chosen vs skill found but not chosen (miss). */
export default function KnowledgeSkillCallsChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const chosen = impact.skillWeekly.map((w) => w.chosen);
  const missed = impact.skillWeekly.map((w) => w.missed);
  return (
    <KnowledgeChartCard
      title={C["chart.skillCalls.title"]}
      description={C["chart.skillCalls.description"]}
      tip={C["chart.skillCalls.tip"]}
      isEmpty={hasNoChartData([chosen, missed])}
      table={{
        headers: [
          "Week",
          C["chart.skillCalls.chosen"],
          C["chart.skillCalls.missed"],
        ],
        rows: impact.skillWeekly.map((w) => [w.weekStart, w.chosen, w.missed]),
      }}
    >
      <KnowledgeBarSvg
        stacked
        label={C["chart.skillCalls.title"]}
        weeks={impact.skillWeekly.map((w) => w.weekStart)}
        series={[
          {
            label: C["chart.skillCalls.chosen"],
            className: "fill-awc-blue-600",
            swatch: "bg-awc-blue-600",
            values: chosen,
          },
          {
            label: C["chart.skillCalls.missed"],
            className: "fill-awc-fg-subtle",
            swatch: "bg-awc-fg-subtle",
            values: missed,
          },
        ]}
      />
    </KnowledgeChartCard>
  );
}
