import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { renderLocalWakeInstallScript } from "@/lib/agentWitch/localWake/renderLocalWakeInstallScript";

export const dynamic = "force-dynamic";

/** Installer for the local wake receiver (agents without a Grok routine wake by webhook, not polling). */
export async function GET(request: Request): Promise<Response> {
  return new Response(renderLocalWakeInstallScript(buildAppOrigin(request)), {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
