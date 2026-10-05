"use client";

import AwcProjectAccessSecretInput from "@/features/projects/access/AwcProjectAccessSecretInput";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { useMemberGrokWebhookForm } from "@/features/projects/access/hooks/useMemberGrokWebhookForm";
import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";

interface AwcProjectAccessMemberGrokWebhookFormProps {
  readonly projectId: string;
  readonly membershipId: string;
}

const grokStatusLine = (status: ProjectGrokWebhookStatusView | null): string => {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  if (status === null) return copy.loading;
  if (!status.grokWebhookRegistered) return copy.notSet;
  return `${status.grokWebhookUrlHost ?? copy.saved} · ${copy.keySet}`;
};


/** Owner secret form: values go to the owner route, never into chat. After save: host + key set. */
export default function AwcProjectAccessMemberGrokWebhookForm({
  projectId,
  membershipId,
}: AwcProjectAccessMemberGrokWebhookFormProps) {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  const form = useMemberGrokWebhookForm({ projectId, membershipId });
  const canSave =
    !form.saving &&
    form.webhookUrl.trim() !== "" &&
    form.webhookKey.trim() !== "";
  return (
    <div className="basis-full">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        aria-expanded={form.open}
        onClick={form.toggle}
      >
        {form.open ? copy.hide : copy.toggle}
      </button>
      {form.open ? (
        <form
          className="mt-2 space-y-2 rounded-lg border border-gray-200/80 p-3 dark:border-gray-800/80"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            form.save();
          }}
        >
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {copy.hint}
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
            {form.saving ? copy.saving : copy.save}
          </button>
          {form.error ? (
            <p className="text-xs text-red-600">{form.error}</p>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}
