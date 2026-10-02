import { describe, expect, it } from "vitest";

import formatAdminUserKindLabel from "@/features/admin/utils/formatAdminUserKindLabel";

describe("formatAdminUserKindLabel", () => {
  it("maps Lead kind enum to clear labels", () => {
    expect(formatAdminUserKindLabel("real")).toBe("Real");
    expect(formatAdminUserKindLabel("bot")).toBe("Bot");
    expect(formatAdminUserKindLabel("test")).toBe("Test");
  });
});
