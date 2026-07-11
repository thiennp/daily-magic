import type { IncomingMessage } from "node:http";

import { buildAppOriginFromHeaders } from "./buildAgentWitchInstallUrls";
import { isAgentWitchWebSocketSupportedOrigin } from "./isAgentWitchWebSocketSupportedHost";

const parseOriginHost = (origin: string): string | null => {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
};

export const isSecureAgentWitchUpgrade = (
  request: IncomingMessage,
): boolean => {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const forwardedProto = request.headers["x-forwarded-proto"];
  if (typeof forwardedProto === "string" && forwardedProto.length > 0) {
    const protocol = forwardedProto.split(",")[0]?.trim() ?? "";
    if (protocol !== "https") {
      return false;
    }
  }

  return true;
};

export const isAllowedAgentWitchOrigin = (
  request: IncomingMessage,
): boolean => {
  const origin = request.headers.origin;
  if (typeof origin !== "string" || origin.length === 0) {
    return true;
  }

  const allowedOrigin = buildAppOriginFromHeaders(
    new Headers({
      host: request.headers.host ?? "",
      "x-forwarded-host": String(request.headers["x-forwarded-host"] ?? ""),
      "x-forwarded-proto": String(request.headers["x-forwarded-proto"] ?? ""),
    }),
  );

  const allowedHost = parseOriginHost(allowedOrigin);
  const requestHost = parseOriginHost(origin);

  if (allowedHost === null || requestHost === null) {
    return isAgentWitchWebSocketSupportedOrigin(origin);
  }

  return allowedHost === requestHost;
};
