export default function MarketplaceSectionSkeleton() {
  return (
    <div className="mt-4 space-y-3" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-full max-w-md animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
      <div className="h-24 w-full animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
    </div>
  );
}
