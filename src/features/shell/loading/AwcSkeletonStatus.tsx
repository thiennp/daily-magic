import { AWC_ROUTE_LOADING_LABEL } from "@/features/shell/loading/awcSkeleton.constant";

/** Screen-reader status for a skeleton region. */
export default function AwcSkeletonStatus({
  label = AWC_ROUTE_LOADING_LABEL,
}: {
  readonly label?: string;
}) {
  return (
    <span className="sr-only" role="status">
      {label}
    </span>
  );
}
