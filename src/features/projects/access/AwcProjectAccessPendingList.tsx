"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface PendingRequest {
  readonly id: string;
  readonly requesterUserId: string;
  readonly reason: string | null;
}

interface AwcProjectAccessPendingListProps {
  readonly pending: readonly PendingRequest[];
  readonly onApprove: (requestId: string) => void;
  readonly onDeny: (requestId: string) => void;
}

export default function AwcProjectAccessPendingList({
  pending,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.pendingHeading}
      </h3>
      {pending.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.pendingEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {pending.map((req) => (
            <li
              key={req.id}
              className="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span className="text-gray-800 dark:text-white/90">
                {req.requesterUserId}
                {req.reason ? ` — ${req.reason}` : ""}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                  onClick={() => onApprove(req.id)}
                >
                  {copy.approve}
                </button>
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs"
                  onClick={() => onDeny(req.id)}
                >
                  {copy.deny}
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
