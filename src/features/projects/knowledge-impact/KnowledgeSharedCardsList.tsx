import {
  MUTED_CLASS,
  fillCopy,
} from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const KIND_LABEL: Record<string, string> = {
  mistake: C["cards.kind.mistake"],
  fix: C["cards.kind.fix"],
  decision: C["cards.kind.decision"],
  lesson: C["cards.kind.lesson"],
};

/** Owner-only list of note text shared by members' computers. */
export default function KnowledgeSharedCardsList({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const cards = impact.sharedCards;
  if (cards === null) {
    return null;
  }
  return (
    <section aria-label={C["cards.heading"]} className="flex flex-col gap-2">
      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {C["cards.heading"]}
      </h4>
      <p className={MUTED_CLASS}>
        {cards.length === 0 ? C["cards.empty"] : C["cards.intro"]}
      </p>
      {cards.length > 0 ? (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          {cards.map((card) => (
            <li key={`${card.cardId}-${card.computerLabel}`} className="p-3">
              <p className="text-sm text-gray-900 dark:text-white">
                <strong>{KIND_LABEL[card.kind] ?? card.kind}:</strong>{" "}
                {card.takeaway}
              </p>
              <p className={MUTED_CLASS}>
                {fillCopy(C["cards.meta"], {
                  computer: card.computerLabel,
                  count: card.occurrences,
                })}
                {card.commitSha !== null
                  ? ` · commit ${card.commitSha.slice(0, 7)}`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
