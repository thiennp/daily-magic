"use client";

import AwcPendingApprovalDetails from "@/features/projects/access/approvalCard/AwcPendingApprovalDetails";
import { pendingAssistantName } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
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
  return (
    <li className="rounded-md border border-gray-200/80 p-2 dark:border-gray-800/80">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="min-w-0 text-gray-800 dark:text-white/90">
          <span className="block">
            {req.requesterLabel ?? req.requesterUserId}
            {req.requesterIsAgent ? " (assistant)" : ""}
            {req.reason ? ` — ${req.reason}` : ""}
          </span>
          <span className="mt-0.5 block text-[12px] font-normal text-gray-500 dark:text-gray-400">
            {copy.requestWaitingApproval}
          </span>
          {req.approvalCard ? (
            <AwcPendingApprovalDetails
              assistantName={pendingAssistantName(req)}
              card={req.approvalCard}
            />
          ) : null}
        </span>
        <span className="flex gap-2">
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.primary}
            onClick={onApprove}
          >
            {copy.approve}
          </button>
          <button
            type="button"
            className={AWC_PROJECT_ACCESS_CTA.secondary}
            onClick={onDeny}
          >
            {copy.deny}
          </button>
        </span>
      </div>
      {needsName ? (
        <label className="mt-2 block text-xs text-gray-600 dark:text-gray-300">
          {copy.displayNameLabel}
          <input
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
            value={nameValue}
            list={`display-name-presets-${req.id}`}
            onChange={(event) => onNameChange(event.target.value)}
          />
          <datalist id={`display-name-presets-${req.id}`}>
            {available.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          <span className="mt-1 block text-[11px] text-gray-500">
            {copy.displayNameHint}
          </span>
          {error ? (
            <span className="mt-1 block text-[11px] text-red-600">{error}</span>
          ) : null}
        </label>
      ) : null}
    </li>
  );
}
