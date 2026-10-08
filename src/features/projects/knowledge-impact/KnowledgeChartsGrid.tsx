import KnowledgeMistakesAvoidedChart from "@/features/projects/knowledge-impact/KnowledgeMistakesAvoidedChart";
import KnowledgeNotesByComputerChart from "@/features/projects/knowledge-impact/KnowledgeNotesByComputerChart";
import KnowledgeRepeatRateChart from "@/features/projects/knowledge-impact/KnowledgeRepeatRateChart";
import KnowledgeRunsSplitChart from "@/features/projects/knowledge-impact/KnowledgeRunsSplitChart";
import KnowledgeSavedVsAddedChart from "@/features/projects/knowledge-impact/KnowledgeSavedVsAddedChart";
import KnowledgeTokensPerRunChart from "@/features/projects/knowledge-impact/KnowledgeTokensPerRunChart";
import KnowledgeTopNotesChart from "@/features/projects/knowledge-impact/KnowledgeTopNotesChart";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

/** Charts under the stat tiles: 1 column on phones, 2 from `md`. */
export default function KnowledgeChartsGrid({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <KnowledgeRepeatRateChart impact={impact} />
      <KnowledgeRunsSplitChart impact={impact} />
      <KnowledgeMistakesAvoidedChart impact={impact} />
      <KnowledgeSavedVsAddedChart impact={impact} />
      <KnowledgeTokensPerRunChart impact={impact} />
      <KnowledgeNotesByComputerChart impact={impact} />
      <KnowledgeTopNotesChart impact={impact} />
    </div>
  );
}
