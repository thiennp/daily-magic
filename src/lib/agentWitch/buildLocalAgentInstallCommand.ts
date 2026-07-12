import {
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallCommand {
  readonly installScriptUrl: string;
  readonly installCommand: string;
  readonly wsUrl: string;
  readonly profileEmail: string | null;
  readonly harnessDirectory: string | null;
}

const shellQuote = (value: string): string =>
  `'${value.replace(/'/g, `'\\''`)}'`;

export const buildLocalAgentInstallCommandFromHeaders = (
  headerList: Headers,
  options?: {
    readonly profileEmail?: string | null;
  },
): LocalAgentInstallCommand => {
  const origin = buildAppOriginFromHeaders(headerList);
  const installScriptUrl = buildAgentWitchInstallScriptUrl(origin);
  const profileEmail = options?.profileEmail?.trim().toLowerCase() ?? null;
  const installCommand =
    profileEmail !== null && profileEmail.length > 0
      ? `curl -fsSL ${installScriptUrl} | bash -s -- --email ${shellQuote(profileEmail)}`
      : `curl -fsSL ${installScriptUrl} | bash`;

  return {
    installScriptUrl,
    installCommand,
    wsUrl: buildAgentWitchWsUrl(origin),
    profileEmail,
    harnessDirectory:
      profileEmail !== null && profileEmail.length > 0
        ? `~/.agent-witch/profiles/${profileEmail}/harness`
        : null,
  };
};

export const buildLocalAgentInstallCommand = (
  request: Request,
  options?: {
    readonly profileEmail?: string | null;
  },
): LocalAgentInstallCommand =>
  buildLocalAgentInstallCommandFromHeaders(request.headers, options);
