import KnowledgeBarSvg from "@/features/projects/knowledge-impact/KnowledgeBarSvg";
import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import { hasNoChartData } from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import {
  fillCopy,
  formatNumber,
} from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export default function KnowledgeSavedVsAddedChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const added = impact.weekly.map((w) => w.injectedTokens);
  const saved = impact.weekly.map((w) => w.estTokensSaved);
  const net = impact.totals.estTokensSaved - impact.totals.injectedTokens;
  return (
    <KnowledgeChartCard
      title={C["chart.net.title"]}
      description={C["chart.net.description"]}
      tip={C["chart.net.tip"]}
      isEmpty={hasNoChartData([added, saved])}
      footer={fillCopy(C["chart.net.footer"], {
        net: `${net < 0 ? "-" : "+"}${formatNumber(Math.abs(net))}`,
      })}
      table={{
        headers: [
          C["chart.col.week"],
          C["chart.net.added"],
          C["chart.net.saved"],
        ],
        rows: impact.weekly.map((w) => [
          w.weekStart,
          w.injectedTokens,
          `≈ ${w.estTokensSaved}`,
        ]),
      }}
    >
      <KnowledgeBarSvg
        label={C["chart.net.title"]}
        weeks={impact.weekly.map((w) => w.weekStart)}
        series={[
          {
            label: C["chart.net.added"],
            className: "fill-awc-fg-subtle",
            swatch: "bg-awc-fg-subtle",
            values: added,
          },
          {
            label: C["chart.net.saved"],
            className: "fill-awc-blue-600",
            swatch: "bg-awc-blue-600",
            values: saved,
          },
        ]}
      />
    </KnowledgeChartCard>
  );
}
