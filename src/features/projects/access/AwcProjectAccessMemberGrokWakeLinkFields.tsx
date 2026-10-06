"use client";

import AwcProjectAccessSecretInput from "@/features/projects/access/AwcProjectAccessSecretInput";
import {
  AWC_GROK_WAKE_AWAITING_COPY,
  formatAwcGrokWakeCopy,
} from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import type { useMemberGrokWebhookForm } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";

interface AwcProjectAccessMemberGrokWakeLinkFieldsProps {
  readonly form: ReturnType<typeof useMemberGrokWebhookForm>;
  readonly memberName: string | null;
}

const grokStatusLine = (
  status: ProjectGrokWebhookStatusView | null,
): string => {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  if (status === null) return copy.loading;
  if (!status.grokWebhookRegistered) return copy.notSet;
  return `${status.grokWebhookUrlHost ?? copy.saved} · ${copy.keySet}`;
};

/** Expanded "Grok wake link" form: masked wake link + key, save, toast/error. */
export default function AwcProjectAccessMemberGrokWakeLinkFields({
  form,
  memberName,
}: AwcProjectAccessMemberGrokWakeLinkFieldsProps) {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  const wake = AWC_GROK_WAKE_AWAITING_COPY;
  const canSave =
    !form.saving &&
    form.webhookUrl.trim() !== "" &&
    form.webhookKey.trim() !== "";
  return (
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
          {form.status?.deliveryModeFlipped === true
            ? AWC_DELIVERY_MODE_COPY.toastSavedAutoFlipSuffix
            : null}
        </p>
      ) : null}
      {form.error ? <p className="text-xs text-red-600">{form.error}</p> : null}
    </form>
  );
}
