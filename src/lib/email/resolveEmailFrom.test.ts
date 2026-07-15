import { afterEach, describe, expect, it } from "vitest";

import resolveEmailFrom, { isPlaceholderEmailFrom } from "./resolveEmailFrom";

describe("resolveEmailFrom", () => {
  const previousEmailFrom = process.env.EMAIL_FROM;

  afterEach(() => {
    process.env.EMAIL_FROM = previousEmailFrom;
  });

  it("rejects placeholder sender domains", () => {
    expect(
      isPlaceholderEmailFrom("Daily Magic <noreply@your-verified-domain.com>"),
    ).toBe(true);

    process.env.EMAIL_FROM = "Daily Magic <noreply@your-verified-domain.com>";
    expect(resolveEmailFrom()).toBeUndefined();
  });

  it("returns a configured sender address", () => {
    process.env.EMAIL_FROM = "Agent Witch <noreply@agentwitch.com>";
    expect(resolveEmailFrom()).toBe("Agent Witch <noreply@agentwitch.com>");
  });
});
