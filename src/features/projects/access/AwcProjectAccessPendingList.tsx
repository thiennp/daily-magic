"use client";

import { useEffect, useState } from "react";

import type { PendingBusy } from "@/features/projects/access/approvalCard/AwcPendingRequestActions";
import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import {
  pendingAssistantName,
  type PendingDecision,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { pendingNicknameDefault } from "@/features/projects/access/approvalCard/pendingNickname";
import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { runPendingApprove } from "@/features/projects/access/runPendingApprove";
import { fetchDisplayNamePresets } from "@/features/projects/access/utils/projectAccessApi";

type PendingRequest = AwcProjectAccessPending;

type Resolved = {
  readonly id: string;
  readonly decision: PendingDecision;
  readonly nickname: string;
  readonly requester: string;
};

interface AwcProjectAccessPendingListProps {
  readonly projectId: string;
  readonly pending: readonly PendingRequest[];
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  /** Resolve true on success to show the denied row. */
  readonly onDeny: (requestId: string) => void | Promise<boolean>;
}

const ResolvedRow = ({ done }: { readonly done: Resolved }) => (
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
  const [names, setNames] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<Record<string, PendingBusy>>({});
  const [resolved, setResolved] = useState<readonly Resolved[]>([]);
  const [suggested, setSuggested] = useState<string>("");
  const [available, setAvailable] = useState<readonly string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    void fetchDisplayNamePresets(projectId).then((payload) => {
      if (controller.signal.aborted) return;
      setAvailable(payload.available ?? payload.presets ?? []);
      setSuggested(payload.suggested ?? "");
    });
    return () => controller.abort();
  }, [projectId, pending.length]);

  // Typed → requesterLabel → suggestedProjectDisplayName → free preset.
  const nameFor = (req: PendingRequest): string =>
    names[req.id] ?? pendingNicknameDefault(req, suggested);

  const setBusyFor = (id: string, value: PendingBusy) =>
    setBusy((b) => ({ ...b, [id]: value }));
  const resolve = (entry: Resolved) =>
    setResolved((r) => [...r.filter((x) => x.id !== entry.id), entry]);
  const setErrorFor = (id: string, message: string | null) =>
    setErrors((e) => {
      if (message === null) {
        const rest = { ...e };
        delete rest[id];
        return rest;
      }
      return { ...e, [id]: message };
    });

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
            const needsName = req.requesterIsAgent !== false;
            return (
              <AwcProjectAccessPendingRow
                key={req.id}
                req={req}
                nameValue={nameFor(req)}
                error={errors[req.id] ?? null}
                available={available}
                busy={busy[req.id] ?? null}
                onNameChange={(value) => {
                  setNames((n) => ({ ...n, [req.id]: value }));
                  setErrorFor(req.id, null);
                }}
                onDeny={() => {
                  setBusyFor(req.id, "denying");
                  void Promise.resolve(onDeny(req.id)).then((ok) => {
                    setBusyFor(req.id, null);
                    if (ok === true) {
                      resolve({
                        id: req.id,
                        decision: "denied",
                        nickname: nameFor(req),
                        requester: pendingAssistantName(req),
                      });
                    }
                  });
                }}
                onApprove={() => {
                  const nickname = nameFor(req).trim();
                  setBusyFor(req.id, "approving");
                  void runPendingApprove({
                    requestId: req.id,
                    needsName,
                    nameValue: nickname,
                    onApprove,
                    setError: (message) => setErrorFor(req.id, message),
                  }).then((ok) => {
                    setBusyFor(req.id, null);
                    if (ok) {
                      resolve({
                        id: req.id,
                        decision: "approved",
                        nickname: needsName ? nickname : pendingAssistantName(req),
                        requester: pendingAssistantName(req),
                      });
                    }
                  });
                }}
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
