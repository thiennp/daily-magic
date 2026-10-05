import { describe, expect, it } from "vitest";

import parseSecChUaMobile from "@/lib/mobile/parseSecChUaMobile";

describe("parseSecChUaMobile", () => {
  it("parses ?1 as mobile and ?0 as not mobile", () => {
    expect(parseSecChUaMobile("?1")).toBe(true);
    expect(parseSecChUaMobile(" ?1 ")).toBe(true);
    expect(parseSecChUaMobile("?0")).toBe(false);
  });

  it("returns null when the hint is missing or malformed", () => {
    expect(parseSecChUaMobile(null)).toBeNull();
    expect(parseSecChUaMobile(undefined)).toBeNull();
    expect(parseSecChUaMobile("")).toBeNull();
    expect(parseSecChUaMobile("1")).toBeNull();
    expect(parseSecChUaMobile("true")).toBeNull();
  });
});
