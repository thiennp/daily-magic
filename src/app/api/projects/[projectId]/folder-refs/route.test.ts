import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const upsert = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/upsertProjectFolderRef", () => ({
  upsertProjectFolderRef: upsert,
}));
vi.mock("@/lib/projects/acl/listProjectFolderRefs", () => ({
  listProjectFolderRefs: async () => [],
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => null,
}));

import { POST } from "@/app/api/projects/[projectId]/folder-refs/route";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const post = (body: unknown) =>
  POST(
    new Request("http://local/f", {
      method: "POST",
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ projectId: "proj-1" }) },
  );

describe("POST /api/projects/[projectId]/folder-refs", () => {
  beforeEach(() => {
    upsert.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
  });

  it("maps a non-member computer to 403 folder_ref_device_not_member", async () => {
    upsert.mockResolvedValue({
      ok: false,
      code: "folder_ref_device_not_member",
    });
    const response = await post({
      machineOrDeviceRef: DEVICE,
      deviceId: DEVICE,
      folderPath: "~/demo",
    });
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({
      ok: false,
      code: "folder_ref_device_not_member",
      errorMessage: "Pick a computer that is an active member of this project.",
    });
    expect(upsert).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      machineOrDeviceRef: DEVICE,
      folderPath: "~/demo",
      deviceId: DEVICE,
      shared: true,
    });
  });

  it("passes deviceId null for the legacy label form and returns the ref", async () => {
    const folderRef = { id: "r1", machineOrDeviceRef: "MacBook Pro" };
    upsert.mockResolvedValue({ ok: true, folderRef });
    const response = await post({
      machineOrDeviceRef: "MacBook Pro",
      folderPath: "~/x",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, folderRef });
    expect(upsert.mock.calls[0]?.[0]).toMatchObject({ deviceId: null });
  });
});
