"use client";

import { useEffect, useRef } from "react";

import AwcProjectAccessSecretInput from "@/features/projects/access/AwcProjectAccessSecretInput";
import {
  AWC_GROK_WAKE_AWAITING_COPY,
  formatAwcGrokWakeCopy,
} from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  awcGrokWakeLinkHash,
  parseAwcGrokWakeLinkHash,
} from "@/features/projects/access/awcGrokWakeLinkDeepLink";
import { useMemberGrokWebhookForm } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";

interface AwcProjectAccessMemberGrokWebhookFormProps {
  readonly projectId: string;
  readonly membershipId: string;
  /** Project nickname for `{name}` in owner copy. */
  readonly memberName?: string | null;
  /** From the owner Access snapshot; true → toggle reads "Change wake link". */
  readonly wakeLinkSet?: boolean;
  /** Bumped by deep link / "Add wake link" → expand, scroll, focus. */
  readonly openRequest?: number;
  readonly onSaved?: (membershipId: string) => void;
}

const grokStatusLine = (
  status: ProjectGrokWebhookStatusView | null,
): string => {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  if (status === null) return copy.loading;
  if (!status.grokWebhookRegistered) return copy.notSet;
  return `${status.grokWebhookUrlHost ?? copy.saved} · ${copy.keySet}`;
};

/** Owner secret form: values go to the owner route, never into chat. After save: host + key set. */
export default function AwcProjectAccessMemberGrokWebhookForm({
  projectId,
  membershipId,
  memberName = null,
  wakeLinkSet = false,
  openRequest = 0,
  onSaved,
}: AwcProjectAccessMemberGrokWebhookFormProps) {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  const wake = AWC_GROK_WAKE_AWAITING_COPY;
  const form = useMemberGrokWebhookForm({ projectId, membershipId, onSaved });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { openForm } = form;

  useEffect(() => {
    if (openRequest <= 0) return;
    openForm();
    // Deep link consumed: drop the hash so a later remount does not reopen it.
    if (parseAwcGrokWakeLinkHash(window.location.hash) === membershipId) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    const node = containerRef.current;
    node?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    const frame = window.requestAnimationFrame(() => {
      node
        ?.querySelector<HTMLInputElement>('input[name="grok-webhook-url"]')
        ?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [openRequest, openForm, membershipId]);

  const canSave =
    !form.saving &&
    form.webhookUrl.trim() !== "" &&
    form.webhookKey.trim() !== "";
  const toggleLabel = wakeLinkSet ? wake.rowAction : copy.toggle;
  return (
    <div
      ref={containerRef}
      id={awcGrokWakeLinkHash(membershipId)}
      className="basis-full scroll-mt-20"
    >
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        aria-expanded={form.open}
        onClick={form.toggle}
      >
        {form.open ? copy.hide : toggleLabel}
      </button>
      {form.open ? (
        <form
          className="mt-2 space-y-2 rounded-lg border border-gray-200/80 p-3 dark:border-gray-800/80"
          autoComplete="off"
          aria-label={wake.formTitle}
          onSubmit={(event) => {
            event.preventDefault();
            form.save();
          }}
        >
          <p className="text-xs font-semibold text-gray-800 dark:text-white/90">
            {wake.formTitle}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {formatAwcGrokWakeCopy(wake.formHelp, memberName)}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            {grokStatusLine(form.status)}
          </p>
          <AwcProjectAccessSecretInput
            label={copy.urlLabel}
            name="grok-webhook-url"
            value={form.webhookUrl}
            onChange={form.setWebhookUrl}
          />
          <AwcProjectAccessSecretInput
            label={copy.keyLabel}
            name="grok-webhook-key"
            value={form.webhookKey}
            onChange={form.setWebhookKey}
          />
          <button
            type="submit"
            className={AWC_PROJECT_ACCESS_CTA.primary}
            disabled={!canSave}
          >
            {form.saving ? wake.saving : wake.save}
          </button>
          {form.saved ? (
            <p
              role="status"
              className="text-xs text-emerald-800 dark:text-emerald-200"
            >
              {formatAwcGrokWakeCopy(wake.toastSaved, memberName)}
            </p>
          ) : null}
          {form.error ? (
            <p className="text-xs text-red-600">{form.error}</p>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}
