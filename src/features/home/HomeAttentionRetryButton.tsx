"use client";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";

/**
 * afae8216: a Failed run stays retryable from Home. Opens its floater on the
 * ended run, where Retry starts it again.
 */
export default function HomeAttentionRetryButton({
  runId,
  title,
}: {
  readonly runId: string;
  readonly title: string;
}) {
  const { expandRunningSendTask } = useSendTaskModal();
  return (
    <button
      type="button"
      onClick={() => expandRunningSendTask(runId)}
      className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
    >
      Retry<span className="sr-only"> {title}</span>
    </button>
  );
}
