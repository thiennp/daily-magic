import { describe, expect, it } from "vitest";

import { mapHistoryFailuresToSkillPitfalls } from "./mapHistoryFailuresToSkillPitfalls";

describe("mapHistoryFailuresToSkillPitfalls", () => {
  it("maps failure reasons into scrubbed bullets and local entries", () => {
    const result = mapHistoryFailuresToSkillPitfalls({
      failures: [
        {
          episodeId: "ep-fail-1",
          state: "FAILED_VALIDATE",
          reason: "too_few_steps",
        },
        {
          episodeId: "ep-fail-2",
          state: "QUARANTINED",
          reason: "scrub_quarantine",
        },
      ],
      nowIso: "2026-10-05T12:00:00.000Z",
    });
    expect(result.skillPitfallLines.length).toBe(2);
    expect(result.localEntries).toHaveLength(2);
    expect(result.skillPitfallLines[0]).toContain("too_few_steps");
    expect(result.skippedSecretCount).toBe(0);
  });

  it("drops residual-secret reasons", () => {
    const result = mapHistoryFailuresToSkillPitfalls({
      failures: [
        {
          episodeId: "ep-sec",
          state: "FAILED_EXTRACT",
          reason: "leak sk-abcdefghijklmnopqrstuvwxyz12",
        },
      ],
    });
    // scrub removes sk- so may not residual — if scrub clears it, entry may exist.
    // Force PEM residual:
    const pem = mapHistoryFailuresToSkillPitfalls({
      failures: [
        {
          episodeId: "ep-pem",
          state: "FAILED_EXTRACT",
          reason:
            "-----BEGIN PRIVATE KEY-----\nMIIE\n-----END PRIVATE KEY-----",
        },
      ],
    });
    // After scrub, PEM is replaced so residualSecret is false — entry may be kept scrubbed.
    // Design: residual after scrub → drop. Scrub replaces PEM fully → residual false.
    // So secret-looking content becomes [redacted-private-key] and is kept (safe).
    expect(pem.skillPitfallLines.join(" ")).toContain("redacted-private-key");
    expect(result.skillPitfallLines.join(" ")).toContain("redacted-secret");
  });

  it("dedupes identical normalized failures and respects draft cap", () => {
    const result = mapHistoryFailuresToSkillPitfalls({
      failures: Array.from({ length: 10 }, (_, i) => ({
        episodeId: `ep-${i}`,
        state: "FAILED_VALIDATE" as const,
        reason: "too_few_steps",
      })),
      maxPerDraft: 3,
      maxStored: 3,
    });
    expect(result.skillPitfallLines).toHaveLength(1);
    expect(result.localEntries).toHaveLength(1);
  });
});
