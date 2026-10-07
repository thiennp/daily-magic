"use client";

import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  useAwcProjectAccessPendingListState,
  type AwcPendingListActions,
  type AwcPendingResolved,
} from "@/features/projects/access/hooks/useAwcProjectAccessPendingListState";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface AwcProjectAccessPendingListProps extends AwcPendingListActions {
  readonly projectId: string;
  readonly pending: readonly AwcProjectAccessPending[];
}

const ResolvedRow = ({ done }: { readonly done: AwcPendingResolved }) => (
  <AwcPendingResolvedRow
    decision={done.decision}
    nickname={done.nickname}
    requester={done.requester}
  />
);

export default function AwcProjectAccessPendingList({
  projectId,
  pending,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const list = useAwcProjectAccessPendingListState({
    projectId,
    pending,
    onApprove,
    onDeny,
  });
  const { resolved } = list;

  const resolvedById = new Map(resolved.map((r) => [r.id, r]));
  const pendingIds = new Set(pending.map((r) => r.id));
  const openCount = pending.filter((r) => !resolvedById.has(r.id)).length;
  const goneResolved = resolved.filter((r) => !pendingIds.has(r.id));

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
          {copy.pendingHeading}
        </h4>
        {openCount > 0 ? (
          <span className="text-xs font-semibold tabular-nums text-awc-fg-muted">
            {openCount}
          </span>
        ) : null}
      </div>
      {pending.length === 0 && resolved.length === 0 ? (
        <p className="mt-1 text-sm text-awc-fg-muted">{copy.pendingEmpty}</p>
      ) : (
        <ul className="@container mt-2 space-y-3">
          {pending.map((req) => {
            const done = resolvedById.get(req.id);
            if (done) return <ResolvedRow key={req.id} done={done} />;
            return (
              <AwcProjectAccessPendingRow
                key={req.id}
                req={req}
                nameValue={list.nameFor(req)}
                error={list.errors[req.id] ?? null}
                available={list.available}
                busy={list.busy[req.id] ?? null}
                onNameChange={(value) => list.changeName(req.id, value)}
                onDeny={() => list.deny(req)}
                onApprove={() => list.approve(req)}
              />
            );
          })}
          {goneResolved.map((done) => (
            <ResolvedRow key={done.id} done={done} />
          ))}
        </ul>
      )}
    </div>
  );
}
