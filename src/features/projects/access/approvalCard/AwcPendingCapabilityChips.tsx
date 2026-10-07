"use client";

import { useState } from "react";

import AwcPendingCapabilityIcon from "@/features/projects/access/approvalCard/AwcPendingCapabilityIcon";
import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  PENDING_CAPABILITIES_VISIBLE,
  type PendingCapability,
} from "@/features/projects/access/approvalCard/pendingCapabilities";

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-awc-border bg-awc-bg py-1 pl-2 pr-2.5 text-[13px] text-awc-fg";
const MORE =
  "awc-focus-ring rounded-full border border-dashed border-awc-border-strong bg-transparent px-2.5 py-1 text-[13px] font-semibold text-awc-primary transition hover:border-awc-primary";

/** "If you approve, it can" — 4 chips, then "+N more" / "Show less". */
export default function AwcPendingCapabilityChips({
  capabilities,
}: {
  readonly capabilities: readonly PendingCapability[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hidden = capabilities.length - PENDING_CAPABILITIES_VISIBLE;
  const shown =
    expanded || hidden <= 0
      ? capabilities
      : capabilities.slice(0, PENDING_CAPABILITIES_VISIBLE);
  return (
    <div data-pending-capabilities>
      <p className="mb-2.5 text-[13px] font-semibold text-awc-fg">
        {C.canDoLabel}
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {shown.map((cap) => (
          <li key={cap.label} className={CHIP}>
            <AwcPendingCapabilityIcon icon={cap.icon} />
            {cap.label}
          </li>
        ))}
        {hidden > 0 ? (
          <li>
            <button
              type="button"
              className={MORE}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded
                ? C.showLess
                : C.showMore.replace("{count}", String(hidden))}
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
