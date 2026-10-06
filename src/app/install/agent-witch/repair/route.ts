import { buildAppOrigin } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchRepairInfo } from "@/lib/agentWitch/repair/buildAgentWitchRepairInfo";

export const dynamic = "force-dynamic";

/** Repair commands per OS + min/latest bundle, for UI and docs to render. */
export async function GET(request: Request): Promise<Response> {
  return Response.json(buildAgentWitchRepairInfo(buildAppOrigin(request)), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
