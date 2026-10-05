"use client";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import formatProjectMessageKindLabel from "@/features/projects/access/inbox/utils/formatProjectMessageKindLabel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectInboxMessageListProps {
  readonly messages: readonly AwcProjectInboxMessage[];
}

const formatWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString();
};

const routeLabel = (row: AwcProjectInboxMessage): string => {
  const from = row.fromProjectDisplayName ?? AWC_PROJECT_INBOX_COPY.fromUnknown;
  const to = row.toProjectDisplayName ?? AWC_PROJECT_INBOX_COPY.toUnknown;
  return `${from} → ${to}`;
};

export default function AwcProjectInboxMessageList({
  messages,
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
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {formatProjectMessageKindLabel(row.kind)}
            </p>
            <p className={`mt-0.5 text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>
              {row.summary}
            </p>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
              {routeLabel(row)} · {formatWhen(row.createdAt)} ·{" "}
              {row.ackedAt !== null ? copy.ackedLabel : copy.unackedLabel}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
