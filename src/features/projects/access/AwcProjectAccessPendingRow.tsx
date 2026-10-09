"use client";

import AwcPendingCapabilityChips from "@/features/projects/access/approvalCard/AwcPendingCapabilityChips";
import AwcPendingWakeSetup from "@/features/projects/access/approvalCard/AwcPendingWakeSetup";
import AwcPendingNicknameField from "@/features/projects/access/approvalCard/AwcPendingNicknameField";
import AwcPendingRequestActions, {
  type PendingBusy,
} from "@/features/projects/access/approvalCard/AwcPendingRequestActions";
import AwcPendingRequestHeader from "@/features/projects/access/approvalCard/AwcPendingRequestHeader";
import {
  pendingCapabilities,
  pendingModeLabel,
} from "@/features/projects/access/approvalCard/pendingCapabilities";
import {
  pendingNicknameHelp,
  pendingNicknameIssue,
} from "@/features/projects/access/approvalCard/pendingNickname";
import type { PendingRequest } from "@/features/projects/access/approvalCard/pendingRequest.type";

interface AwcProjectAccessPendingRowProps {
  readonly req: PendingRequest;
  readonly projectId?: string;
  readonly nameValue: string;
  readonly error: string | null;
  readonly available: readonly string[];
  readonly busy?: PendingBusy;
  readonly onNameChange: (value: string) => void;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
}

const SECTION = "px-4 py-4 @min-[520px]:px-5 @min-[520px]:py-[18px]";

/** DF-017 pending join card: who → what it can do → name → decide (stacked, full width). */
export default function AwcProjectAccessPendingRow({
  req,
  projectId,
  nameValue,
  error,
  available,
  busy = null,
  onNameChange,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingRowProps) {
  const isAssistant = req.requesterIsAgent !== false;
  const title =
    req.requesterLabel?.trim() ||
    req.suggestedProjectDisplayName?.trim() ||
    req.requesterUserId;
  const issue = isAssistant ? pendingNicknameIssue(nameValue) : null;
  const shownError = error ?? (nameValue.trim().length > 0 ? issue : null);

  return (
    <li
      className="grid divide-y divide-awc-accent-soft-2 overflow-visible rounded-awc-card border border-awc-accent-soft-2 bg-gradient-to-b from-awc-accent-soft to-awc-surface shadow-awc-lift"
      aria-labelledby={`pending-who-${req.id}`}
      data-pending-approval-card
    >
      <div className={SECTION}>
        <AwcPendingRequestHeader
          requestId={req.id}
          title={title}
          isAssistant={isAssistant}
          createdAt={req.createdAt}
          card={req.approvalCard}
        />
      </div>
      {isAssistant ? (
        <div className={SECTION}>
          <AwcPendingCapabilityChips
            capabilities={pendingCapabilities(req.approvalCard)}
            mode={pendingModeLabel(req.approvalCard)}
          />
        </div>
      ) : null}
      {isAssistant ? (
        <div className={SECTION}>
          <AwcPendingNicknameField
            requestId={req.id}
            value={nameValue}
            error={shownError}
            help={pendingNicknameHelp(nameValue, req.requesterLabel)}
            available={available}
            onChange={onNameChange}
            onSubmit={() => {
              if (issue === null && busy === null) onApprove();
            }}
          />
        </div>
      ) : null}
      {isAssistant && projectId !== undefined ? (
        <div className={SECTION}>
          <AwcPendingWakeSetup
            projectId={projectId}
            requestId={req.id}
            memberName={nameValue.trim() || title}
            ready={req.wakeLinkSet === true}
          />
        </div>
      ) : null}
      <div className={SECTION}>
        <AwcPendingRequestActions
          busy={busy}
          approveDisabled={issue !== null}
          onApprove={onApprove}
          onDeny={onDeny}
        />
      </div>
    </li>
  );
}
