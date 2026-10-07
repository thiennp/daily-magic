import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { PROJECT_CONNECTIONS_OAUTH_STATE_TTL_MS } from "@/lib/projects/connections/projectConnection.constants";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

export type ProjectConnectionOAuthStatePayload = {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
  readonly userId: string;
  readonly nonce: string;
  readonly exp: number;
};

const b64url = (buf: Buffer): string =>
  buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromB64url = (value: string): Buffer => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64");
};

export const signProjectConnectionOAuthState = (
  input: {
    readonly projectId: string;
    readonly provider: ProjectConnectionProvider;
    readonly userId: string;
  },
  authSecret: string,
  nowMs: number = Date.now(),
): string => {
  const payload: ProjectConnectionOAuthStatePayload = {
    projectId: input.projectId,
    provider: input.provider,
    userId: input.userId,
    nonce: randomBytes(16).toString("hex"),
    exp: nowMs + PROJECT_CONNECTIONS_OAUTH_STATE_TTL_MS,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64url(
    createHmac("sha256", authSecret).update(body).digest(),
  );
  return `${body}.${sig}`;
};

export const verifyProjectConnectionOAuthState = (
  state: string,
  authSecret: string,
  nowMs: number = Date.now(),
): ProjectConnectionOAuthStatePayload | null => {
  const parts = state.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  if (!body || !sig) return null;
  const expected = b64url(
    createHmac("sha256", authSecret).update(body).digest(),
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const raw = JSON.parse(fromB64url(body).toString("utf8")) as unknown;
    if (
      raw === null ||
      typeof raw !== "object" ||
      typeof (raw as { projectId?: unknown }).projectId !== "string" ||
      typeof (raw as { provider?: unknown }).provider !== "string" ||
      typeof (raw as { userId?: unknown }).userId !== "string" ||
      typeof (raw as { nonce?: unknown }).nonce !== "string" ||
      typeof (raw as { exp?: unknown }).exp !== "number"
    ) {
      return null;
    }
    const payload = raw as ProjectConnectionOAuthStatePayload;
    if (payload.exp < nowMs) return null;
    return payload;
  } catch {
    return null;
  }
};
