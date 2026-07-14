import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { listAgentWitchInstallScriptNames } from "@/lib/agentWitch/listAgentWitchInstallScriptNames";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      scripts: listAgentWitchInstallScriptNames(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
