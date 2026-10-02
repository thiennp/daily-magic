"use client";

import { useEffect, useState } from "react";

import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { runPendingApprove } from "@/features/projects/access/runPendingApprove";
import { fetchDisplayNamePresets } from "@/features/projects/access/utils/projectAccessApi";

interface PendingRequest {
  readonly id: string;
  readonly requesterUserId: string;
  readonly reason: string | null;
  readonly requesterIsAgent?: boolean;
  readonly requesterLabel?: string | null;
}

interface AwcProjectAccessPendingListProps {
  readonly projectId: string;
  readonly pending: readonly PendingRequest[];
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  readonly onDeny: (requestId: string) => void;
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

  useEffect(() => {
    const controller = new AbortController();
    void fetchDisplayNamePresets(projectId).then((payload) => {
      if (controller.signal.aborted) return;
      setAvailable(payload.available ?? payload.presets ?? []);
      setSuggested(payload.suggested ?? "");
    });
    return () => controller.abort();
  }, [projectId, pending.length]);

  useEffect(() => {
    if (!suggested) return;
    setNames((prev) => {
      const next = { ...prev };
      for (const req of pending) {
        if (req.requesterIsAgent !== false && !next[req.id]) {
          next[req.id] = suggested;
        }
      }
      return next;
    });
  }, [suggested, pending]);

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.pendingHeading}
      </h3>
      {pending.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.pendingEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {pending.map((req) => (
            <AwcProjectAccessPendingRow
              key={req.id}
              req={req}
              nameValue={names[req.id] ?? ""}
              error={errors[req.id] ?? null}
              available={available}
              onNameChange={(value) =>
                setNames((n) => ({ ...n, [req.id]: value }))
              }
              onDeny={() => onDeny(req.id)}
              onApprove={() => {
                void runPendingApprove({
                  requestId: req.id,
                  needsName: req.requesterIsAgent !== false,
                  nameValue: names[req.id] ?? "",
                  available,
                  onApprove,
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
