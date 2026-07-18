import {
  fetchLocalAgentWitchWatchdog,
  requestLocalAgentWitchWatchdogRevive,
} from "@/lib/agentWitch/fetchLocalAgentWitchWatchdog";
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

  const snapshot = await fetchLocalAgentWitchWatchdog({
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
      statusUrl: `${wakeBaseUrl}/watchdog/status`,
      logsUrl: `${wakeBaseUrl}/watchdog/logs`,
      reviveUrl: `${wakeBaseUrl}/watchdog/revive`,
      restartUrl: `${wakeBaseUrl}/restart`,
    },
  });
}

export async function POST(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const revive = await requestLocalAgentWitchWatchdogRevive();

  return Response.json(
    {
      ok: revive.reachable && revive.result !== null,
      reachable: revive.reachable,
      actorId: actor.id,
      result: revive.result,
    },
    { status: revive.reachable ? 200 : 503 },
  );
}
