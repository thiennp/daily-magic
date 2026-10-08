"use client";

import { useState } from "react";

import AwcWakeConnectPasteCard from "@/features/projects/access/AwcWakeConnectPasteCard";
import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { savePendingRequestWakeLink } from "@/features/projects/access/utils/projectGrokWebhookApi";

interface AwcPendingWakeSetupProps {
  readonly projectId: string;
  readonly requestId: string;
  readonly memberName: string;
  /** Server says a wake link is already registered for this request. */
  readonly ready: boolean;
}

/** Optional "Set up wake link" disclosure on a pending assistant card; approving never needs it. */
export default function AwcPendingWakeSetup(p: AwcPendingWakeSetupProps) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const isReady = p.ready || saved;
  return (
    <div className="space-y-2" data-pending-wake-setup>
      <div className="flex flex-wrap items-center gap-2">
        {isReady ? (
          <span className="text-xs text-awc-fg-muted" role="status">
            {C.wakeReady}
          </span>
        ) : null}
        <button
          type="button"
          className="awc-focus-ring text-xs font-medium text-awc-fg-muted underline"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {isReady ? C.wakeChange : C.wakeSetup}
        </button>
      </div>
      {open ? (
        <AwcWakeConnectPasteCard
          projectId={p.projectId}
          membershipId={p.requestId}
          memberName={p.memberName}
          save={(body) =>
            savePendingRequestWakeLink(p.projectId, p.requestId, body)
          }
          onSaved={() => {
            setSaved(true);
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
