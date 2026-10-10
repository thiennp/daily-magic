"use client";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { useRetryRunInComposer } from "@/features/agent/hooks/public-api/presentation";

/**
 * afae8216: a Failed run stays retryable from Home. 7a3086f1: Retry opens
 * New task prefilled with the run's ask, computer and writer.
 */
export default function HomeAttentionRetryButton({
  runId,
  title,
}: {
  readonly runId: string;
  readonly title: string;
}) {
  const retryRun = useRetryRunInComposer();
  return (
    <button
      type="button"
      onClick={() => retryRun(runId)}
      className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
    >
      Retry<span className="sr-only"> {title}</span>
    </button>
  );
}
