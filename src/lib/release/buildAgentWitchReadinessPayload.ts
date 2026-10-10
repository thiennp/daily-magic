/**
 * `/api/ready` (server.ts): unlike `/api/health` (always 200 so the process is
 * "alive"), this is 200 only when Next is prepared AND the database answers.
 * Railway's deploy healthcheck uses it, so a build that cannot serve (or has
 * no database) never replaces the running one, and an uptime monitor can tell
 * "app down" from "database down".
 */
export interface AgentWitchReadinessPayload {
  readonly ok: boolean;
  readonly nextReady: boolean;
  readonly database: "ok" | "unreachable" | "timeout";
}

const DEFAULT_DATABASE_TIMEOUT_MS = 3_000;

const TIMEOUT_MARKER = Symbol("readiness-timeout");

const probeDatabase = async (
  checkDatabase: () => Promise<unknown>,
  timeoutMs: number,
): Promise<AgentWitchReadinessPayload["database"]> => {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<typeof TIMEOUT_MARKER>((resolve) => {
    timer = setTimeout(() => resolve(TIMEOUT_MARKER), timeoutMs);
  });
  try {
    const outcome = await Promise.race([checkDatabase(), timeout]);
    return outcome === TIMEOUT_MARKER ? "timeout" : "ok";
  } catch {
    return "unreachable";
  } finally {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  }
};

export const buildAgentWitchReadinessPayload = async (input: {
  readonly nextReady: boolean;
  readonly checkDatabase: () => Promise<unknown>;
  readonly timeoutMs?: number;
}): Promise<AgentWitchReadinessPayload> => {
  const database = await probeDatabase(
    input.checkDatabase,
    input.timeoutMs ?? DEFAULT_DATABASE_TIMEOUT_MS,
  );
  return {
    ok: input.nextReady && database === "ok",
    nextReady: input.nextReady,
    database,
  };
};
