import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

export type ProviderSpec = {
  readonly envPrefix: string;
  readonly authorizeUrl: string;
  readonly tokenUrl: string;
  readonly scopes: readonly string[];
};

const GOOGLE = {
  envPrefix: "GOOGLE",
  authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
} as const;

/**
 * Gmail: least privilege read+send (readonly is Restricted, send Sensitive);
 * shares the Google client with Drive (drive.file = least privilege).
 * Linear: comma-separated on authorize; `admin` is required for
 * webhookCreate/webhookDelete (task sync). Notion takes no scope param
 * (capabilities live in the integration portal; scopes document intent).
 */
export const PROVIDER_OAUTH_SPECS: Partial<
  Record<ProjectConnectionProvider, ProviderSpec>
> = {
  github: {
    envPrefix: "GITHUB",
    authorizeUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    scopes: ["read:user", "repo"],
  },
  slack: {
    envPrefix: "SLACK",
    authorizeUrl: "https://slack.com/oauth/v2/authorize",
    tokenUrl: "https://slack.com/api/oauth.v2.access",
    scopes: ["chat:write", "channels:read", "users:read"],
  },
  linear: {
    envPrefix: "LINEAR",
    authorizeUrl: "https://linear.app/oauth/authorize",
    tokenUrl: "https://api.linear.app/oauth/token",
    scopes: ["read", "write", "admin"],
  },
  gmail: {
    ...GOOGLE,
    scopes: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ],
  },
  notion: {
    envPrefix: "NOTION",
    authorizeUrl: "https://api.notion.com/v1/oauth/authorize",
    tokenUrl: "https://api.notion.com/v1/oauth/token",
    scopes: ["read_content", "update_content"],
  },
  google_drive: {
    ...GOOGLE,
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  },
};
