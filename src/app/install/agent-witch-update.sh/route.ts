import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";

export const dynamic = "force-dynamic";

/**
 * Update + repair: stop AWL, back up identity, reinstall, verify (keeps the pairing
 * link). The Repair manually panel shows this URL; the repair alias serves the same.
 */
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
