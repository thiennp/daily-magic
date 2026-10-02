import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { summaryHasForbiddenContent } from "@/lib/projects/acl/messaging/assertProjectMessageThinContent";
import { parseProjectDispatchRefs } from "@/lib/projects/acl/messaging/parseProjectDispatchRefs";

export type ParsedProjectDispatch =
  | {
      readonly ok: true;
      readonly kind: string;
      readonly summary: string;
      readonly refs: Readonly<Record<string, string>>;
      readonly toMembershipId: string | null;
      readonly toProjectDisplayName: string | null;
      readonly toTeamLabel: string | null;
    }
  | { readonly ok: false; readonly code: string };

const asNonEmptyString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

export const parseProjectDispatchPayload = (
  args: unknown,
): ParsedProjectDispatch => {
  if (args === null || typeof args !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  const body = args as Record<string, unknown>;
  const kind =
    typeof body.kind === "string" && body.kind.trim().length > 0
      ? body.kind.trim().slice(0, 64)
      : null;
  const summary =
    typeof body.summary === "string" ? body.summary.trim() : null;
  if (kind === null || summary === null) {
    return { ok: false, code: "invalid_arguments" };
  }
  if (summary.length === 0 || summary.length > PROJECT_MESSAGE_SUMMARY_MAX_CHARS) {
    return { ok: false, code: "summary_too_large" };
  }
  if (summaryHasForbiddenContent(summary)) {
    return { ok: false, code: "forbidden_content" };
  }
  const toMembershipId = asNonEmptyString(body.toMembershipId);
  const toProjectDisplayName = asNonEmptyString(body.toProjectDisplayName);
  const toTeamLabelRaw = asNonEmptyString(body.toTeamLabel);
  const toTeamLabel =
    toTeamLabelRaw !== null ? toTeamLabelRaw.slice(0, 64) : null;
  const addressCount = [toMembershipId, toProjectDisplayName, toTeamLabel].filter(
    (value) => value !== null,
  ).length;
  if (addressCount === 0) {
    return { ok: false, code: "address_required" };
  }
  if (addressCount > 1) {
    return { ok: false, code: "single_recipient_required" };
  }
  if (body.broadcast === true || body.toUserId) {
    return { ok: false, code: "broadcast_disabled" };
  }
  const parsedRefs = parseProjectDispatchRefs(body.refs);
  if (!parsedRefs.ok) {
    return { ok: false, code: parsedRefs.code };
  }
  return {
    ok: true,
    kind,
    summary,
    refs: parsedRefs.refs,
    toMembershipId,
    toProjectDisplayName,
    toTeamLabel,
  };
};
