import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const sync = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/syncProjectComputerMembership", () => ({
  syncProjectComputerMembership: sync,
}));

import { setUserProjectLinkedDevice } from "@/lib/projects/setUserProjectLinkedDevice";

const existingRow = {
  id: "proj-1",
  owner_user_id: "owner-1",
  device_id: "dev-old",
  name: "infusion",
  folder_path: "/old",
  repo_urls: [],
  default_branch: null,
  last_used_at: null,
  created_at: "2026-10-05T00:00:00.000Z",
  updated_at: "2026-10-05T00:00:00.000Z",
};

describe("setUserProjectLinkedDevice (seat choke point)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sync.mockClear();
  });

  it("bind: null → device upserts seat via sync", async () => {
    sqlMock
      .mockResolvedValueOnce([{ ...existingRow, device_id: null }])
      .mockResolvedValueOnce([
        { ...existingRow, device_id: "dev-1", folder_path: "/new" },
      ]);

    const project = await setUserProjectLinkedDevice({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-1",
      folderPath: "/new",
    });

    expect(project?.deviceId).toBe("dev-1");
    expect(sync).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      previousDeviceId: null,
      nextDeviceId: "dev-1",
    });
  });

  it("rebind: old → new moves the seat", async () => {
    sqlMock
      .mockResolvedValueOnce([existingRow])
      .mockResolvedValueOnce([{ ...existingRow, device_id: "dev-new" }]);

    await setUserProjectLinkedDevice({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-new",
    });

    expect(sync).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      previousDeviceId: "dev-old",
      nextDeviceId: "dev-new",
    });
  });

  it("unbind: device → null deactivates the seat", async () => {
    sqlMock
      .mockResolvedValueOnce([existingRow])
      .mockResolvedValueOnce([{ ...existingRow, device_id: null }]);

    const project = await setUserProjectLinkedDevice({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: null,
    });

    expect(project?.deviceId).toBeNull();
    expect(sync).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      previousDeviceId: "dev-old",
      nextDeviceId: null,
    });
  });
});
