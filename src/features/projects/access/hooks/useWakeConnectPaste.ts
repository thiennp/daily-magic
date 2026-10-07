"use client";

import { useState } from "react";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { mapWakeLinkSaveError } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import { detectWakeConnectPaste } from "@/features/projects/access/utils/detectWakeConnectPaste";
import { parseWakeConnectPaste } from "@/features/projects/access/utils/parseWakeConnectPaste";
import { saveMemberGrokWebhook } from "@/features/projects/access/utils/projectGrokWebhookApi";

/**
 * One-box wake connect: detect the pasted link + key as you type (Connect is
 * ready only when both are found), then save through the existing owner
 * wake-link route. The pasted text is cleared after every send.
 */
export const useWakeConnectPaste = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly onSaved?: (membershipId: string) => void;
}) => {
  const { projectId, membershipId, onSaved } = input;
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const found = detectWakeConnectPaste(text);

  const changeText = (value: string): void => {
    setText(value);
    setError(null);
    setSaved(false);
  };

  const save = (): void => {
    const parsed = parseWakeConnectPaste(text);
    if (!found.ready || !parsed.ok) return;
    setSaving(true);
    setError(null);
    void saveMemberGrokWebhook(projectId, membershipId, parsed)
      .then((result) => {
        if (!result.ok) {
          setError(mapWakeLinkSaveError(result.errorMessage));
          return;
        }
        setSaved(true);
        onSaved?.(membershipId);
      })
      .catch(() => setError(AWC_GROK_WAKE_AWAITING_COPY.error))
      .finally(() => {
        setText("");
        setSaving(false);
      });
  };

  return { text, found, saving, error, saved, changeText, save };
};
