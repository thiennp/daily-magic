import { formatNumber } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";

export type KnowledgeHorizontalBarItem = {
  readonly key: string;
  readonly label: string;
  readonly value: number;
};

/** Labelled horizontal bars; decorative (the card carries a table fallback). */
export default function KnowledgeHorizontalBars({
  items,
}: {
  readonly items: readonly KnowledgeHorizontalBarItem[];
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0" aria-hidden="true">
      {items.map((item) => (
        <li key={item.key} className="min-w-0">
          <div className="flex items-baseline justify-between gap-2 text-xs text-awc-fg">
            <span className="min-w-0 truncate" title={item.label}>
              {item.label}
            </span>
            <span className="shrink-0 text-awc-fg-muted">
              {formatNumber(item.value)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-awc-surface-2">
            <div
              className="h-1.5 rounded-full bg-awc-blue-600"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
