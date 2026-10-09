import { describe, expect, it } from "vitest";

import { canDeleteUser } from "@/lib/auth/globalRolePermissions";

const actor = (globalRole: string, id = "a") => ({ id, globalRole }) as never;
const target = (globalRole: string, id = "t") => ({ id, globalRole }) as never;

describe("canDeleteUser", () => {
  it("an admin deletes ordinary users but not staff", () => {
    expect(canDeleteUser(actor("admin"), target("user"))).toBe(true);
    expect(canDeleteUser(actor("admin"), target("admin"))).toBe(false);
    expect(canDeleteUser(actor("admin"), target("super_admin"))).toBe(false);
  });

  it("the super admin deletes staff, never themselves, and ordinary users cannot delete anyone", () => {
    expect(canDeleteUser(actor("super_admin"), target("admin"))).toBe(true);
    expect(canDeleteUser(actor("super_admin", "x"), target("user", "x"))).toBe(
      false,
    );
    expect(canDeleteUser(actor("user"), target("user"))).toBe(false);
  });
});
