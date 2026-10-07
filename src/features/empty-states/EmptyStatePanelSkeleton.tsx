interface EmptyStatePanelSkeletonProps {
  /** Match full-width lists (e.g. reports run cards); default centers like EmptyStatePanel. */
  readonly width?: "centered" | "full";
}

const SKELETON_WIDTH_CLASS: Record<
  EmptyStatePanelSkeletonProps["width"] & string,
  string
> = {
  centered: "mx-auto w-full max-w-lg",
  full: "w-full",
};

export default function EmptyStatePanelSkeleton({
  width = "centered",
}: EmptyStatePanelSkeletonProps) {
  return (
    <div
      className={`${SKELETON_WIDTH_CLASS[width]} space-y-3 py-2`}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-full animate-pulse rounded bg-awc-fill dark:bg-gray-800" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-awc-fill dark:bg-gray-800" />
    </div>
  );
}
