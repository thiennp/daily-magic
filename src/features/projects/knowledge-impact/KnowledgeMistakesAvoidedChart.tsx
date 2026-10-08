import KnowledgeBarSvg from "@/features/projects/knowledge-impact/KnowledgeBarSvg";
import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import { hasNoChartData } from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export default function KnowledgeMistakesAvoidedChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const values = impact.weekly.map((w) => w.mistakesAvoided);
  return (
    <KnowledgeChartCard
      title={C["chart.avoided.title"]}
      description={C["chart.avoided.description"]}
      tip={C["chart.avoided.tip"]}
      isEmpty={hasNoChartData([values])}
      table={{
        headers: [C["chart.col.week"], `${C["chart.avoided.title"]} (≈)`],
        rows: impact.weekly.map((w) => [w.weekStart, `≈ ${w.mistakesAvoided}`]),
      }}
    >
      <KnowledgeBarSvg
        label={C["chart.avoided.title"]}
        valuePrefix="≈ "
        weeks={impact.weekly.map((w) => w.weekStart)}
        series={[
          {
            label: C["stat.avoided.label"],
            className: "fill-awc-blue-600",
            swatch: "bg-awc-blue-600",
            values,
          },
        ]}
      />
    </KnowledgeChartCard>
  );
}
