import { buildAgentWitchInstallScriptUrlWithToken } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export const buildAgentWitchInstallCommandWithToken = (input: {
  readonly origin: string;
  readonly pairingToken: string;
  readonly profileEmail?: string;
}): string => {
  const installScriptUrl = buildAgentWitchInstallScriptUrlWithToken(
    input.origin,
    {
      pairingToken: input.pairingToken,
      profileEmail: input.profileEmail,
    },
  );

  return `curl -fsSL ${JSON.stringify(installScriptUrl)} | bash`;
};
