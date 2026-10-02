import {
  PROJECT_MESSAGE_ALLOWED_REF_KEYS,
  PROJECT_MESSAGE_REFS_MAX_BYTES,
  PROJECT_MESSAGE_REF_VALUE_MAX_CHARS,
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

/** Protocol metadata only — reject content-body / dump / media hints in summary. */
const FORBIDDEN_SUMMARY =
  /(run\s*log|skill\s*body|catalog\s*dump|memory\s*dump|base64[,:]|data:\s*(image|audio|video|application)|content-type:\s*(image|audio|video)\/|\b(image|audio|video)\/[a-z0-9.+-]+|\b(blob|octet-stream)\b)/i;

/** Reject media / data-URI / bulky base64-looking ref values. */
const FORBIDDEN_REF_VALUE =
  /(^data:|base64,|content-type:\s*(image|audio|video)\/|\b(image|audio|video)\/[a-z0-9.+-]+|\.(png|jpe?g|gif|webp|mp[34]|wav|ogg|mov|webm|pdf|zip)(\?|#|$))/i;

/** Long unbroken base64-ish payload (not a normal path/URL/sha). */
const LOOKS_LIKE_BASE64_BLOB = /^(?:[A-Za-z0-9+/]{40,}={0,2})$/;

const refValueLooksLikeMediaOrBlob = (value: string): boolean => {
  if (FORBIDDEN_REF_VALUE.test(value)) {
    return true;
  }
  if (value.length >= 80 && LOOKS_LIKE_BASE64_BLOB.test(value.replace(/\s+/g, ""))) {
    return true;
  }
  return false;
};

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
      const trimmed = value.trim();
      if (trimmed.length === 0) {
        return { ok: false, code: "invalid_refs" };
      }
      if (trimmed.length > PROJECT_MESSAGE_REF_VALUE_MAX_CHARS) {
        return { ok: false, code: "refs_too_large" };
      }
      if (refValueLooksLikeMediaOrBlob(trimmed)) {
        return { ok: false, code: "media_not_allowed" };
      }
      refs[key] = trimmed;
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
