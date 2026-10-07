import { scrubOutboundSecrets } from "@agent-witch/shared/dispatch";
import {
  PROJECT_MESSENGER_ENTRY_KIND_SESSION,
  PROJECT_MESSENGER_KIND_AI_SESSION,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Minimal Neon agent_runs fields needed for a session TimelineEntry. */
export type AgentRunTimelineSource = {
  readonly id: string;
  /** ISO createdAt — also cursor `t` (not startedAt). */
  readonly createdAt: string;
  readonly status: string;
  readonly writerAgent: string | null;
  readonly prompt: string;
};

const SUMMARY_MAX_CHARS = 120;

/**
 * Short scrubbed prompt for the timeline row. Never dumps result_output.
 * Isolated so History can adjust field-for-field later.
 */
export const buildAgentRunTimelineSummary = (
  status: string,
  prompt: string,
): string => {
  const scrubbed = scrubOutboundSecrets(prompt)
    .scrubbed.replace(/\s+/g, " ")
    .trim();
  const truncated =
    scrubbed.length > SUMMARY_MAX_CHARS
      ? `${scrubbed.slice(0, SUMMARY_MAX_CHARS - 1)}…`
      : scrubbed;
  if (truncated.length === 0) {
    return status;
  }
  return `${status}: ${truncated}`;
};

/**
 * Map one Neon agent_runs row → TimelineEntry (session).
 * messageId + cursor id = raw run id (both UUID spaces; no prefix).
 * entryKind = PROJECT_MESSENGER_ENTRY_KIND_SESSION; kind = "ai.session";
 * session.agentRunId always set.
 */
export const mapAgentRunToMessengerTimelineEntry = (
  run: AgentRunTimelineSource,
): ProjectMessengerTimelineEntry => {
  const writerAgent =
    typeof run.writerAgent === "string" && run.writerAgent.length > 0
      ? run.writerAgent
      : null;
  return {
    messageId: run.id,
    createdAt: run.createdAt,
    author: {
      kind: "bot",
      membershipId: null,
      displayName: writerAgent,
    },
    kind: PROJECT_MESSENGER_KIND_AI_SESSION,
    text: buildAgentRunTimelineSummary(run.status, run.prompt),
    needsReply: false,
    inReplyTo: null,
    states: [],
    entryKind: PROJECT_MESSENGER_ENTRY_KIND_SESSION,
    session: {
      status: run.status,
      writerAgent,
      agentRunId: run.id,
    },
  };
};
