import { describe, expect, it } from "vitest";

import { isAllowedWakeServerHost } from "./isAllowedWakeServerHost";

describe("isAllowedWakeServerHost", () => {
  it("accepts the loopback names on the wake port only", () => {
    expect(isAllowedWakeServerHost("127.0.0.1:47892", 47892)).toBe(true);
    expect(isAllowedWakeServerHost("localhost:47892", 47892)).toBe(true);
    expect(isAllowedWakeServerHost("LOCALHOST:47892", 47892)).toBe(true);
    expect(isAllowedWakeServerHost("localhost:1234", 47892)).toBe(false);
  });

  it("refuses a rebinding name, a missing Host and a LAN address", () => {
    expect(isAllowedWakeServerHost("evil.example:47892", 47892)).toBe(false);
    expect(isAllowedWakeServerHost("192.168.1.5:47892", 47892)).toBe(false);
    expect(isAllowedWakeServerHost(undefined, 47892)).toBe(false);
  });
});
