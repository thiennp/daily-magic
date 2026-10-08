import KnowledgeChartCard from "@/features/projects/knowledge-impact/KnowledgeChartCard";
import KnowledgeHorizontalBars from "@/features/projects/knowledge-impact/KnowledgeHorizontalBars";
import { formatNumber } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_SKILL_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeSkillCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const TOP_SKILLS = 6;

/** Per-skill horizontal bars of tokens saved; ≈ marks estimates (< 3 samples). */
export default function KnowledgeSkillSavedChart({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const rows = impact.skills.filter((s) => s.calls > 0).slice(0, TOP_SKILLS);
  const items = rows.map((s) => ({
    key: s.skillId,
    label: `${s.estimate ? "≈ " : ""}${s.skillId}`,
    value: s.saved,
  }));
  return (
    <KnowledgeChartCard
      title={C["chart.skillSaved.title"]}
      description={C["chart.skillSaved.description"]}
      tip={C["chart.skillSaved.tip"]}
      isEmpty={rows.length === 0}
      table={{
        headers: [
          C["chart.col.skill"],
          C["chart.col.saved"],
          C["chart.col.calls"],
        ],
        rows: rows.map((s) => [
          s.skillId,
          `${s.estimate ? "≈ " : ""}${formatNumber(s.saved)}`,
          s.calls,
        ]),
      }}
    >
      <KnowledgeHorizontalBars items={items} />
    </KnowledgeChartCard>
  );
}
