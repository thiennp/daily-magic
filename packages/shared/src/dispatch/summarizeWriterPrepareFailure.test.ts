import { describe, expect, it } from "vitest";

import { summarizeWriterPrepareFailure } from "./summarizeWriterPrepareFailure";

describe("summarizeWriterPrepareFailure (5ca01f06)", () => {
  it("Testi 6f6a236f: a Codex prepare timeout names Codex, not Claude", () => {
    expect(
      summarizeWriterPrepareFailure(
        "Failed to prepare codex: ensure-writer.sh timed out after 120s",
      ),
    ).toBe(
      "Codex isn't ready on this computer. Sign in to it there, or pick another coding tool, then retry.",
    );
  });

  it("the host's fail-fast sign-in reason becomes the codex login step", () => {
    expect(
      summarizeWriterPrepareFailure(
        "Failed to prepare codex: Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.",
      ),
    ).toBe(
      "Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.",
    );
  });

  it("leaves Claude, Antigravity and other output to their own copy", () => {
    expect(
      summarizeWriterPrepareFailure(
        "Failed to prepare claude-cli: ensure-writer.sh timed out after 120s",
      ),
    ).toBeNull();
    expect(
      summarizeWriterPrepareFailure("Failed to prepare antigravity: x"),
    ).toBeNull();
    expect(summarizeWriterPrepareFailure("all good")).toBeNull();
  });
});
