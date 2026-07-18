import { resolveAgentWitchWakePort } from "./agentWitchWakeConstants";

export interface LocalAgentWitchRestartResult {
  readonly ok: boolean;
  readonly reachable: boolean;
  readonly payload: unknown;
}

export const resolveLocalAgentWitchRestartUrl = (): string =>
  `http://127.0.0.1:${resolveAgentWitchWakePort()}/restart`;

export const requestLocalAgentWitchRestart =
  async (): Promise<LocalAgentWitchRestartResult> => {
    try {
      const response = await fetch(resolveLocalAgentWitchRestartUrl(), {
        method: "POST",
        signal: AbortSignal.timeout(120_000),
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
