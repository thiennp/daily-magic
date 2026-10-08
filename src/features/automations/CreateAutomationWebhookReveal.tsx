"use client";

import Button from "@/components/ui/button/Button";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CreateAutomationWebhookRevealProps {
  readonly webhookSecret: string;
  readonly webhookUrl: string | null;
}

export default function CreateAutomationWebhookReveal({
  webhookSecret,
  webhookUrl,
}: CreateAutomationWebhookRevealProps) {
  const secretCopy = useCopyToClipboard();
  const urlCopy = useCopyToClipboard();

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/40">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-medium">
          {AUTOMATIONS_PAGE_COPY.webhookSecretTitle}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            void secretCopy.copy(webhookSecret);
          }}
        >
          {secretCopy.copied
            ? AUTOMATIONS_PAGE_COPY.copied
            : AUTOMATIONS_PAGE_COPY.copySecret}
        </Button>
      </div>
      <p className="mt-1 break-all font-mono text-xs">{webhookSecret}</p>
      {webhookUrl !== null ? (
        <>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
            <p className="font-medium">
              {AUTOMATIONS_PAGE_COPY.webhookUrlTitle}
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                void urlCopy.copy(webhookUrl);
              }}
            >
              {urlCopy.copied
                ? AUTOMATIONS_PAGE_COPY.copied
                : AUTOMATIONS_PAGE_COPY.copyUrl}
            </Button>
          </div>
          <p className="mt-1 break-all font-mono text-xs">{webhookUrl}</p>
        </>
      ) : null}
    </div>
  );
}
