import { issueClaimBotCode } from "@/lib/agentAccess/claimBot/issueClaimBotCode";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

const ERROR_COPY: Readonly<Record<string, string>> = {
  already_claimed:
    "This bot is already claimed. The current owner must Unclaim on My bots before a new code can be issued.",
  token_not_found: "Agent-access token not found.",
};

/** issue_bot_claim_code: Bearer token row only; plaintext returned once. */
export const executeIssueClaimBotCodeTool = async (input: {
  readonly token: string;
}): Promise<AgentAccessToolCallResult> => {
  const result = await issueClaimBotCode({
    tokenHash: hashAgentAccessToken(input.token),
  });
  if (!result.ok) {
    return agentAccessTextResult(
      {
        ok: false,
        error: ERROR_COPY[result.code] ?? result.code,
        code: result.code,
      },
      true,
    );
  }
  return agentAccessTextResult({
    ok: true,
    code: result.code,
    expiresAt: result.expiresAt,
    note: "Give this code to the human once. They enter it on My bots. It expires in 10 minutes and is single-use.",
  });
};
