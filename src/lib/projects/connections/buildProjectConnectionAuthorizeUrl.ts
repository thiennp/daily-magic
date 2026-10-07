import { PROJECT_CONNECTIONS_CALLBACK_PATH } from "@/lib/projects/connections/projectConnection.constants";
import type { ProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";

export const buildProjectConnectionCallbackUrl = (): string =>
  new URL(PROJECT_CONNECTIONS_CALLBACK_PATH, resolveAppBaseUrl()).toString();

/** Linear authorize docs require comma-separated scopes; others use space. */
export const formatProviderOAuthScopeParam = (
  provider: ProviderOAuthConfig["provider"],
  scopes: readonly string[],
): string =>
  provider === "linear" ? scopes.join(",") : scopes.join(" ");

export const buildProjectConnectionAuthorizeUrl = (input: {
  readonly config: ProviderOAuthConfig;
  readonly state: string;
}): string => {
  const redirectUri = buildProjectConnectionCallbackUrl();
  const url = new URL(input.config.authorizeUrl);
  url.searchParams.set("client_id", input.config.clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", input.state);
  url.searchParams.set(
    "scope",
    formatProviderOAuthScopeParam(input.config.provider, input.config.scopes),
  );
  if (input.config.provider === "github") {
    url.searchParams.set("allow_signup", "false");
  }
  if (input.config.provider === "slack") {
    // Slack v2 user/bot: scope param is bot scopes for workspace install.
    url.searchParams.set("user_scope", "");
  }
  if (input.config.provider === "gmail") {
    url.searchParams.set("response_type", "code");
    url.searchParams.set("access_type", "offline");
    url.searchParams.set("prompt", "consent");
  }
  if (input.config.provider === "linear") {
    url.searchParams.set("response_type", "code");
  }
  return url.toString();
};
