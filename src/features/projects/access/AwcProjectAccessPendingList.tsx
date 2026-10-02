"use client";

import { useEffect, useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
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
    let cancelled = false;
    void fetchDisplayNamePresets(projectId).then((payload) => {
      if (cancelled) return;
      setAvailable(payload.available ?? payload.presets ?? []);
      setSuggested(payload.suggested ?? "");
    });
    return () => {
      cancelled = true;
    };
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
          {pending.map((req) => {
            const needsName = req.requesterIsAgent !== false;
            return (
              <li
                key={req.id}
                className="rounded-md border border-gray-200/80 p-2 dark:border-gray-800/80"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-gray-800 dark:text-white/90">
                    {req.requesterLabel ?? req.requesterUserId}
                    {req.requesterIsAgent ? " (agent)" : ""}
                    {req.reason ? ` — ${req.reason}` : ""}
                  </span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                      onClick={() => {
                        void (async () => {
                          if (needsName && !(names[req.id] ?? "").trim()) {
                            setErrors((e) => ({
                              ...e,
                              [req.id]: copy.displayNameRequired,
                            }));
                            return;
                          }
                          const result = await onApprove(
                            req.id,
                            needsName ? names[req.id] : undefined,
                          );
                          if (!result.ok) {
                            const msg =
                              result.errorMessage === "display_name_taken"
                                ? copy.displayNameTaken
                                : (result.errorMessage ?? "Failed.");
                            setErrors((e) => ({ ...e, [req.id]: msg }));
                            if (available.length > 0) {
                              const next =
                                available[
                                  Math.floor(Math.random() * available.length)
                                ];
                              if (next) {
                                setNames((n) => ({ ...n, [req.id]: next }));
                              }
                            }
                          } else {
                            setErrors((e) => {
                              const rest = { ...e };
                              delete rest[req.id];
                              return rest;
                            });
                          }
                        })();
                      }}
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
                </div>
                {needsName ? (
                  <label className="mt-2 block text-xs text-gray-600 dark:text-gray-300">
                    {copy.displayNameLabel}
                    <input
                      className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
                      value={names[req.id] ?? ""}
                      list={`display-name-presets-${req.id}`}
                      onChange={(event) => {
                        setNames((n) => ({
                          ...n,
                          [req.id]: event.target.value,
                        }));
                      }}
                    />
                    <datalist id={`display-name-presets-${req.id}`}>
                      {available.map((name) => (
                        <option key={name} value={name} />
                      ))}
                    </datalist>
                    <span className="mt-1 block text-[11px] text-gray-500">
                      {copy.displayNameHint}
                    </span>
                    {errors[req.id] ? (
                      <span className="mt-1 block text-[11px] text-red-600">
                        {errors[req.id]}
                      </span>
                    ) : null}
                  </label>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
