"use client";

import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const FIELD =
  "mt-1 w-full rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

interface AwcMessengerTaskComposerFieldsProps {
  readonly disabled: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly assigneeMembershipId: string;
  readonly summary: string;
  readonly kind: string;
  readonly onAssigneeMembershipId: (value: string) => void;
  readonly onSummary: (value: string) => void;
  readonly onKind: (value: string) => void;
}

export default function AwcMessengerTaskComposerFields({
  disabled,
  assignees,
  assigneeMembershipId,
  summary,
  kind,
  onAssigneeMembershipId,
  onSummary,
  onKind,
}: AwcMessengerTaskComposerFieldsProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          {copy.taskAssigneeLabel}
          <select
            className={FIELD}
            value={assigneeMembershipId}
            disabled={disabled}
            onChange={(event) => {
              onAssigneeMembershipId(event.target.value);
            }}
          >
            <option value="">{copy.taskAssigneePlaceholder}</option>
            {assignees.map((assignee) => (
              <option key={assignee.membershipId} value={assignee.membershipId}>
                {assignee.kind === "computer"
                  ? `${assignee.displayName} (This computer)`
                  : assignee.displayName}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          {copy.taskKindLabel}
          <input
            className={FIELD}
            value={kind}
            disabled={disabled}
            placeholder={copy.taskKindPlaceholder}
            onChange={(event) => {
              onKind(event.target.value);
            }}
          />
        </label>
      </div>
      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
        {copy.taskSummaryLabel}
        <textarea
          rows={2}
          maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
          className={FIELD}
          value={summary}
          disabled={disabled}
          placeholder={copy.taskSummaryPlaceholder}
          onChange={(event) => {
            onSummary(event.target.value);
          }}
        />
      </label>
      <p className="text-xs text-gray-500">
        {copy.taskSummaryCounter.replace("{n}", String(summary.length))}
      </p>
    </>
  );
}
