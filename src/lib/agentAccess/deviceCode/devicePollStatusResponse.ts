import type { PollDeviceTokenResult } from "@/lib/agentAccess/deviceCode/PollDeviceTokenResult.type";

export const devicePollDeniedResponse = (): PollDeviceTokenResult => ({
  ok: false,
  status: 400,
  body: { error: "access_denied" },
});

export const devicePollExpiredResponse = (): PollDeviceTokenResult => ({
  ok: false,
  status: 400,
  body: { error: "expired_token" },
});

export const devicePollConsumedResponse = (): PollDeviceTokenResult => ({
  ok: false,
  status: 400,
  body: {
    error: "invalid_grant",
    error_description: "device_code already used.",
  },
});

export const devicePollPendingResponse = (): PollDeviceTokenResult => ({
  ok: false,
  status: 400,
  body: { error: "authorization_pending" },
});

export const devicePollInvalidGrantResponse = (): PollDeviceTokenResult => ({
  ok: false,
  status: 400,
  body: { error: "invalid_grant" },
});
