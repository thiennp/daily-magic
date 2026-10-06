import { describe, expect, it } from "vitest";

import {
  parseCreateCapabilityBody,
  parseOptionalCapabilityVisibility,
} from "@/lib/capabilities/parseCapabilityBody";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

describe("parseOptionalCapabilityVisibility", () => {
  it("treats absent visibility as ok undefined (default later)", () => {
    expect(parseOptionalCapabilityVisibility({ name: "x" })).toEqual({
      ok: true,
      visibility: undefined,
    });
  });

  it("accepts private", () => {
    expect(
      parseOptionalCapabilityVisibility({ visibility: "private" }),
    ).toEqual({ ok: true, visibility: "private" });
  });

  it("rejects invalid visibility", () => {
    expect(
      parseOptionalCapabilityVisibility({ visibility: "secret" }),
    ).toEqual({
      ok: false,
      code: "invalid_visibility",
      error: "visibility must be private, group, or public.",
    });
  });
});

describe("parseCreateCapabilityBody", () => {
  it("includes a valid requested visibility", () => {
    const parsed = parseCreateCapabilityBody({
      name: "Probe",
      type: CapabilityType.WORKFLOW,
      visibility: "private",
      workflowFields: [{ key: "t", label: "T", type: "text", required: true }],
    });
    expect(parsed?.visibility).toBe("private");
  });

  it("omits visibility when absent", () => {
    const parsed = parseCreateCapabilityBody({
      name: "Probe",
      type: CapabilityType.AGENT,
    });
    expect(parsed?.visibility).toBeUndefined();
  });
});
