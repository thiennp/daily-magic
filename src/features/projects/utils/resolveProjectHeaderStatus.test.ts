import { describe, expect, it } from "vitest";

import resolveProjectHeaderStatus from "@/features/projects/utils/resolveProjectHeaderStatus";

const presence = (
  statusIcon: "online" | "offline" | "reconnecting",
  text = "",
) => ({ statusIcon, text });

describe("resolveProjectHeaderStatus (V5-3 / HN-H3)", () => {
  it("uses locked v5 strings for this computer", () => {
    expect(
      resolveProjectHeaderStatus({
        presence: presence("online"),
        isThisMac: true,
        hasLinkedDevice: true,
        deviceDisplayName: "Studio",
      }),
    ).toEqual({ tone: "ok", text: "This computer is online" });
    expect(
      resolveProjectHeaderStatus({
        presence: presence("offline"),
        isThisMac: true,
        hasLinkedDevice: true,
        deviceDisplayName: "Studio",
        lastSeenLabel: "1h ago",
      }),
    ).toEqual({
      tone: "neutral",
      text: "This computer is offline · last seen 1h ago · tasks here wait until it's back",
    });
  });

  it("keeps device name for another computer and warns on reconnecting", () => {
    const base = { isThisMac: false, hasLinkedDevice: true, deviceDisplayName: "Studio" };
    expect(resolveProjectHeaderStatus({ ...base, presence: presence("online") }).text).toBe(
      "Online on Studio",
    );
    expect(resolveProjectHeaderStatus({ ...base, presence: presence("offline") }).text).toBe(
      "Offline on Studio",
    );
    expect(
      resolveProjectHeaderStatus({ ...base, presence: presence("reconnecting") }),
    ).toEqual({ tone: "warn", text: "Reconnecting" });
  });

  it("shows the presence line when no computer is linked", () => {
    expect(
      resolveProjectHeaderStatus({
        presence: presence("offline", "No computer linked"),
        isThisMac: false,
        hasLinkedDevice: false,
        deviceDisplayName: "",
      }),
    ).toEqual({ tone: "neutral", text: "No computer linked" });
  });
});
