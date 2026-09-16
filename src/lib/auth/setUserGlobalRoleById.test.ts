import { describe, expect, it, vi } from "vitest";

import { GlobalRole } from "@/lib/auth/roles";
import setUserGlobalRoleById from "@/lib/auth/setUserGlobalRoleById";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

describe("setUserGlobalRoleById", () => {
  it("updates global_role for valid role", async () => {
    sqlMock.mockResolvedValue(undefined);

    await setUserGlobalRoleById("user-1", GlobalRole.SUPER_ADMIN);

    expect(sqlMock).toHaveBeenCalled();
  });
});
