import { beforeEach, describe, expect, it, vi } from "vitest";

const notFoundMock = vi.fn();
const getAuthActorMock = vi.fn();

vi.mock("next/navigation", () => ({
  notFound: (): void => {
    notFoundMock();
    throw new Error("notFound");
  },
}));

vi.mock("@/lib/auth/auth", () => ({
  getAuthActor: (): ReturnType<typeof getAuthActorMock> => getAuthActorMock(),
}));

import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";
import { GlobalRole } from "@/lib/auth/roles";

describe("requireStaffPageAccess", () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    getAuthActorMock.mockReset();
  });

  it("returns actor for global admin", async () => {
    const actor = {
      id: "u1",
      email: "admin@agentwitch.com",
      globalRole: GlobalRole.ADMIN,
    };
    getAuthActorMock.mockResolvedValue(actor);

    await expect(requireStaffPageAccess()).resolves.toBe(actor);
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it("calls notFound when unauthenticated", async () => {
    getAuthActorMock.mockResolvedValue(null);

    await expect(requireStaffPageAccess()).rejects.toThrow("notFound");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });

  it("calls notFound for signed-in non-admin", async () => {
    getAuthActorMock.mockResolvedValue({
      id: "u2",
      email: "user@agentwitch.com",
      globalRole: GlobalRole.USER,
    });

    await expect(requireStaffPageAccess()).rejects.toThrow("notFound");
    expect(notFoundMock).toHaveBeenCalledOnce();
  });
});
