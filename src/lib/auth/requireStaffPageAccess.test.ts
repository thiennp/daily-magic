import { beforeEach, describe, expect, it, vi } from "vitest";

const notFoundMock = vi.fn();
const getAuthActorMock = vi.fn();
const connectionMock = vi.fn();

vi.mock("next/navigation", () => ({
  notFound: (): void => {
    notFoundMock();
    throw new Error("notFound");
  },
}));

vi.mock("next/server", () => ({
  connection: (): ReturnType<typeof connectionMock> => connectionMock(),
}));

vi.mock("@/lib/auth/auth", () => ({
  getAuthActor: (): ReturnType<typeof getAuthActorMock> => getAuthActorMock(),
}));

import {
  isStaffPageViewer,
  requireStaffPageAccess,
} from "@/lib/auth/requireStaffPageAccess";
import { GlobalRole } from "@/lib/auth/roles";

describe("requireStaffPageAccess", () => {
  beforeEach(() => {
    notFoundMock.mockClear();
    getAuthActorMock.mockReset();
    connectionMock.mockReset();
    connectionMock.mockResolvedValue(undefined);
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
    expect(connectionMock).toHaveBeenCalledOnce();
  });

  it("opts into dynamic rendering before reading auth", async () => {
    getAuthActorMock.mockResolvedValue(null);

    await expect(requireStaffPageAccess()).rejects.toThrow("notFound");
    expect(connectionMock).toHaveBeenCalledBefore(getAuthActorMock);
  });
});

describe("isStaffPageViewer", () => {
  beforeEach(() => {
    getAuthActorMock.mockReset();
    connectionMock.mockReset();
    connectionMock.mockResolvedValue(undefined);
  });

  it("returns false when unauthenticated", async () => {
    getAuthActorMock.mockResolvedValue(null);

    await expect(isStaffPageViewer()).resolves.toBe(false);
    expect(connectionMock).toHaveBeenCalledOnce();
  });

  it("returns true for global admin", async () => {
    getAuthActorMock.mockResolvedValue({
      id: "u1",
      email: "admin@agentwitch.com",
      globalRole: GlobalRole.ADMIN,
    });

    await expect(isStaffPageViewer()).resolves.toBe(true);
  });
});
