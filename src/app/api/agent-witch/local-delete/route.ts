import { requestLocalAgentWitchInstallDeleteRun } from "@/lib/agentWitch/fetchLocalAgentWitchInstallDelete";
import { resolveLocalAgentWitchWakeBaseUrl } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const uninstall = await requestLocalAgentWitchInstallDeleteRun();
  const wakeBaseUrl = resolveLocalAgentWitchWakeBaseUrl();

  return Response.json(
    {
      ok: uninstall.reachable && uninstall.result !== null,
      reachable: uninstall.reachable,
      actorId: actor.id,
      result: uninstall.result,
      localApi: {
        deleteUrl: `${wakeBaseUrl}/install/delete`,
      },
    },
    { status: uninstall.reachable ? 200 : 503 },
  );
}
