export type KnowledgeLegendItem = {
  readonly label: string;
  /** `bg-awc-*` colour of the dot. */
  readonly swatch: string;
};

export default function KnowledgeChartLegend({
  items,
}: {
  readonly items: readonly KnowledgeLegendItem[];
}) {
  return (
    <p className="flex flex-wrap gap-x-3 text-xs text-awc-fg-muted">
      {items.map((item) => (
        <span key={item.label}>
          <span
            className={`inline-block size-2 rounded-sm align-baseline ${item.swatch}`}
          />{" "}
          {item.label}
        </span>
      ))}
    </p>
  );
}
