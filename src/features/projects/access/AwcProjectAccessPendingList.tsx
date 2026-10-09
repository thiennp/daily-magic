"use client";

import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  useAwcProjectAccessPendingListState,
  type AwcPendingListActions,
  type AwcPendingResolved,
} from "@/features/projects/access/hooks/useAwcProjectAccessPendingListState";
import {
  useNotifyPendingIdle,
  usePendingResolvedCollapse,
} from "@/features/projects/access/hooks/usePendingResolvedCollapse";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface AwcProjectAccessPendingListProps extends AwcPendingListActions {
  readonly projectId: string;
  readonly pending: readonly AwcProjectAccessPending[];
  /** Members rail (DF-036): render nothing when no request is open or recently resolved. */
  readonly hideWhenIdle?: boolean;
  /** DF-036 F11: called once nothing is open or resolved, so the rail can unmount the section. */
  readonly onIdle?: () => void;
}

type ResolvedRowProps = {
  readonly done: AwcPendingResolved;
  readonly collapsing: boolean;
};

const ResolvedRow = ({ done, collapsing }: ResolvedRowProps) => (
  <AwcPendingResolvedRow
    decision={done.decision}
    nickname={done.nickname}
    requester={done.requester}
    collapsing={collapsing}
  />
);

export default function AwcProjectAccessPendingList({
  projectId,
  pending,
  onApprove,
  onDeny,
  hideWhenIdle = false,
  onIdle,
}: AwcProjectAccessPendingListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const list = useAwcProjectAccessPendingListState({
    projectId,
    pending,
    onApprove,
    onDeny,
  });
  const { collapsing, collapsed } = usePendingResolvedCollapse(list.resolved);
  const resolved = list.resolved.filter((r) => !collapsed.has(r.id));
  const shown = pending.filter((r) => !collapsed.has(r.id));

  const resolvedById = new Map(resolved.map((r) => [r.id, r]));
  const pendingIds = new Set(pending.map((r) => r.id));
  const openCount = shown.filter((r) => !resolvedById.has(r.id)).length;
  const goneResolved = resolved.filter((r) => !pendingIds.has(r.id));
  const idle = openCount === 0 && resolved.length === 0;
  useNotifyPendingIdle(hideWhenIdle && idle, onIdle);
  if (hideWhenIdle && idle) return null;

  return (
    <div>
      {openCount > 0 ? (
        <div className="flex items-baseline justify-between px-1">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
            {copy.pendingHeading}
          </h4>
          <span className="text-xs font-semibold tabular-nums text-awc-fg-muted">
            {openCount}
          </span>
        </div>
      ) : null}
      {shown.length === 0 && resolved.length === 0 ? (
        <p className="mt-1 text-sm text-awc-fg-muted">{copy.pendingEmpty}</p>
      ) : (
        <ul className="@container mt-2 space-y-3">
          {shown.map((req) => {
            const done = resolvedById.get(req.id);
            if (done)
              return (
                <ResolvedRow
                  key={req.id}
                  done={done}
                  collapsing={collapsing.has(req.id)}
                />
              );
            return (
              <AwcProjectAccessPendingRow
                key={req.id}
                req={req}
                projectId={projectId}
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
            <ResolvedRow
              key={done.id}
              done={done}
              collapsing={collapsing.has(done.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
