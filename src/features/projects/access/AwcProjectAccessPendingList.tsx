"use client";

import { useEffect, useState } from "react";

import { pendingAssistantName } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { usePendingDecisionNote } from "@/features/projects/access/approvalCard/usePendingDecisionNote";
import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { runPendingApprove } from "@/features/projects/access/runPendingApprove";
import { fetchDisplayNamePresets } from "@/features/projects/access/utils/projectAccessApi";

type PendingRequest = AwcProjectAccessPending;

interface AwcProjectAccessPendingListProps {
  readonly projectId: string;
  readonly pending: readonly PendingRequest[];
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  /** Resolve true on success to show the COPY.md denied toast. */
  readonly onDeny: (requestId: string) => void | Promise<boolean>;
}

export default function AwcProjectAccessPendingList({
  projectId,
  pending,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [names, setNames] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggested, setSuggested] = useState<string>("");
  const [available, setAvailable] = useState<readonly string[]>([]);
  const decision = usePendingDecisionNote();

  useEffect(() => {
    const controller = new AbortController();
    void fetchDisplayNamePresets(projectId).then((payload) => {
      if (controller.signal.aborted) return;
      setAvailable(payload.available ?? payload.presets ?? []);
      setSuggested(payload.suggested ?? "");
    });
    return () => controller.abort();
  }, [projectId, pending.length]);

  const nameFor = (req: PendingRequest): string =>
    names[req.id] ??
    (req.suggestedProjectDisplayName &&
    req.suggestedProjectDisplayName.trim().length > 0
      ? req.suggestedProjectDisplayName.trim()
      : req.requesterIsAgent !== false
        ? suggested
        : "");

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
        {copy.pendingHeading}
      </h4>
      {decision.note !== null ? (
        <p
          role="status"
          className="mt-1 text-[12px] text-awc-fg-muted dark:text-gray-300"
        >
          {decision.note}
        </p>
      ) : null}
      {pending.length === 0 ? (
        <p className="mt-1 text-sm text-awc-fg-muted">{copy.pendingEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {pending.map((req) => (
            <AwcProjectAccessPendingRow
              key={req.id}
              req={req}
              nameValue={nameFor(req)}
              error={errors[req.id] ?? null}
              available={available}
              onNameChange={(value) =>
                setNames((n) => ({ ...n, [req.id]: value }))
              }
              onDeny={() => decision.deny(req, () => onDeny(req.id))}
              onApprove={() => {
                void runPendingApprove({
                  requestId: req.id,
                  needsName: req.requesterIsAgent !== false,
                  nameValue: nameFor(req),
                  available,
                  onApprove: (id, name) =>
                    decision.approve(name ?? pendingAssistantName(req), () =>
                      onApprove(id, name),
                    ),
                  setError: (message) => {
                    setErrors((e) => {
                      if (message === null) {
                        const rest = { ...e };
                        delete rest[req.id];
                        return rest;
                      }
                      return { ...e, [req.id]: message };
                    });
                  },
                  setName: (name) =>
                    setNames((n) => ({ ...n, [req.id]: name })),
                });
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
