"use client";

import { useState } from "react";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { mapWakeLinkSaveError } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import {
  saveMemberGrokWebhook,
  type ProjectGrokWebhookStatusView,
} from "@/features/projects/access/utils/projectGrokWebhookApi";
import {
  checkWakeKeyField,
  checkWakeUrlField,
  splitPastedWakeUrlAndKey,
} from "@/features/projects/access/utils/wakeConnectFields";

export type WakeConnectSave = (body: {
  readonly webhookUrl: string;
  readonly webhookKey: string;
}) => Promise<ProjectGrokWebhookStatusView>;

/**
 * Wake connect with two separate fields (link, key): per-field validation,
 * Connect ready only when both are valid. The key is cleared after every send.
 * `targetId` is the membership id (default save) or the pending request id.
 */
export const useWakeConnectFields = (input: {
  readonly projectId: string;
  readonly targetId: string;
  readonly onSaved?: (targetId: string) => void;
  readonly save?: WakeConnectSave;
}) => {
  const { projectId, targetId, onSaved } = input;
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const urlCheck = checkWakeUrlField(url);
  const keyCheck = checkWakeKeyField(key);
  const ready = urlCheck.site !== null && keyCheck.ok;

  const touch = (): void => {
    setError(null);
    setSaved(false);
  };
  const changeUrl = (value: string): void => {
    touch();
    const both = splitPastedWakeUrlAndKey(value);
    if (both !== null && key.trim() === "") {
      setUrl(both.url);
      setKey(both.key);
      return;
    }
    setUrl(value);
  };
  const changeKey = (value: string): void => {
    touch();
    setKey(value);
  };

  const save = (): void => {
    if (!ready) return;
    const send: WakeConnectSave =
      input.save ??
      ((body) => saveMemberGrokWebhook(projectId, targetId, body));
    setSaving(true);
    setError(null);
    void send({ webhookUrl: url.trim(), webhookKey: key.trim() })
      .then((result) => {
        if (!result.ok) {
          setError(mapWakeLinkSaveError(result.errorMessage));
          return;
        }
        setSaved(true);
        setUrl("");
        onSaved?.(targetId);
      })
      .catch(() => setError(AWC_GROK_WAKE_AWAITING_COPY.error))
      .finally(() => {
        setKey("");
        setSaving(false);
      });
  };

  return {
    url,
    key,
    urlCheck,
    keyCheck,
    ready,
    saving,
    error,
    saved,
    changeUrl,
    changeKey,
    save,
  };
};
