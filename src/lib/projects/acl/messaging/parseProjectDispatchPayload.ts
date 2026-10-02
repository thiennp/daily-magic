import {
  PROJECT_MESSAGE_ALLOWED_REF_KEYS,
  PROJECT_MESSAGE_REFS_MAX_BYTES,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

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

const FORBIDDEN_SUMMARY = /(run\s*log|skill\s*body|catalog\s*dump|memory\s*dump|base64,)/i;

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
  if (FORBIDDEN_SUMMARY.test(summary)) {
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
  // v1: no broadcast
  if (body.broadcast === true || body.toUserId) {
    return { ok: false, code: "broadcast_disabled" };
  }

  const refs: Record<string, string> = {};
  if (body.refs !== undefined && body.refs !== null) {
    if (typeof body.refs !== "object" || Array.isArray(body.refs)) {
      return { ok: false, code: "invalid_refs" };
    }
    for (const [key, value] of Object.entries(body.refs as Record<string, unknown>)) {
      if (
        !(PROJECT_MESSAGE_ALLOWED_REF_KEYS as readonly string[]).includes(key)
      ) {
        return { ok: false, code: "invalid_ref_key" };
      }
      if (typeof value !== "string") {
        return { ok: false, code: "invalid_refs" };
      }
      refs[key] = value.slice(0, 512);
    }
  }
  const refsJson = JSON.stringify(refs);
  if (Buffer.byteLength(refsJson, "utf8") > PROJECT_MESSAGE_REFS_MAX_BYTES) {
    return { ok: false, code: "refs_too_large" };
  }
  return {
    ok: true,
    kind,
    summary,
    refs,
    toProjectDisplayName,
    toTeamLabel,
  };
};
