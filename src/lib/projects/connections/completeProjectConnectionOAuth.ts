import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { exchangeProjectConnectionOAuthCode } from "@/lib/projects/connections/exchangeProjectConnectionOAuthCode";
import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { verifyProjectConnectionOAuthState } from "@/lib/projects/connections/projectConnectionOAuthState";
import { upsertProjectConnection } from "@/lib/projects/connections/upsertProjectConnection";

export type CompleteProjectConnectionOAuthResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly provider: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "unavailable"
        | "oauth_denied"
        | "oauth_expired"
        | "forbidden"
        | "provider_error";
      readonly projectId: string | null;
    };

export const completeProjectConnectionOAuth = async (input: {
  readonly state: string | null;
  readonly code: string | null;
  readonly oauthError: string | null;
}): Promise<CompleteProjectConnectionOAuthResult> => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) {
    return { ok: false, code: "unavailable", projectId: null };
  }
  if (input.state === null || input.state.length === 0) {
    return { ok: false, code: "oauth_expired", projectId: null };
  }
  const payload = verifyProjectConnectionOAuthState(input.state, authSecret);
  if (payload === null) {
    return { ok: false, code: "oauth_expired", projectId: null };
  }
  if (input.oauthError !== null && input.oauthError.length > 0) {
    return {
      ok: false,
      code: "oauth_denied",
      projectId: payload.projectId,
    };
  }
  if (input.code === null || input.code.length === 0) {
    return {
      ok: false,
      code: "oauth_denied",
      projectId: payload.projectId,
    };
  }

  const owner = await authorizeProjectOwner({
    projectId: payload.projectId,
    actorUserId: payload.userId,
  });
  if (!owner.allow) {
    return {
      ok: false,
      code: "forbidden",
      projectId: payload.projectId,
    };
  }

  const config = getProviderOAuthConfig(payload.provider);
  if (config === null || config.phase !== 1) {
    return {
      ok: false,
      code: "unavailable",
      projectId: payload.projectId,
    };
  }

  const tokens = await exchangeProjectConnectionOAuthCode({
    config,
    code: input.code,
  });
  if (tokens === null) {
    return {
      ok: false,
      code: "provider_error",
      projectId: payload.projectId,
    };
  }

  await upsertProjectConnection({
    projectId: payload.projectId,
    provider: payload.provider,
    actorUserId: payload.userId,
    authSecret,
    tokens,
  });

  return {
    ok: true,
    projectId: payload.projectId,
    provider: payload.provider,
  };
};
