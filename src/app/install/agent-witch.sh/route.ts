import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { isValidAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

const PLAIN_EMAIL =
  /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,190}\.[A-Za-z]{2,24}$/;

const readPresetProfileEmail = (request: Request): string | undefined => {
  const email = new URL(request.url).searchParams.get("email")?.trim();
  if (email === undefined || email.length === 0) {
    return undefined;
  }

  // The address becomes a profile folder name and a shell value: a plain address or nothing.
  return PLAIN_EMAIL.test(email) ? email.toLowerCase() : undefined;
};

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const origin = buildAppOrigin(request);
  const rawToken = new URL(request.url).searchParams.get("token")?.trim();
  const hasToken = rawToken !== undefined && rawToken.length > 0;

  if (hasToken && !isValidAgentWitchPairingToken(rawToken)) {
    return new Response(
      "Install token is required. Open Home while signed in and copy the Connect this computer install command.",
      { status: 400 },
    );
  }

  const script = hasToken
    ? renderInstallAgentWitchScript(origin, {
        presetPairingToken: rawToken,
        presetProfileEmail: readPresetProfileEmail(request),
      })
    : renderInstallAgentWitchScript(origin);

  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
