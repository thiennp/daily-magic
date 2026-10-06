import { randomUUID } from "node:crypto";

import { AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH } from "@/lib/agentAccess/agentAccess.constant";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  DEVICE_CLIENT_NAME_MAX,
  DEVICE_CODE_INTERVAL_SECONDS,
  DEVICE_CODE_TTL_MS,
  DEVICE_START_BUCKET,
  DEVICE_START_PER_HOUR,
  DEVICE_VERIFICATION_URI,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  createDeviceCode,
  createUserCode,
  formatUserCodeDisplay,
  hashDeviceCode,
  hashUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { requireAwcTermsAcceptance } from "@/lib/agentAccess/requireAwcTermsAcceptance";
import { getSql } from "@/lib/db";

export type StartDeviceAuthorizationResult =
  | {
      readonly ok: true;
      readonly status: 200;
      readonly body: {
        readonly device_code: string;
        readonly user_code: string;
        readonly verification_uri: string;
        readonly verification_uri_complete: string;
        readonly expires_in: number;
        readonly interval: number;
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

const readOptionalName = (
  value: unknown,
  max: number,
): string | null | "invalid" => {
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== "string") {
    return "invalid";
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  if (trimmed.length > max) {
    return "invalid";
  }
  return trimmed;
};

export const startDeviceAuthorization = async (input: {
  readonly body: unknown;
  readonly ipHash: string;
  readonly nowMs?: number;
}): Promise<StartDeviceAuthorizationResult> => {
  const allowed = await consumeAgentAccessBucket({
    subjectHash: input.ipHash,
    bucket: DEVICE_START_BUCKET,
    limit: DEVICE_START_PER_HOUR,
  });
  if (!allowed) {
    return {
      ok: false,
      status: 429,
      code: "rate_limited",
      error: "Too many device-start attempts. Try again in an hour.",
    };
  }

  if (input.body === null || typeof input.body !== "object") {
    return {
      ok: false,
      status: 400,
      code: "invalid_arguments",
      error: "JSON body required.",
    };
  }

  const raw = input.body as Record<string, unknown>;
  const terms = requireAwcTermsAcceptance({
    acceptTerms: raw.acceptTerms,
    termsVersion: raw.termsVersion,
  });
  if (!terms.ok) {
    return {
      ok: false,
      status: terms.status,
      code: terms.code,
      error: terms.error,
    };
  }

  const clientName = readOptionalName(raw.clientName, DEVICE_CLIENT_NAME_MAX);
  const displayName = readOptionalName(
    raw.displayName,
    Math.min(DEVICE_CLIENT_NAME_MAX, AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH),
  );
  if (clientName === "invalid" || displayName === "invalid") {
    return {
      ok: false,
      status: 400,
      code: "invalid_arguments",
      error: "clientName/displayName must be short strings when provided.",
    };
  }

  await ensureDeviceCodeSchema();
  const nowMs = input.nowMs ?? Date.now();
  const expiresAt = new Date(nowMs + DEVICE_CODE_TTL_MS);
  const deviceCode = createDeviceCode();
  const userCodeRaw = createUserCode();
  const userCodeDisplay = formatUserCodeDisplay(userCodeRaw);
  const id = randomUUID();

  const sql = getSql();
  await sql`
    INSERT INTO agent_access_device_requests (
      id, device_code_hash, user_code_hash, client_name, display_name,
      terms_version, status, interval_seconds, expires_at, created_at
    )
    VALUES (
      ${id},
      ${hashDeviceCode(deviceCode)},
      ${hashUserCode(userCodeRaw)},
      ${clientName},
      ${displayName},
      ${terms.termsVersion},
      'pending',
      ${DEVICE_CODE_INTERVAL_SECONDS},
      ${expiresAt.toISOString()},
      ${new Date(nowMs).toISOString()}
    )
  `;

  const verificationUriComplete = `${DEVICE_VERIFICATION_URI}?user_code=${encodeURIComponent(userCodeDisplay)}`;

  return {
    ok: true,
    status: 200,
    body: {
      device_code: deviceCode,
      user_code: userCodeDisplay,
      verification_uri: DEVICE_VERIFICATION_URI,
      verification_uri_complete: verificationUriComplete,
      expires_in: Math.floor(DEVICE_CODE_TTL_MS / 1000),
      interval: DEVICE_CODE_INTERVAL_SECONDS,
    },
  };
};
