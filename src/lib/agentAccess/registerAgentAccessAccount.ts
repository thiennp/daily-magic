import findOrCreateUserByEmail from "@/lib/auth/findOrCreateUserByEmail";
import { getSql } from "@/lib/db";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

import {
  isAgentAccessRateLimited,
  countRecentAgentAccessAttempts,
  recordAgentAccessAttempt,
} from "@/lib/agentAccess/agentAccessRateLimit";
import { buildAgentAccessPrompt } from "@/lib/agentAccess/buildAgentAccessPrompt";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import type { AgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import type { AgentMailInboxClient } from "@/lib/agentAccess/createAgentMailInbox";
import { AgentMailUnavailableError } from "@/lib/agentAccess/createAgentMailInbox";
import {
  buildDefaultAgentMailClient,
  resolveAgentAccessAccountEmail,
} from "@/lib/agentAccess/resolveAgentAccessAccountEmail";
import type {
  AgentAccessRegisterFailure,
  AgentAccessRegisterOutcome,
} from "@/lib/agentAccess/types/AgentAccessRegisterOutcome.type";

const failure = (
  status: number,
  error: string,
  code: string,
): AgentAccessRegisterFailure => ({ ok: false, status, error, code });

export const registerAgentAccessAccount = async (input: {
  readonly body: AgentAccessRegisterBody;
  readonly ipHash: string;
  readonly agentMailClient?: AgentMailInboxClient;
  readonly origin?: string;
}): Promise<AgentAccessRegisterOutcome> => {
  await ensureAgentAccessSchema();
  const recentAttempts = await countRecentAgentAccessAttempts(input.ipHash);

  if (isAgentAccessRateLimited(recentAttempts)) {
    return failure(
      429,
      "Too many registration attempts. Try again in an hour.",
      "rate_limited",
    );
  }

  await recordAgentAccessAttempt(input.ipHash);
  const email = await resolveAgentAccessAccountEmail(
    input.body,
    input.agentMailClient ?? buildDefaultAgentMailClient(),
  );

  if (email instanceof AgentMailUnavailableError) {
    return failure(503, email.message, "agentmail_unavailable");
  }

  const user = await findOrCreateUserByEmail(email);

  if (user?.id === undefined) {
    return failure(
      500,
      "Could not create the account.",
      "account_create_failed",
    );
  }

  const displayName = input.body.displayName ?? user.name ?? null;
  const sql = getSql();

  if (displayName !== null) {
    await sql`UPDATE users SET name = ${displayName} WHERE id = ${user.id}`;
  }

  const token = createAgentAccessToken();
  await sql`
    INSERT INTO agent_access_tokens (
      user_id, token_hash, token_prefix, registration_method, agentmail_inbox
    )
    VALUES (
      ${user.id},
      ${hashAgentAccessToken(token)},
      ${token.slice(0, 10)},
      ${input.body.method},
      ${input.body.method === "agentmail" ? email : null}
    )
  `;

  const origin = input.origin ?? resolveAppBaseUrl();
  const urls = buildAgentAccessUrls(origin);

  return {
    ok: true,
    status: 201,
    body: {
      ok: true,
      token,
      tokenType: "Bearer",
      account: {
        id: user.id,
        email,
        displayName,
        registrationMethod: input.body.method,
      },
      registerUrl: urls.registerUrl,
      mcpUrl: urls.mcpUrl,
      invokeUrl: urls.invokeUrl,
      discoveryUrl: urls.discoveryUrl,
      prompt: buildAgentAccessPrompt(origin),
    },
  };
};
