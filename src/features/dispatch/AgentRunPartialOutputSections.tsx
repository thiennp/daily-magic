import AgentRunPartialOutputSectionView from "@/features/dispatch/AgentRunPartialOutputSectionView";
import type { AgentRunPartialOutputSection } from "@/features/dispatch/utils/parseAgentRunPartialOutputSections";

interface AgentRunPartialOutputSectionsProps {
  readonly sections: readonly AgentRunPartialOutputSection[];
}

export default function AgentRunPartialOutputSections({
  sections,
}: AgentRunPartialOutputSectionsProps) {
  return (
    <div className="space-y-3">
      {sections.map((section, index) => (
        <AgentRunPartialOutputSectionView
          key={`${section.kind}-${index}`}
          section={section}
        />
      ))}
    </div>
  );
}
