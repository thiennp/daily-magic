import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

export const bestEffortRevoke = async (input: {
  readonly provider: ProjectConnectionProvider;
  readonly accessToken: string;
}): Promise<void> => {
  try {
    if (input.provider === "github") {
      const config = getProviderOAuthConfig("github");
      if (config === null) return;
      await fetch(
        `https://api.github.com/applications/${encodeURIComponent(config.clientId)}/token`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`,
            "User-Agent": "AgentWitch-ProjectConnections",
          },
          body: JSON.stringify({ access_token: input.accessToken }),
        },
      );
      return;
    }
    if (input.provider === "slack") {
      const body = new URLSearchParams({ token: input.accessToken });
      await fetch("https://slack.com/api/auth.revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      return;
    }
    if (input.provider === "linear") {
      const body = new URLSearchParams({
        token: input.accessToken,
        token_type_hint: "access_token",
      });
      await fetch("https://api.linear.app/oauth/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      return;
    }
    if (input.provider === "gmail") {
      const body = new URLSearchParams({ token: input.accessToken });
      await fetch("https://oauth2.googleapis.com/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
    }
  } catch {
    // Best-effort only — local row delete still proceeds.
  }
};
