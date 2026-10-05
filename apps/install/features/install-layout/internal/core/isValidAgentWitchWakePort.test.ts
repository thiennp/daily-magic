import { describe, expect, it } from "vitest";

import { isValidAgentWitchWakePort } from "./isValidAgentWitchWakePort";

describe("isValidAgentWitchWakePort", () => {
  it.each([1, 47892, 49273, 61774, 65535])(
    "accepts integer port %s",
    (port) => {
      expect(isValidAgentWitchWakePort(port)).toBe(true);
    },
  );

  it.each([
    null,
    undefined,
    "47892",
    0,
    -1,
    65536,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    {},
    [],
  ])("rejects %s", (value) => {
    expect(isValidAgentWitchWakePort(value)).toBe(false);
  });
});
