import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** Loading skeletons for the Activity feed. */
export default function AwcOneWindowFeedLoading() {
  const widths = [70, 45, 85, 55] as const;
  return (
    <div
      className="flex flex-1 flex-col gap-3 p-4"
      aria-busy="true"
      aria-label={ONE_WINDOW_FEED_COPY.loading}
    >
      {widths.map((w) => (
        <div key={w} className="grid grid-cols-[30px_minmax(0,1fr)] gap-2.5">
          <i className="block h-[30px] w-[30px] animate-pulse rounded-full bg-awc-tile-2" />
          <div className="grid gap-1.5">
            <i className="block h-3 w-[30%] animate-pulse rounded bg-awc-tile-2" />
            <i
              className="block h-8 animate-pulse rounded bg-awc-tile-2"
              style={{ width: `${w}%` }}
            />
          </div>
        </div>
      ))}
      <span className="sr-only" role="status">
        {ONE_WINDOW_FEED_COPY.loading}
      </span>
    </div>
  );
}
