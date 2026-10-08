import {
  PROJECT_MESSAGE_ALLOWED_REF_KEYS,
  PROJECT_MESSAGE_REFS_MAX_BYTES,
  PROJECT_MESSAGE_REF_VALUE_MAX_CHARS,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AwcProjectInboxRefs } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

export type MessengerTaskDraft = {
  readonly assigneeMembershipId: string;
  readonly summary: string;
  readonly kind?: string;
  readonly refs?: AwcProjectInboxRefs;
  /** Coding tool for computer assignees (server default: claude-cli). */
  readonly writerAgent?: HarnessWriterAgent;
};

export type ValidateMessengerTaskDraftResult =
  | {
      readonly ok: true;
      readonly assigneeMembershipId: string;
      readonly summary: string;
      readonly kind: string | undefined;
      readonly refs: AwcProjectInboxRefs | undefined;
      readonly writerAgent: HarnessWriterAgent | undefined;
    }
  | {
      readonly ok: false;
      readonly code:
        | "assignee_required"
        | "summary_required"
        | "summary_too_large"
        | "invalid_refs"
        | "invalid_ref_key"
        | "refs_too_large";
    };

const utf8Bytes = (value: string): number =>
  typeof Buffer !== "undefined"
    ? Buffer.byteLength(value, "utf8")
    : new TextEncoder().encode(value).length;

const validateRefs = (
  refs: AwcProjectInboxRefs | undefined,
):
  | { readonly ok: true; readonly refs: AwcProjectInboxRefs | undefined }
  | {
      readonly ok: false;
      readonly code: "invalid_refs" | "invalid_ref_key" | "refs_too_large";
    } => {
  if (refs === undefined) return { ok: true, refs: undefined };
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(refs)) {
    if (
      !(PROJECT_MESSAGE_ALLOWED_REF_KEYS as readonly string[]).includes(key)
    ) {
      return { ok: false, code: "invalid_ref_key" };
    }
    if (typeof value !== "string") return { ok: false, code: "invalid_refs" };
    const trimmed = value.trim();
    if (trimmed.length === 0) continue;
    if (trimmed.length > PROJECT_MESSAGE_REF_VALUE_MAX_CHARS) {
      return { ok: false, code: "refs_too_large" };
    }
    cleaned[key] = trimmed;
  }
  if (Object.keys(cleaned).length === 0) return { ok: true, refs: undefined };
  if (utf8Bytes(JSON.stringify(cleaned)) > PROJECT_MESSAGE_REFS_MAX_BYTES) {
    return { ok: false, code: "refs_too_large" };
  }
  return { ok: true, refs: cleaned };
};

/** Client gate for Activity task mode before POST /inbox/dispatch. */
export const validateMessengerTaskDraft = (
  draft: MessengerTaskDraft,
): ValidateMessengerTaskDraftResult => {
  const assigneeMembershipId = draft.assigneeMembershipId.trim();
  if (assigneeMembershipId.length === 0) {
    return { ok: false, code: "assignee_required" };
  }
  const summary = draft.summary.trim();
  if (summary.length === 0) return { ok: false, code: "summary_required" };
  if (summary.length > PROJECT_MESSAGE_SUMMARY_MAX_CHARS) {
    return { ok: false, code: "summary_too_large" };
  }
  const kindRaw = draft.kind?.trim() ?? "";
  const refsResult = validateRefs(draft.refs);
  if (!refsResult.ok) return refsResult;
  return {
    ok: true,
    assigneeMembershipId,
    summary,
    kind: kindRaw.length > 0 ? kindRaw : undefined,
    refs: refsResult.refs,
    writerAgent: draft.writerAgent,
  };
};
