import { describe, expect, it } from "vitest";

import { maskEmail } from "@/lib/projects/acl/humanInvites/maskEmail";

describe("maskEmail", () => {
  it("masks local + domain label, keeps TLD", () => {
    expect(maskEmail("thien@gmail.com")).toBe("t***@g***.com");
    expect(maskEmail("Ada@Example.ORG")).toBe("a***@e***.org");
  });

  it("handles missing or malformed addresses", () => {
    expect(maskEmail("")).toBe("***");
    expect(maskEmail("not-an-email")).toBe("***");
    expect(maskEmail("@nodomain")).toBe("***");
    expect(maskEmail("local@")).toBe("***");
  });

  it("handles domain without a TLD dot", () => {
    expect(maskEmail("a@localhost")).toBe("a***@l***");
  });
});
