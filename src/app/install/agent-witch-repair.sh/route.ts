import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";

export const dynamic = "force-dynamic";

/** Legacy alias of /install/agent-witch-update.sh (same update + repair script). */
export async function GET(request: Request): Promise<Response> {
  const origin = buildAppOrigin(request);
  const script = renderRepairAgentWitchScript(origin);

  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
