import {
  PROJECT_MESSENGER_DEFAULT_REPLY_KIND,
  PROJECT_MESSENGER_REPLY_KINDS,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

const MESSAGE_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ParsedProjectMessengerReply =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly summary: string;
      readonly kind: string;
      readonly inReplyTo: string | null;
    }
  | { readonly ok: false; readonly code: "invalid_arguments" | "invalid_kind" };

const nonEmpty = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/** project_messenger_reply args → projectId, text, reply kind, optional parent id. */
export const parseProjectMessengerReplyArgs = (
  args: unknown,
): ParsedProjectMessengerReply => {
  if (args === null || typeof args !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  const record = args as Record<string, unknown>;
  const projectId = nonEmpty(record.projectId);
  const summary = nonEmpty(record.summary);
  const inReplyTo = nonEmpty(record.inReplyTo);
  if (projectId === null || summary === null) {
    return { ok: false, code: "invalid_arguments" };
  }
  if (inReplyTo !== null && !MESSAGE_ID.test(inReplyTo)) {
    return { ok: false, code: "invalid_arguments" };
  }
  const kind = nonEmpty(record.kind) ?? PROJECT_MESSENGER_DEFAULT_REPLY_KIND;
  if (!(PROJECT_MESSENGER_REPLY_KINDS as readonly string[]).includes(kind)) {
    return { ok: false, code: "invalid_kind" };
  }
  return {
    ok: true,
    projectId,
    summary,
    kind,
    inReplyTo: inReplyTo === null ? null : inReplyTo.toLowerCase(),
  };
};
