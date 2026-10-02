import { describe, expect, it } from "vitest";

import filterAdminUsersByKind from "@/features/admin/utils/filterAdminUsersByKind";

describe("filterAdminUsersByKind", () => {
  const users = [
    { id: "1", kind: "real" as const },
    { id: "2", kind: "bot" as const },
    { id: "3", kind: "test" as const },
    { id: "4", kind: "bot" as const },
  ];

  it("returns all users when filter is all", () => {
    expect(filterAdminUsersByKind(users, "all")).toEqual(users);
  });

  it("filters to a single kind", () => {
    expect(filterAdminUsersByKind(users, "bot")).toEqual([
      { id: "2", kind: "bot" },
      { id: "4", kind: "bot" },
    ]);
    expect(filterAdminUsersByKind(users, "real")).toEqual([
      { id: "1", kind: "real" },
    ]);
    expect(filterAdminUsersByKind(users, "test")).toEqual([
      { id: "3", kind: "test" },
    ]);
  });
});
