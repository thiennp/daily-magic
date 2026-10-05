"use client";

import AwcProjectAccessSecretInput from "@/features/projects/access/AwcProjectAccessSecretInput";
import { AWC_GROK_WEBHOOK_FORM_COPY } from "@/features/projects/access/awcGrokWebhookFormCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { useOwnedBotGrokWebhookForm } from "@/features/my-bots/hooks/useOwnedBotGrokWebhookForm";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import type { ProjectGrokWebhookStatusView } from "@/features/projects/access/utils/projectGrokWebhookApi";

interface MyBotOwnedGrokWebhookFormProps {
  readonly projectId: string;
  readonly membershipId: string;
}

const statusLine = (status: ProjectGrokWebhookStatusView | null): string => {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  if (status === null) return copy.loading;
  if (!status.grokWebhookRegistered) return copy.notSet;
  return `${status.grokWebhookUrlHost ?? copy.saved} · ${copy.keySet}`;
};

/** Same masked UX as the owner form; writes via owned_bot_row. */
export default function MyBotOwnedGrokWebhookForm({
  projectId,
  membershipId,
}: MyBotOwnedGrokWebhookFormProps) {
  const copy = AWC_GROK_WEBHOOK_FORM_COPY;
  const form = useOwnedBotGrokWebhookForm({ projectId, membershipId });
  const canSave =
    !form.saving &&
    form.webhookUrl.trim() !== "" &&
    form.webhookKey.trim() !== "";
  return (
    <div className="mt-2">
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        aria-expanded={form.open}
        onClick={form.toggle}
      >
        {form.open ? MY_BOTS_COPY.webhookHide : MY_BOTS_COPY.webhookToggle}
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
            {statusLine(form.status)}
          </p>
          <AwcProjectAccessSecretInput
            label={copy.urlLabel}
            name="owned-grok-webhook-url"
            value={form.webhookUrl}
            onChange={form.setWebhookUrl}
          />
          <AwcProjectAccessSecretInput
            label={copy.keyLabel}
            name="owned-grok-webhook-key"
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
