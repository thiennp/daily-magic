import {
  fetchLocalAgentWitchSelfUpdate,
  requestLocalAgentWitchSelfUpdateRun,
} from "@/lib/agentWitch/fetchLocalAgentWitchSelfUpdate";
import { resolveLocalAgentWitchWakeBaseUrl } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const parseLogLimit = (value: string | null): number => {
  const parsed = Number.parseInt(value ?? "20", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 20;
  }

  return Math.min(parsed, 200);
};

export async function GET(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const requestUrl = new URL(request.url);
  const includeLogs = requestUrl.searchParams.get("logs") !== "0";
  const logLimit = parseLogLimit(requestUrl.searchParams.get("limit"));

  const snapshot = await fetchLocalAgentWitchSelfUpdate({
    includeLogs,
    logLimit,
  });
  const wakeBaseUrl = resolveLocalAgentWitchWakeBaseUrl();

  return Response.json({
    ok: snapshot.reachable,
    reachable: snapshot.reachable,
    actorId: actor.id,
    status: snapshot.status,
    logs: snapshot.logs,
    localApi: {
      statusUrl: `${wakeBaseUrl}/update/status`,
      logsUrl: `${wakeBaseUrl}/update/logs`,
      runUrl: `${wakeBaseUrl}/update/run`,
    },
  });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const update = await requestLocalAgentWitchSelfUpdateRun();

  return Response.json(
    {
      ok: update.reachable && update.result !== null,
      reachable: update.reachable,
      actorId: actor.id,
      result: update.result,
    },
    { status: update.reachable ? 200 : 503 },
  );
}
