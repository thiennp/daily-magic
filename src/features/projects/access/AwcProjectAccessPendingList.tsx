"use client";

import { useCallback, useEffect, useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type {
  AwcAccessActionResult,
  AwcPendingRequestView,
} from "@/features/projects/access/types/awcProjectAccessContract.type";
import { fetchDisplayNamePresets } from "@/features/projects/access/utils/projectDisplayNamePresetsApi";
import { pickRandomAvailableDisplayName } from "@/features/projects/access/utils/projectDisplayName.helpers";

interface AwcProjectAccessPendingListProps {
  readonly projectId: string;
  readonly pending: readonly AwcPendingRequestView[];
  readonly onApprove: (input: {
    readonly requestId: string;
    readonly requesterIsAgent: boolean;
    readonly projectDisplayName?: string;
  }) => Promise<AwcAccessActionResult>;
  readonly onDeny: (requestId: string) => void;
}

export default function AwcProjectAccessPendingList({
  projectId,
  pending,
  onApprove,
  onDeny,
}: AwcProjectAccessPendingListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [available, setAvailable] = useState<readonly string[]>([]);
  const [namesByRequest, setNamesByRequest] = useState<
    Record<string, string>
  >({});
  const [rowError, setRowError] = useState<Record<string, string>>({});
  const [presetsError, setPresetsError] = useState<string | null>(null);

  const loadPresets = useCallback(async () => {
    const result = await fetchDisplayNamePresets(projectId);
    if (!result.ok) {
      setPresetsError(result.errorMessage);
      setAvailable([]);
      return;
    }
    setPresetsError(null);
    setAvailable(result.data.available);
    setNamesByRequest((prev) => {
      const next = { ...prev };
      for (const req of pending) {
        if (req.requesterIsAgent && !next[req.id]) {
          next[req.id] = result.data.suggested;
        }
      }
      return next;
    });
  }, [projectId, pending]);

  useEffect(() => {
    if (pending.some((req) => req.requesterIsAgent)) {
      void loadPresets();
    }
  }, [pending, loadPresets]);

  const reroll = (requestId: string) => {
    const pick = pickRandomAvailableDisplayName(available);
    if (pick) {
      setNamesByRequest((prev) => ({ ...prev, [requestId]: pick }));
      setRowError((prev) => {
        const next = { ...prev };
        delete next[requestId];
        return next;
      });
    }
  };

  const handleApprove = async (req: AwcPendingRequestView) => {
    const projectDisplayName = namesByRequest[req.id];
    const result = await onApprove({
      requestId: req.id,
      requesterIsAgent: req.requesterIsAgent,
      projectDisplayName,
    });
    if (!result.ok && result.code === "name_taken") {
      setRowError((prev) => ({
        ...prev,
        [req.id]: copy.displayNameTaken,
      }));
      const pick = pickRandomAvailableDisplayName(
        available.filter(
          (name) =>
            name.toLocaleLowerCase("en-US") !==
            (projectDisplayName ?? "").toLocaleLowerCase("en-US"),
        ),
      );
      if (pick) {
        setNamesByRequest((prev) => ({ ...prev, [req.id]: pick }));
      }
      await loadPresets();
      return;
    }
    if (!result.ok) {
      setRowError((prev) => ({
        ...prev,
        [req.id]: result.errorMessage || copy.displayNameMissing,
      }));
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.pendingHeading}
      </h3>
      {presetsError ? (
        <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
          {presetsError}
        </p>
      ) : null}
      {pending.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.pendingEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {pending.map((req) => (
            <li
              key={req.id}
              className="space-y-2 rounded-md border border-gray-200/70 p-2 text-sm dark:border-gray-800/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-gray-800 dark:text-white/90">
                  {req.requesterLabel || req.requesterUserId}
                  {req.requesterIsAgent ? " · agent" : ""}
                  {req.reason ? ` — ${req.reason}` : ""}
                </span>
                <span className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                    onClick={() => void handleApprove(req)}
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
              {req.requesterIsAgent ? (
                <div className="space-y-1">
                  <label className="block text-xs text-gray-600 dark:text-gray-400">
                    {copy.displayNameLabel}
                    <input
                      className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
                      value={namesByRequest[req.id] ?? ""}
                      onChange={(event) =>
                        setNamesByRequest((prev) => ({
                          ...prev,
                          [req.id]: event.target.value,
                        }))
                      }
                      placeholder={copy.displayNameHint}
                    />
                  </label>
                  <p className="text-[0.6875rem] text-gray-500">
                    {copy.displayNameHint}
                  </p>
                  <button
                    type="button"
                    className="text-xs text-brand-600 underline"
                    onClick={() => reroll(req.id)}
                  >
                    {copy.displayNameReroll}
                  </button>
                  {rowError[req.id] ? (
                    <p className="text-xs text-red-600">{rowError[req.id]}</p>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
