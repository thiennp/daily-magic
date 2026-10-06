import { describe, expect, it } from "vitest";

import { decideProjectHistoryOffPurge } from "./decideProjectHistoryOffPurge";

describe("decideProjectHistoryOffPurge", () => {
  it("purges on confirmed OFF with targets", () => {
    expect(
      decideProjectHistoryOffPurge({
        cloudState: { kind: "known", state: "off" },
        hasPurgeTargets: true,
      }),
    ).toBe("purge");
  });

  it("is a no-op on confirmed OFF with nothing on disk", () => {
    expect(
      decideProjectHistoryOffPurge({
        cloudState: { kind: "known", state: "off" },
        hasPurgeTargets: false,
      }),
    ).toBe("nothing_to_purge");
  });

  it("never purges on an unknown read, even with targets", () => {
    expect(
      decideProjectHistoryOffPurge({
        cloudState: { kind: "unknown", reason: "http_500" },
        hasPurgeTargets: true,
      }),
    ).toBe("skipped_unknown");
  });

  it.each(["on_configuring", "on_ready", "degraded"] as const)(
    "never purges when cloud says %s",
    (state) => {
      expect(
        decideProjectHistoryOffPurge({
          cloudState: { kind: "known", state },
          hasPurgeTargets: true,
        }),
      ).toBe("history_on");
    },
  );
});
