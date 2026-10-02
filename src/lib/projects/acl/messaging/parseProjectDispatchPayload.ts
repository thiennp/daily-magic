import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { summaryHasForbiddenContent } from "@/lib/projects/acl/messaging/assertProjectMessageThinContent";
import { parseProjectDispatchRefs } from "@/lib/projects/acl/messaging/parseProjectDispatchRefs";

export type ParsedProjectDispatch =
  | {
      readonly ok: true;
      readonly kind: string;
      readonly summary: string;
      readonly refs: Readonly<Record<string, string>>;
      readonly toProjectDisplayName: string | null;
      readonly toTeamLabel: string | null;
    }
  | { readonly ok: false; readonly code: string };

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
  const toProjectDisplayName =
    typeof body.toProjectDisplayName === "string" &&
    body.toProjectDisplayName.trim().length > 0
      ? body.toProjectDisplayName.trim()
      : null;
  const toTeamLabel =
    typeof body.toTeamLabel === "string" && body.toTeamLabel.trim().length > 0
      ? body.toTeamLabel.trim().slice(0, 64)
      : null;
  if (toProjectDisplayName === null && toTeamLabel === null) {
    return { ok: false, code: "address_required" };
  }
  if (toProjectDisplayName !== null && toTeamLabel !== null) {
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
    toProjectDisplayName,
    toTeamLabel,
  };
};
