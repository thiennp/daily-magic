import type http from "node:http";

import {
  readCodingToolsPause,
  writeCodingToolsPause,
} from "@agent-witch/install-runtime-client";
import { LOCAL_CODING_TOOL_SAFETY_COPY } from "@agent-witch/shared/dispatch";

import {
  AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LOCAL_APP_ORIGIN,
} from "./agentWitchLocalApp.constants";

export const CODING_TOOLS_PAUSE_LOCAL_PATH = "/api/local/coding-tools/pause";

const LOOPBACK_HOST = /^(?:127\.0\.0\.1|localhost):\d{1,5}$/;

/**
 * The local app answers CORS `*`, so a browser page on another site could
 * POST here. Only same-machine callers (no Origin, e.g. curl) and the AWL
 * page itself may flip the switch. Since H6 AWL listens on a per-account port,
 * "the page itself" is a loopback Origin equal to the request Host (the
 * discovered port); the legacy fixed origins stay accepted.
 */
export const isCodingToolsPauseOriginAllowed = (
  origin: string | undefined,
  host?: string,
): boolean =>
  origin === undefined ||
  origin === AGENT_WITCH_LOCAL_APP_ORIGIN ||
  origin === AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN ||
  (host !== undefined &&
    LOOPBACK_HOST.test(host) &&
    origin === `http://${host}`);

export interface CodingToolsPauseLocalRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly configPath: string;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendJson: (
    response: http.ServerResponse,
    statusCode: number,
    payload: unknown,
  ) => void;
}

const parsePausedBody = (raw: string): boolean | null => {
  try {
    const body: unknown = JSON.parse(raw);
    const paused = (body as { paused?: unknown } | null)?.paused;
    return typeof paused === "boolean" ? paused : null;
  } catch {
    return null;
  }
};

/** S0-7a minimal local surface: GET state, POST `{ paused: boolean }`. */
export const tryHandleCodingToolsPauseLocalRequest = async (
  input: CodingToolsPauseLocalRouteInput,
): Promise<boolean> => {
  if (input.pathname !== CODING_TOOLS_PAUSE_LOCAL_PATH) {
    return false;
  }
  const respond = (status: number, paused: boolean, updatedAt: string | null) =>
    input.sendJson(input.response, status, {
      ok: true,
      paused,
      updatedAt,
      label: LOCAL_CODING_TOOL_SAFETY_COPY.pauseLabel,
      hint: LOCAL_CODING_TOOL_SAFETY_COPY.pauseHint,
    });
  if (input.method === "GET") {
    const state = readCodingToolsPause(input.configPath);
    respond(200, state.paused, state.updatedAt);
    return true;
  }
  if (input.method !== "POST") {
    input.sendJson(input.response, 405, {
      ok: false,
      error: "method_not_allowed",
    });
    return true;
  }
  const origin = input.request.headers.origin;
  const host = input.request.headers.host;
  if (
    !isCodingToolsPauseOriginAllowed(
      typeof origin === "string" ? origin : undefined,
      typeof host === "string" ? host : undefined,
    )
  ) {
    input.sendJson(input.response, 403, {
      ok: false,
      error: "forbidden_origin",
    });
    return true;
  }
  const paused = parsePausedBody(await input.readBody(input.request));
  if (paused === null) {
    input.sendJson(input.response, 400, { ok: false, error: "invalid_body" });
    return true;
  }
  const state = writeCodingToolsPause(input.configPath, paused);
  respond(200, state.paused, state.updatedAt);
  return true;
};
