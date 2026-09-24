import type { AgentAccessFeedbackInput } from "@/lib/agentAccess/parseAgentAccessFeedback";

const repo = (): string =>
  process.env.AGENT_WITCH_FEEDBACK_GITHUB_REPO?.trim() || "thiennp/daily-magic";

const token = (): string =>
  process.env.AGENT_WITCH_FEEDBACK_GITHUB_TOKEN?.trim() || "";

export const openAgentFeedbackGitHubIssue = async (input: {
  readonly feedback: AgentAccessFeedbackInput;
  readonly accountEmail: string;
  readonly feedbackId: string;
}): Promise<string | null> => {
  const githubToken = token();

  if (githubToken.length === 0) {
    return null;
  }

  const title =
    `[agent-feedback] ${input.feedback.outcome}: ${input.feedback.summary}`.slice(
      0,
      120,
    );
  const body = [
    `Account: ${input.accountEmail}`,
    `Feedback id: ${input.feedbackId}`,
    `Outcome: ${input.feedback.outcome}`,
    "",
    input.feedback.summary,
    "",
    input.feedback.detail ?? "",
  ].join("\n");
  const postIssue = (labels: readonly string[]) =>
    fetch(`https://api.github.com/repos/${repo()}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "agent-witch",
      },
      body: JSON.stringify({ title, body, labels }),
    });
  const labeled = await postIssue(["agent-feedback"]);
  const response = labeled.ok ? labeled : await postIssue([]);

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();
  const url =
    typeof payload === "object" &&
    payload !== null &&
    "html_url" in payload &&
    typeof payload.html_url === "string"
      ? payload.html_url
      : null;

  return url;
};
