export default function AutomationsLoadingSkeleton() {
  return (
    <div>
      <p className="sr-only" role="status">
        Loading automations…
      </p>
      <div aria-hidden="true" className="grid gap-4">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="h-24 animate-pulse rounded-2xl border border-awc-border/80 bg-awc-surface-2 dark:border-gray-800 dark:bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}
