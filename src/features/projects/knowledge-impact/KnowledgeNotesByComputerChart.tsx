import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import KnowledgeHorizontalBars from "@/features/projects/knowledge-impact/KnowledgeHorizontalBars";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

/** Owner-only: note count per computer from the last report. */
export default function KnowledgeNotesByComputerChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  if (impact.computers === null) {
    return null;
  }
  const items = [...impact.computers]
    .sort((a, b) => b.cardCount - a.cardCount)
    .slice(0, 8)
    .map((c) => ({ key: c.deviceId, label: c.label, value: c.cardCount }));
  return (
    <KnowledgeChartCard
      title={C["chart.byComputer.title"]}
      description={C["chart.byComputer.description"]}
      tip={C["chart.byComputer.tip"]}
      isEmpty={items.every((item) => item.value === 0)}
      table={{
        headers: [C["chart.col.computer"], C["computers.col.cards"]],
        rows: items.map((item) => [item.label, item.value]),
      }}
    >
      <KnowledgeHorizontalBars items={items} />
    </KnowledgeChartCard>
  );
}
