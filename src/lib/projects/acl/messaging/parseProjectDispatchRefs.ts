import {
  PROJECT_MESSAGE_ALLOWED_REF_KEYS,
  PROJECT_MESSAGE_REFS_MAX_BYTES,
  PROJECT_MESSAGE_REF_VALUE_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { refValueLooksLikeMediaOrBlob } from "@/lib/projects/acl/messaging/assertProjectMessageThinContent";

export type ParsedProjectDispatchRefs =
  | { readonly ok: true; readonly refs: Readonly<Record<string, string>> }
  | { readonly ok: false; readonly code: string };

export const parseProjectDispatchRefs = (
  raw: unknown,
): ParsedProjectDispatchRefs => {
  if (raw === undefined || raw === null) {
    return { ok: true, refs: {} };
  }
  if (typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, code: "invalid_refs" };
  }
  const refs: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!(PROJECT_MESSAGE_ALLOWED_REF_KEYS as readonly string[]).includes(key)) {
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
  if (Buffer.byteLength(JSON.stringify(refs), "utf8") > PROJECT_MESSAGE_REFS_MAX_BYTES) {
    return { ok: false, code: "refs_too_large" };
  }
  return { ok: true, refs };
};
