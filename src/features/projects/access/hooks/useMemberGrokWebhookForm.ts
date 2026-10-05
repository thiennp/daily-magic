"use client";

import { useState } from "react";

import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import {
  fetchMemberGrokWebhookStatus,
  saveMemberGrokWebhook,
  type ProjectGrokWebhookStatusView,
} from "@/features/projects/access/utils/projectGrokWebhookApi";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** State for the owner secret form. The key is cleared after every save attempt. */
export const useMemberGrokWebhookForm = (input: {
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
    void fetchMemberGrokWebhookStatus(projectId, membershipId)
      .then(setStatus)
      .catch(() => setStatus({ grokWebhookRegistered: false }));
  };

  const save = () => {
    setSaving(true);
    setError(null);
    void saveMemberGrokWebhook(projectId, membershipId, {
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
