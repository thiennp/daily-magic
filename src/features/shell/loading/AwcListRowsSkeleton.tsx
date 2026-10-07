import AwcSkeletonBar from "@/features/shell/loading/AwcSkeletonBar";
import AwcSkeletonStatus from "@/features/shell/loading/AwcSkeletonStatus";

interface AwcListRowsSkeletonProps {
  /** Existing loading copy — kept for screen readers. */
  readonly label: string;
  readonly rows?: number;
  /** `avatar` = rail people rows; `line` = list/table rows. */
  readonly variant?: "avatar" | "line";
  readonly className?: string;
}

const ROW_WIDTHS = ["w-3/5", "w-2/5", "w-1/2", "w-3/4", "w-1/3"] as const;

/** DF-016: in-panel list skeleton (Members rail, Tasks, Library, Settings). */
export default function AwcListRowsSkeleton({
  label,
  rows = 3,
  variant = "line",
  className = "",
}: AwcListRowsSkeletonProps) {
  return (
    <div
      className={`flex flex-col gap-3 py-2 ${className}`}
      aria-busy="true"
      data-skeleton="list-rows"
    >
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex min-w-0 items-center gap-2.5">
          {variant === "avatar" ? (
            <AwcSkeletonBar className="size-7 shrink-0 rounded-full" />
          ) : null}
          <div className="grid min-w-0 flex-1 gap-1.5">
            <AwcSkeletonBar
              className={`h-3.5 ${ROW_WIDTHS[i % ROW_WIDTHS.length]}`}
            />
            <AwcSkeletonBar className="h-3 w-1/4" />
          </div>
        </div>
      ))}
      <AwcSkeletonStatus label={label} />
    </div>
  );
}
