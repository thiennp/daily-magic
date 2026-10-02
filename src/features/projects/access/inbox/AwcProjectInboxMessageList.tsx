"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectInboxMessageListProps {
  readonly messages: readonly AwcProjectInboxMessage[];
  readonly onAck: (messageId: string) => void;
}

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString();
};

export default function AwcProjectInboxMessageList({
  messages,
  onAck,
}: AwcProjectInboxMessageListProps) {
  const copy = AWC_PROJECT_INBOX_COPY;

  if (messages.length === 0) {
    return <p className="text-sm text-gray-500">{copy.empty}</p>;
  }

  return (
    <ul className="space-y-2">
      {messages.map((row) => (
        <li
          key={row.messageId}
          className="rounded-lg border border-gray-200/70 bg-gray-50/60 px-3 py-2 dark:border-gray-800/70 dark:bg-white/[0.03]"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {row.kind}
              </p>
              <p className={`mt-0.5 text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>
                {row.summary}
              </p>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                {copy.fromLabel}:{" "}
                {row.fromProjectDisplayName ?? copy.fromUnknown} ·{" "}
                {formatWhen(row.createdAt)}
              </p>
            </div>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={() => onAck(row.messageId)}
            >
              {copy.ack}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
