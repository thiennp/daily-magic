import { buildProjectConnectionAuthorizeUrl } from "@/lib/projects/connections/buildProjectConnectionAuthorizeUrl";
import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import { resolveProjectConnectionsAuthSecret } from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { signProjectConnectionOAuthState } from "@/lib/projects/connections/projectConnectionOAuthState";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

export type StartProjectConnectionOAuthResult =
  | { readonly ok: true; readonly url: string }
  | {
      readonly ok: false;
      readonly code: "unavailable" | "provider_unsupported";
    };

/**
 * Owner-only start. Missing OAuth env → unavailable (HTTP 501 at the route)
 * so the UI stays honest — never throws. Live providers: GitHub, Slack,
 * Linear, Gmail (P1+P2).
 */
export const startProjectConnectionOAuth = (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
  readonly actorUserId: string;
}): StartProjectConnectionOAuthResult => {
  const authSecret = resolveProjectConnectionsAuthSecret();
  if (authSecret === null) {
    return { ok: false, code: "unavailable" };
  }
  const config = getProviderOAuthConfig(input.provider);
  if (config === null || config.phase !== 1) {
    return { ok: false, code: "unavailable" };
  }
  const state = signProjectConnectionOAuthState(
    {
      projectId: input.projectId,
      provider: input.provider,
      userId: input.actorUserId,
    },
    authSecret,
  );
  return {
    ok: true,
    url: buildProjectConnectionAuthorizeUrl({ config, state }),
  };
};
