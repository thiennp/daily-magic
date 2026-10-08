import { describe, expect, it } from "vitest";

import { mapWakeFailureReason } from "@/features/projects/members/utils/formatAssistantWakeHealth";

describe("mapWakeFailureReason (P1-S1b)", () => {
  it("maps stored failure codes to plain copy, never the raw code", () => {
    expect(mapWakeFailureReason("HTTP 429")).toEqual({
      text: "Grok Bot was busy. Try again in a few minutes.",
      offerPaste: false,
    });
    expect(mapWakeFailureReason("HTTP 500").text).toBe(
      "Grok Bot had a problem on its side.",
    );
    expect(mapWakeFailureReason("HTTP 401")).toEqual({
      text: "Grok Bot didn't accept the key.",
      offerPaste: true,
    });
    expect(
      mapWakeFailureReason(
        "No wake link was saved when this message was sent.",
      ),
    ).toEqual({
      text: "No wake link was saved when this message was sent.",
      offerPaste: true,
    });
    expect(mapWakeFailureReason("HTTP 404")).toEqual({
      text: "Something went wrong.",
      offerPaste: true,
    });
  });

  it("every HTTP 5nn → server-problem line, no paste offer", () => {
    for (const code of ["HTTP 501", "HTTP 502", " HTTP 503 "]) {
      expect(mapWakeFailureReason(code)).toEqual({
        text: "Grok Bot had a problem on its side.",
        offerPaste: false,
      });
    }
  });
});
