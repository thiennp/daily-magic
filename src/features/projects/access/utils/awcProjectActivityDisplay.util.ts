import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export const awcProjectActivityMemberAnchorId = (userId: string): string =>
  `access-member-${encodeURIComponent(userId)}`;

export const formatAwcProjectActivityWhen = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export const resolveAwcProjectActivitySubjectUserId = (event: {
  readonly targetUserId: string | null;
  readonly actorUserId: string;
  readonly detail: Readonly<Record<string, string | boolean | null>>;
}): string | null => {
  if (event.targetUserId !== null && event.targetUserId.length > 0) {
    return event.targetUserId;
  }
  const fromDetail = event.detail.subjectUserId;
  if (typeof fromDetail === "string" && fromDetail.length > 0) {
    return fromDetail;
  }
  return null;
};

/** Humanize snake_case / dotted failure codes in activity detail. */
export const humanizeAwcProjectActivityDetailValue = (
  value: string,
): string => mapProjectAccessError(value, value);
