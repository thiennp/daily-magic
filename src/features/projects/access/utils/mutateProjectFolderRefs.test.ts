import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAddFolderRefError } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";
import {
  addProjectFolderRef,
  buildAddFolderRefBody,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";

describe("folder ref POST contract (computer picker)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends deviceId and mirrors it in machineOrDeviceRef", async () => {
    expect(buildAddFolderRefBody({ deviceId: "dev-1", folderPath: "~/x" })).toEqual({
      deviceId: "dev-1",
      machineOrDeviceRef: "dev-1",
      folderPath: "~/x",
    });
    const fetchMock = vi.fn(async () => Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    await addProjectFolderRef({ projectId: "p1", deviceId: "dev-1", folderPath: "~/x" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/projects/p1/folder-refs");
    expect(JSON.parse(String(init.body))).toEqual({
      deviceId: "dev-1",
      machineOrDeviceRef: "dev-1",
      folderPath: "~/x",
    });
  });

  it("maps 403 folder_ref_device_not_member to Product copy", () => {
    expect(
      resolveAddFolderRefError({ code: "folder_ref_device_not_member" }),
    ).toBe("Pick a computer that's part of this project.");
    expect(resolveAddFolderRefError({ errorMessage: "Nope." })).toBe("Nope.");
    expect(resolveAddFolderRefError({})).toBe(
      "Could not add the folder. Try again.",
    );
  });
});
