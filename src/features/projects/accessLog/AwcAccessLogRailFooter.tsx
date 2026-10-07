"use client";

import { useState } from "react";

import AwcAccessLogPanel from "@/features/projects/accessLog/AwcAccessLogPanel";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";

interface AwcAccessLogRailFooterProps {
  readonly projectId: string;
}

/**
 * Members-rail footer — opens Access log modal. Mount only under OwnerContent
 * (non-owners never see this path).
 */
export default function AwcAccessLogRailFooter({
  projectId,
}: AwcAccessLogRailFooterProps) {
  const [open, setOpen] = useState(false);
  return (
    <section aria-label={C.ariaLabel} data-access-log-footer>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-3.5 text-left text-[13px] font-semibold text-awc-fg-muted transition hover:text-awc-fg dark:text-gray-400 dark:hover:text-gray-200"
      >
        {C.title}
      </button>
      <AwcAccessLogPanel
        projectId={projectId}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
