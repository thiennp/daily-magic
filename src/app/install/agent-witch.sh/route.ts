import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { isValidAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

const readPresetProfileEmail = (request: Request): string | undefined => {
  const email = new URL(request.url).searchParams.get("email")?.trim();
  if (email === undefined || email.length === 0) {
    return undefined;
  }

  return email.toLowerCase();
};

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const origin = buildAppOrigin(request);
  const presetPairingToken = new URL(request.url).searchParams
    .get("token")
    ?.trim();

  if (
    presetPairingToken === undefined ||
    !isValidAgentWitchPairingToken(presetPairingToken)
  ) {
    return new Response(
      "Install token is required. Open Home while signed in and copy the Connect this Mac install command.",
      { status: 400 },
    );
  }

  const script = renderInstallAgentWitchScript(origin, {
    presetPairingToken,
    presetProfileEmail: readPresetProfileEmail(request),
  });

  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
