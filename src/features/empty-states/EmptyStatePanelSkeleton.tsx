export default function EmptyStatePanelSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-lg space-y-3 py-2"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
    </div>
  );
}
