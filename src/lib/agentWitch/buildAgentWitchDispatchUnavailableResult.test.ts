import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  AGENT_WITCH_DISPATCH_ERROR_CODES,
  MAC_OFFLINE_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { buildAgentWitchDispatchUnavailableResult } from "@/lib/agentWitch/buildAgentWitchDispatchUnavailableResult";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: vi.fn(),
}));

const buildDeviceRecord = (overrides: {
  readonly lastSeenAt: string | null;
  readonly revokedAt: string | null;
}) => ({
  id: "device-1",
  userId: "user-1",
  deviceLabel: "Studio-Mac#thien",
  displayName: null,
  dispatchPolicy: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

describe("buildAgentWitchDispatchUnavailableResult", () => {
  beforeEach(() => {
    vi.mocked(findAgentWitchDeviceById).mockReset();
  });

  it("reports a re-pair when the targeted row was revoked", async () => {
    vi.mocked(findAgentWitchDeviceById).mockResolvedValue(
      buildDeviceRecord({
        lastSeenAt: new Date().toISOString(),
        revokedAt: "2026-01-02T00:00:00.000Z",
      }),
    );

    await expect(
      buildAgentWitchDispatchUnavailableResult({
        deviceId: "device-1",
        reconnectingMessage: "reconnecting",
      }),
    ).resolves.toEqual({
      kind: "offline",
      errorMessage: MAC_REPLACED_ERROR,
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
    });
  });

  it("reports offline when the row is active but stale", async () => {
    vi.mocked(findAgentWitchDeviceById).mockResolvedValue(
      buildDeviceRecord({
        lastSeenAt: "2020-01-01T00:00:00.000Z",
        revokedAt: null,
      }),
    );

    await expect(
      buildAgentWitchDispatchUnavailableResult({
        deviceId: "device-1",
        reconnectingMessage: "reconnecting",
      }),
    ).resolves.toEqual({
      kind: "offline",
      errorMessage: MAC_OFFLINE_ERROR,
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
    });
  });

  it("asks for a retry when an active row was seen recently", async () => {
    vi.mocked(findAgentWitchDeviceById).mockResolvedValue(
      buildDeviceRecord({
        lastSeenAt: new Date().toISOString(),
        revokedAt: null,
      }),
    );

    await expect(
      buildAgentWitchDispatchUnavailableResult({
        deviceId: "device-1",
        reconnectingMessage: "reconnecting",
      }),
    ).resolves.toEqual({
      kind: "retry",
      errorMessage: "reconnecting",
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    });
  });
});
