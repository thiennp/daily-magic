import { summaryHasForbiddenContent } from "@/lib/projects/acl/messaging/assertProjectMessageThinContent";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

export type ParsedProjectMessengerSend =
  | {
      readonly ok: true;
      readonly summary: string;
      readonly needsReply: boolean;
    }
  | {
      readonly ok: false;
      readonly code:
        "invalid_arguments" | "summary_too_large" | "forbidden_content";
    };

/**
 * Composer body → message text + Needs a reply flag. Accepts { text } or
 * { summary }; same thin-content and 200-char rules as project_dispatch.
 */
export const parseProjectMessengerSendBody = (
  body: unknown,
): ParsedProjectMessengerSend => {
  if (body === null || typeof body !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  const record = body as Record<string, unknown>;
  const raw = typeof record.text === "string" ? record.text : record.summary;
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { ok: false, code: "invalid_arguments" };
  }
  const summary = raw.trim();
  if (summary.length > PROJECT_MESSAGE_SUMMARY_MAX_CHARS) {
    return { ok: false, code: "summary_too_large" };
  }
  if (summaryHasForbiddenContent(summary)) {
    return { ok: false, code: "forbidden_content" };
  }
  return { ok: true, summary, needsReply: record.needsReply === true };
};
