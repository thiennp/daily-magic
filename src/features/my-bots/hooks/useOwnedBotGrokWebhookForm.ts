"use client";

import { useState } from "react";

import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import {
  fetchOwnedBotGrokWebhookStatus,
  saveOwnedBotGrokWebhook,
} from "@/features/my-bots/utils/ownedBotGrokWebhookApi";
import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** Member-side secret form for a membership whose bot the signed-in person owns. */
export const useOwnedBotGrokWebhookForm = (input: {
  readonly projectId: string;
  readonly membershipId: string;
}) => {
  const { projectId, membershipId } = input;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ProjectGrokWebhookStatusView | null>(
    null,
  );
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookKey, setWebhookKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    setError(null);
    if (!next) return;
    setStatus(null);
    void fetchOwnedBotGrokWebhookStatus(projectId, membershipId)
      .then(setStatus)
      .catch(() => setStatus({ grokWebhookRegistered: false }));
  };

  const save = () => {
    setSaving(true);
    setError(null);
    void saveOwnedBotGrokWebhook(projectId, membershipId, {
      webhookUrl,
      webhookKey,
    })
      .then((result) => {
        if (!result.ok) {
          setError(
            mapProjectAccessError(
              result.errorMessage,
              AWC_GROK_WEBHOOK_FORM_COPY.failed,
            ),
          );
          return;
        }
        setStatus(result);
        setWebhookUrl("");
      })
      .catch(() => setError(AWC_GROK_WEBHOOK_FORM_COPY.failed))
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
    setWebhookUrl,
    setWebhookKey,
    toggle,
    save,
  };
};
