import { createHash } from "node:crypto";

export const hashAgentAccessClientIp = (ip: string): string =>
  createHash("sha256").update(`agent-access:${ip}`).digest("hex");

export const readClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded !== null && forwarded.trim().length > 0) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
};
