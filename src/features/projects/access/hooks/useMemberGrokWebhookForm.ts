"use client";

import { useCallback, useRef, useState } from "react";

import { AWC_GROK_WAKE_AWAITING_COPY } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import {
  fetchMemberGrokWebhookStatus,
  saveMemberGrokWebhook,
  type ProjectGrokWebhookStatusView,
} from "@/features/projects/access/utils/projectGrokWebhookApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** Codes where the pasted wake link / key itself was rejected → Product "copy it again" line. */
const PASTE_REJECTED_CODES: ReadonlySet<string> = new Set([
  "invalid_url",
  "https_only",
  "blocked_host",
  "invalid_bearer",
]);

/** Save failure → owner-facing line (never webhook/API jargon for a bad paste). */
export const mapWakeLinkSaveError = (
  code: string | null | undefined,
): string => {
  const error = AWC_GROK_WAKE_AWAITING_COPY.error;
  const trimmed = code?.trim() ?? "";
  if (trimmed.length === 0 || PASTE_REJECTED_CODES.has(trimmed)) {
    return error;
  }
  return mapProjectAccessError(trimmed, error);
};

/** State for the owner secret form. The key is cleared after every save attempt. */
export const useMemberGrokWebhookForm = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly onSaved?: (membershipId: string) => void;
}) => {
  const { projectId, membershipId, onSaved } = input;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ProjectGrokWebhookStatusView | null>(
    null,
  );
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookKey, setWebhookKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const openRef = useRef(false);

  const loadStatus = useCallback(() => {
    setStatus(null);
    void fetchMemberGrokWebhookStatus(projectId, membershipId)
      .then(setStatus)
      .catch(() => setStatus({ grokWebhookRegistered: false }));
  }, [projectId, membershipId]);

  const setOpenState = useCallback((next: boolean) => {
    openRef.current = next;
    setOpen(next);
    setError(null);
    setSaved(false);
  }, []);

  /** Deep link / "Add wake link": expand (no-op if already open). */
  const openForm = useCallback(() => {
    if (openRef.current) return;
    setOpenState(true);
    loadStatus();
  }, [loadStatus, setOpenState]);

  const toggle = () => {
    const next = !openRef.current;
    setOpenState(next);
    if (next) loadStatus();
  };

  const save = () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    void saveMemberGrokWebhook(projectId, membershipId, {
      webhookUrl,
      webhookKey,
    })
      .then((result) => {
        if (!result.ok) {
          setError(mapWakeLinkSaveError(result.errorMessage));
          return;
        }
        setStatus(result);
        setWebhookUrl("");
        setSaved(true);
        onSaved?.(membershipId);
      })
      .catch(() => setError(AWC_GROK_WAKE_AWAITING_COPY.error))
      .finally(() => {
        setWebhookKey("");
        setSaving(false);
      });
  };

  return {
    open,
    status,
    webhookUrl,
    webhookKey,
    saving,
    error,
    saved,
    setWebhookUrl,
    setWebhookKey,
    toggle,
    openForm,
    save,
  };
};
