import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";

interface CreateAutomationWebhookRevealProps {
  readonly webhookSecret: string;
  readonly webhookUrl: string | null;
}

export default function CreateAutomationWebhookReveal({
  webhookSecret,
  webhookUrl,
}: CreateAutomationWebhookRevealProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/40">
      <p className="font-medium">{AUTOMATIONS_PAGE_COPY.webhookSecretTitle}</p>
      <p className="mt-1 break-all font-mono text-xs">{webhookSecret}</p>
      {webhookUrl !== null ? (
        <>
          <p className="mt-3 font-medium">
            {AUTOMATIONS_PAGE_COPY.webhookUrlTitle}
          </p>
          <p className="mt-1 break-all font-mono text-xs">{webhookUrl}</p>
        </>
      ) : null}
    </div>
  );
}
