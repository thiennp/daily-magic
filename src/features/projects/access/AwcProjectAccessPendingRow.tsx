"use client";

import AwcPendingApprovalDetails from "@/features/projects/access/approvalCard/AwcPendingApprovalDetails";
import { pendingAssistantName } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";

type PendingRequest = Pick<
  AwcProjectAccessPending,
  "id" | "requesterUserId" | "reason" | "requesterIsAgent" | "requesterLabel"
> &
  Pick<AwcProjectAccessPending, "approvalCard" | "suggestedProjectDisplayName">;

interface AwcProjectAccessPendingRowProps {
  readonly req: PendingRequest;
  readonly nameValue: string;
  readonly error: string | null;
  readonly available: readonly string[];
  readonly onNameChange: (value: string) => void;
  readonly onApprove: () => void;
  readonly onDeny: () => void;
}

const BTN_DENY =
  "awc-focus-ring inline-flex items-center justify-center rounded-lg border border-awc-border-strong bg-awc-surface px-3 py-1.5 text-[13px] font-semibold text-awc-fg transition hover:bg-awc-tile";
const BTN_APPROVE =
  "awc-focus-ring inline-flex items-center justify-center rounded-lg border border-awc-blue-600 bg-awc-primary px-3 py-1.5 text-[13px] font-semibold text-white transition hover:opacity-90";

/** State 2 — assistant name + Wants to join; Deny + Approve (server logic unchanged). */
export default function AwcProjectAccessPendingRow({
  req,
  nameValue,
  error,
  available,
  onNameChange,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingRowProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const needsName = req.requesterIsAgent !== false;
  const title =
    req.requesterLabel?.trim() ||
    req.suggestedProjectDisplayName?.trim() ||
    req.requesterUserId;
  const initial = title.slice(0, 1).toUpperCase();

  return (
    <li className="rounded-[10px] border border-awc-accent-soft-2 bg-awc-accent-soft p-2.5">
      <div className="flex flex-wrap items-center gap-2.5 text-sm">
        <span
          className="grid size-8 shrink-0 place-items-center rounded-full bg-awc-tile-2 text-[13px] font-semibold text-awc-fg-muted"
          aria-hidden
        >
          {initial}
        </span>
        <span className="min-w-0 flex-1 text-awc-fg">
          <span className="block truncate font-semibold">{title}</span>
          <span className="mt-0.5 block text-[12.5px] font-normal text-awc-fg-subtle">
            {copy.requestWaitingApproval}
          </span>
          {req.approvalCard ? (
            <AwcPendingApprovalDetails
              assistantName={pendingAssistantName(req)}
              card={req.approvalCard}
            />
          ) : null}
        </span>
        <span className="flex shrink-0 gap-1.5">
          <button type="button" className={BTN_DENY} onClick={onDeny}>
            {copy.deny}
          </button>
          <button type="button" className={BTN_APPROVE} onClick={onApprove}>
            {copy.approve}
          </button>
        </span>
      </div>
      {needsName ? (
        <label className="mt-2 block text-xs text-awc-fg-muted">
          {copy.displayNameLabel}
          <input
            className="mt-1 w-full rounded-md border border-awc-control-border bg-awc-surface px-2 py-1 text-sm text-awc-fg"
            value={nameValue}
            list={`display-name-presets-${req.id}`}
            onChange={(event) => onNameChange(event.target.value)}
          />
          <datalist id={`display-name-presets-${req.id}`}>
            {available.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          <span className="mt-1 block text-[11px] text-awc-fg-subtle">
            {copy.displayNameHint}
          </span>
          {error ? (
            <span className="mt-1 block text-[11px] text-awc-bad">{error}</span>
          ) : null}
        </label>
      ) : null}
    </li>
  );
}
