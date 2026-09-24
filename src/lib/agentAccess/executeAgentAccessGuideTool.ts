import { asRowArray, getSql } from "@/lib/db";

import { AGENT_ACCESS_FEEDBACK_PER_HOUR } from "@/lib/agentAccess/agentAccess.constant";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { openAgentFeedbackGitHubIssue } from "@/lib/agentAccess/openAgentFeedbackGitHubIssue";
import { parseAgentAccessFeedback } from "@/lib/agentAccess/parseAgentAccessFeedback";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";

const storeFeedback = async (input: {
  readonly userId: string;
  readonly outcome: string;
  readonly summary: string;
  readonly detail: string | null;
}): Promise<string | null> => {
  await ensureAgentAccessSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO agent_access_feedback (user_id, outcome, summary, detail)
      VALUES (${input.userId}, ${input.outcome}, ${input.summary}, ${input.detail})
      RETURNING id
    `,
  );
  const id = rows[0]?.id;

  return typeof id === "string" ? id : null;
};

export const executeAgentAccessGuideTool = async (input: {
  readonly actor: AgentAccessActor;
  readonly name: string;
  readonly args: unknown;
  readonly token: string;
}): Promise<AgentAccessToolCallResult | null> => {
  if (input.name === "get_agent_guide") {
    return agentAccessTextResult({
      ok: true,
      guide: buildAgentAccessLiveGuide(),
    });
  }

  if (input.name !== "report_feedback") {
    return null;
  }

  const feedback = parseAgentAccessFeedback(input.args);

  if (feedback === null) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "outcome and summary are required.",
        code: "invalid_arguments",
      },
      true,
    );
  }

  const allowed = await consumeAgentAccessBucket({
    subjectHash: hashAgentAccessToken(input.token),
    bucket: "feedback",
    limit: AGENT_ACCESS_FEEDBACK_PER_HOUR,
  });

  if (!allowed) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "Too many feedback reports. Wait before sending another.",
        code: "rate_limited",
      },
      true,
    );
  }

  const feedbackId = await storeFeedback({
    userId: input.actor.id,
    outcome: feedback.outcome,
    summary: feedback.summary,
    detail: feedback.detail,
  });

  if (feedbackId === null) {
    return agentAccessTextResult(
      { ok: false, error: "Could not store feedback.", code: "store_failed" },
      true,
    );
  }

  const githubIssueUrl = await openAgentFeedbackGitHubIssue({
    feedback,
    accountEmail: input.actor.email,
    feedbackId,
  });

  return agentAccessTextResult({
    ok: true,
    feedbackId,
    githubIssueUrl,
  });
};
