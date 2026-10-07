"use client";

import { useState } from "react";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import { mapWakeLinkSaveError } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import { parseWakeConnectPaste } from "@/features/projects/access/utils/parseWakeConnectPaste";
import { saveMemberGrokWebhook } from "@/features/projects/access/utils/projectGrokWebhookApi";

/**
 * One-box wake connect: parse the pasted link + key, then save through the
 * existing owner wake-link route. The pasted text is cleared after every send.
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

  const changeText = (value: string): void => {
    setText(value);
    setError(null);
    setSaved(false);
  };

  const save = (): void => {
    const parsed = parseWakeConnectPaste(text);
    if (!parsed.ok) {
      setError(parsed.error === "bad_link" ? C.badLink : C.missingKey);
      return;
    }
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

  return { text, saving, error, saved, changeText, save };
};
