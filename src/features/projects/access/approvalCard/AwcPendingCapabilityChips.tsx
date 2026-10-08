"use client";

import { useState } from "react";

import AwcPendingCapabilityIcon from "@/features/projects/access/approvalCard/AwcPendingCapabilityIcon";
import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import type { PendingCapability } from "@/features/projects/access/approvalCard/pendingCapabilities";

const TAG =
  "flex min-w-0 items-center gap-1.5 rounded-[9px] border border-awc-accent-soft-2 bg-awc-surface px-2 py-1.5 text-[12.5px] text-awc-fg";
const MODE =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-accent-soft-2 bg-awc-surface px-2.5 py-1 text-[12.5px] text-awc-fg";
const DETAILS =
  "awc-focus-ring text-[13px] font-semibold text-awc-primary underline-offset-2 hover:underline";

/** Design v2: four short capability tags in two columns, the join mode as a pill, then Show details (full sentence). */
export default function AwcPendingCapabilityChips({
  capabilities,
  mode = null,
}: {
  readonly capabilities: readonly PendingCapability[];
  readonly mode?: string | null;
}) {
  const [details, setDetails] = useState(false);
  return (
    <div className="grid gap-2.5" data-pending-capabilities>
      <ul
        className="m-0 grid list-none grid-cols-2 gap-1.5 p-0"
        aria-label={C.canDoLabel}
      >
        {capabilities.map((cap) => (
          <li key={cap.label} className={TAG}>
            <AwcPendingCapabilityIcon icon={cap.icon} />
            <span className="min-w-0">{cap.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {mode ? (
          <span className={MODE} data-pending-mode>
            <AwcPendingCapabilityIcon icon="clock" />
            {mode}
          </span>
        ) : null}
        <button
          type="button"
          className={DETAILS}
          aria-expanded={details}
          onClick={() => setDetails((v) => !v)}
        >
          {details ? C.hideDetails : C.showDetails}
        </button>
      </div>
      <p
        className="text-[13px] text-awc-fg-muted"
        hidden={!details}
        data-pending-details
      >
        {C.canDoBody}
      </p>
    </div>
  );
}
