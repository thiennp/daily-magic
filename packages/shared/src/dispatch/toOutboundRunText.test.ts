import { describe, expect, it } from "vitest";

import {
  hasResidualOutboundSecret,
  toOutboundRunText,
} from "./scrubOutboundSecrets";

const HIDDEN = "hidden-notice";

describe("toOutboundRunText", () => {
  it("returns scrubbed text when nothing secret survives", () => {
    const fake = `ghp_${"FAKE".repeat(6)}`;
    expect(toOutboundRunText(`token ${fake}`, HIDDEN)).toBe(
      "token [redacted-secret]",
    );
  });

  it("hides the text when a key-block tail survives scrubbing", () => {
    const tail = "FAKEFAKE\n-----END " + "PRIVATE KEY-----";
    expect(hasResidualOutboundSecret(tail)).toBe(true);
    expect(toOutboundRunText(tail, HIDDEN)).toBe(HIDDEN);
  });

  it("keeps plain text unchanged", () => {
    expect(toOutboundRunText("all good", HIDDEN)).toBe("all good");
  });
});
