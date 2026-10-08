import { MUTED_CLASS } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";

/** Loading skeleton or error-with-retry for the impact panel. */
export default function KnowledgeImpactStatus({
  isLoading,
  onRetry,
}: {
  readonly isLoading: boolean;
  readonly onRetry: () => void;
}) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={C["impact.loading"]}
        className="flex flex-col gap-3 rounded-xl border border-awc-border p-4"
      >
        <div className="h-4 w-40 animate-pulse rounded bg-awc-surface-2 motion-reduce:animate-none" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((key) => (
            <div
              key={key}
              className="h-20 animate-pulse rounded-lg bg-awc-surface-2 motion-reduce:animate-none"
            />
          ))}
        </div>
        <div className="h-32 animate-pulse rounded-lg bg-awc-surface-2 motion-reduce:animate-none" />
      </div>
    );
  }
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-xl border border-awc-border p-4"
    >
      <p className={MUTED_CLASS}>{C["impact.error"]}</p>
      <button
        type="button"
        onClick={onRetry}
        className="awc-focus-ring rounded-md border border-awc-border-strong px-2.5 py-1 text-xs text-awc-fg"
      >
        {C["impact.retry"]}
      </button>
    </div>
  );
}
