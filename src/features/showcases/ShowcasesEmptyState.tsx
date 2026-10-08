interface ShowcasesEmptyStateProps {
  readonly onClear: () => void;
}

export default function ShowcasesEmptyState({
  onClear,
}: ShowcasesEmptyStateProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 px-4 py-6 text-center text-awc-fg-muted">
      <h3 className="text-base font-semibold text-awc-fg">
        No showcases match
      </h3>
      <p>Try another word or category.</p>
      <button
        type="button"
        onClick={onClear}
        className="min-h-[30px] rounded-md border border-awc-border-strong bg-awc-surface px-3 text-sm font-semibold text-awc-fg shadow-sm hover:bg-awc-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600"
      >
        Clear filters
      </button>
    </div>
  );
}
