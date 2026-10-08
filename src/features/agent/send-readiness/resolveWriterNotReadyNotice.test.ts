import { describe, expect, it } from "vitest";

import { resolveWriterNotReadyNotice } from "@/features/agent/send-readiness/resolveWriterNotReadyNotice";

const writers = [
  { writerAgent: "claude-cli", ready: true, loggedIn: null },
  { writerAgent: "codex", ready: false, loggedIn: null },
  { writerAgent: "cursor", ready: true, loggedIn: false },
];

describe("resolveWriterNotReadyNotice (5ca01f06)", () => {
  it("Testi 6f6a236f: warns when the picked tool isn't set up", () => {
    expect(
      resolveWriterNotReadyNotice({
        writerAgent: "codex",
        writers,
        computerName: "Linux device · 10F4",
      }),
    ).toBe(
      "Codex isn't set up on Linux device · 10F4. Install and sign in to it there, or pick another coding tool.",
    );
  });

  it("warns when the tool reported it is signed out", () => {
    expect(
      resolveWriterNotReadyNotice({
        writerAgent: "cursor",
        writers,
        computerName: "Mac",
      }),
    ).toContain("isn't signed in on Mac");
  });

  it("stays quiet for ready tools, unknown tools and older hosts", () => {
    expect(
      resolveWriterNotReadyNotice({
        writerAgent: "claude-cli",
        writers,
        computerName: "Mac",
      }),
    ).toBeNull();
    expect(
      resolveWriterNotReadyNotice({
        writerAgent: "cursor-cloud",
        writers,
        computerName: "Mac",
      }),
    ).toBeNull();
    expect(
      resolveWriterNotReadyNotice({
        writerAgent: "codex",
        writers: undefined,
        computerName: "Mac",
      }),
    ).toBeNull();
  });
});
