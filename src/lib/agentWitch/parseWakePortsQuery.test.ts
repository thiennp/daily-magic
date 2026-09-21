import { describe, expect, it } from "vitest";

import {
  parseWakePortQuery,
  parseWakePortsQuery,
} from "@/lib/agentWitch/parseWakePortsQuery";

describe("parseWakePortsQuery", () => {
  it("parses a single wake port", () => {
    expect(parseWakePortQuery("47892")).toBe(47_892);
  });

  it("rejects invalid wake port values", () => {
    expect(parseWakePortQuery("")).toBeNull();
    expect(parseWakePortQuery("abc")).toBeNull();
    expect(parseWakePortQuery("70000")).toBeNull();
  });

  it("parses comma-separated wake ports in order", () => {
    expect(parseWakePortsQuery("47893,47892,47893")).toEqual([47_893, 47_892]);
  });
});
