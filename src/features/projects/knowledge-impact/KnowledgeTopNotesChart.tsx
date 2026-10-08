import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import KnowledgeHorizontalBars from "@/features/projects/knowledge-impact/KnowledgeHorizontalBars";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

/** Owner-only: shared notes seen most often (text only from sharing computers). */
export default function KnowledgeTopNotesChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  if (impact.sharedCards === null) {
    return null;
  }
  const items = [...impact.sharedCards]
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, 5)
    .map((card) => ({
      key: `${card.cardId}-${card.computerLabel}`,
      label: card.takeaway,
      value: card.occurrences,
    }));
  return (
    <KnowledgeChartCard
      title={C["chart.topNotes.title"]}
      description={C["chart.topNotes.description"]}
      tip={C["chart.topNotes.tip"]}
      isEmpty={items.length === 0}
      table={{
        headers: [C["chart.col.note"], C["chart.col.seen"]],
        rows: items.map((item) => [item.label, item.value]),
      }}
    >
      <KnowledgeHorizontalBars items={items} />
    </KnowledgeChartCard>
  );
}
