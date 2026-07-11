import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const origin = buildAppOrigin(request);
  const script = renderInstallAgentWitchScript(origin);

  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
