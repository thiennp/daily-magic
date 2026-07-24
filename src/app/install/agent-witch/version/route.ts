import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { listAgentWitchInstallBundleArtifacts } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(
    {
      ok: true,
      bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      bundleUrl: listAgentWitchInstallBundleArtifacts()[0],
      scripts: listAgentWitchInstallBundleArtifacts(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
