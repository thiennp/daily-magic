import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

export interface LocalAgentWitchSelfUpdateResult {
  readonly ok: boolean;
  readonly reachable: boolean;
  readonly payload: unknown;
}

export const resolveLocalAgentWitchSelfUpdateUrl = (): string =>
  `http://127.0.0.1:${resolveAgentWitchWakePort()}/update/run`;

export const requestLocalAgentWitchSelfUpdate = async (input?: {
  readonly force?: boolean;
}): Promise<LocalAgentWitchSelfUpdateResult> => {
  try {
    const response = await fetch(resolveLocalAgentWitchSelfUpdateUrl(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ force: input?.force === true }),
      signal: AbortSignal.timeout(180_000),
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    return {
      ok: response.ok,
      reachable: true,
      payload,
    };
  } catch {
    return {
      ok: false,
      reachable: false,
      payload: null,
    };
  }
};
