import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { renderDeleteAgentWitchScript } from "@/lib/agentWitch/renderDeleteAgentWitchScript";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const origin = buildAppOrigin(request);
  const script = renderDeleteAgentWitchScript(origin);

  return new Response(script, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
