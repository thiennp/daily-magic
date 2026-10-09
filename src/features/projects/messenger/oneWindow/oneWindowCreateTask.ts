import {
  parseOneWindowMentions,
  type OneWindowMentionAssistant,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const OPEN_STATUSES: readonly ProjectTaskRecord["status"][] = [
  "queued",
  "planned",
  "in_progress",
  "blocked",
];
const MAX_EXISTING_SHOWN = 3;

/** Who a "Create a task" send is for: the @mention, the open private feed, or the only assistant. */
export const resolveCreateTaskTarget = (input: {
  readonly text: string;
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly mentionsEnabled: boolean;
  readonly feedKey: string;
}): { readonly membershipId: string; readonly mentioned: boolean } | null => {
  const [mentioned] = input.mentionsEnabled
    ? parseOneWindowMentions(input.text, input.assistants)
    : [];
  if (mentioned !== undefined)
    return { membershipId: mentioned, mentioned: true };
  const known = (id: string): boolean =>
    input.assistants.some((a) => a.membershipId === id);
  if (
    input.feedKey !== PROJECT_MESSENGER_WHOLE_THREAD_KEY &&
    known(input.feedKey)
  ) {
    return { membershipId: input.feedKey, mentioned: false };
  }
  return input.assistants.length === 1
    ? { membershipId: input.assistants[0].membershipId, mentioned: false }
    : null;
};

/** Open (not done / cancelled) tasks owned by the assistant, newest first. */
export const findOpenTasksForAssistant = (
  records: readonly ProjectTaskRecord[],
  membershipId: string,
): readonly ProjectTaskRecord[] =>
  records
    .filter(
      (record) =>
        record.ownerMembershipId === membershipId &&
        OPEN_STATUSES.includes(record.status),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, MAX_EXISTING_SHOWN);
