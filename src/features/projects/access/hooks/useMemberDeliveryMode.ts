"use client";

import { useState } from "react";

import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import { formatAwcGrokWakeCopy } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { saveMemberDeliveryMode } from "@/features/projects/access/utils/projectDeliveryModeApi";

type Mode = "webhook" | "poll";

/** Owner switch state: optimistic mode until the next Access poll, plus toast/error. */
export const useMemberDeliveryMode = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly memberName: string | null;
  readonly initialMode: Mode;
}) => {
  const [mode, setMode] = useState<Mode>(input.initialMode);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Snapshot poll / wake-link save (auto-flip to webhook) wins over local state.
  const [seenInitial, setSeenInitial] = useState<Mode>(input.initialMode);
  if (seenInitial !== input.initialMode) {
    setSeenInitial(input.initialMode);
    setMode(input.initialMode);
  }
  const copy = AWC_DELIVERY_MODE_COPY;
  const choose = (next: Mode) => {
    if (next === mode || saving) return;
    setSaving(true);
    setToast(null);
    setError(null);
    void saveMemberDeliveryMode(input.projectId, input.membershipId, next)
      .then((result) => {
        if (result.ok !== true) {
          setError(result.errorMessage ?? copy.error);
          return;
        }
        setMode(next);
        setToast(
          formatAwcGrokWakeCopy(
            next === "poll" ? copy.toastPoll : copy.toastWebhook,
            input.memberName,
          ),
        );
      })
      .catch(() => setError(copy.error))
      .finally(() => setSaving(false));
  };
  return { mode, saving, toast, error, choose };
};
