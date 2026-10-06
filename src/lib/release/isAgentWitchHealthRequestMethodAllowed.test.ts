import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_HEALTH_ALLOWED_METHODS,
  isAgentWitchHealthRequestMethodAllowed,
} from "@/lib/release/isAgentWitchHealthRequestMethodAllowed";

describe("isAgentWitchHealthRequestMethodAllowed", () => {
  it.each(["GET", "HEAD", "get", undefined])("allows %s", (method) => {
    expect(isAgentWitchHealthRequestMethodAllowed(method)).toBe(true);
  });

  it.each(["DELETE", "POST", "PUT", "PATCH", "OPTIONS"])(
    "rejects %s",
    (method) => {
      expect(isAgentWitchHealthRequestMethodAllowed(method)).toBe(false);
    },
  );

  it("exposes the Allow list used for 405 responses", () => {
    expect(AGENT_WITCH_HEALTH_ALLOWED_METHODS.join(", ")).toBe("GET, HEAD");
  });
});
