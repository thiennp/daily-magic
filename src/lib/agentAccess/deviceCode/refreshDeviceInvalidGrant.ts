import type { RefreshDeviceAccessTokenResult } from "@/lib/agentAccess/deviceCode/RefreshDeviceAccessTokenResult.type";

export const refreshDeviceInvalidGrant = (
  description: string,
): RefreshDeviceAccessTokenResult => ({
  ok: false,
  status: 400,
  body: {
    error: "invalid_grant",
    error_description: description,
  },
});
