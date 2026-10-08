import { beforeEach, describe, expect, it, vi } from "vitest";

import { projectTaskRecordFixture } from "@/lib/projects/tasks/projectTask.fixtures";

const h = vi.hoisted(() => ({
  calls: [] as string[],
  settings: vi.fn(),
  load: vi.fn(),
  reserve: vi.fn(),
  del: vi.fn(),
  upsert: vi.fn(),
  push: vi.fn(),
  record: vi.fn(),
}));

vi.mock("@/lib/projects/taskSync/taskSyncSettingsQueries", () => ({
  loadTaskSyncSettings: h.settings,
  recordTaskSyncResult: h.record,
}));
vi.mock("@/lib/projects/taskSync/taskExternalLinkQueries", () => ({
  loadLinkByTask: h.load,
  upsertTaskLink: h.upsert,
}));
vi.mock("@/lib/projects/taskSync/taskExternalLinkReservation", () => ({
  reserveTaskLink: h.reserve,
  deleteReservedLink: h.del,
}));
vi.mock("@/lib/projects/taskSync/linearTaskSyncProvider", () => ({
  linearTaskSyncProvider: { pushTask: h.push },
}));

import { pushTaskToLinear } from "@/lib/projects/taskSync/pushTaskToLinear";

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("pushTaskToLinear reserve-then-create", () => {
  beforeEach(() => {
    h.calls.length = 0;
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    h.settings.mockResolvedValue({ enabled: true, externalTeamId: "team" });
    h.load.mockResolvedValue(null);
    h.record.mockResolvedValue(undefined);
    h.reserve.mockImplementation(async () => {
      h.calls.push("reserve");
      return true;
    });
    h.del.mockImplementation(async () => {
      h.calls.push("delete");
    });
    h.upsert.mockImplementation(async () => {
      h.calls.push("upsert");
    });
    h.push.mockImplementation(async () => {
      h.calls.push("create");
      return { externalId: "x", identifier: "L-1", url: "u" };
    });
  });

  it("reserves the link with the generated id before issueCreate", async () => {
    const outcome = await pushTaskToLinear(projectTaskRecordFixture({}));
    expect(outcome).toBe("pushed");
    expect(h.calls).toEqual(["reserve", "create", "upsert"]);
    const reservedId = h.reserve.mock.calls[0][0].externalId;
    expect(reservedId).toMatch(UUID_V4);
    expect(h.push.mock.calls[0][0].createId).toBe(reservedId);
    expect(h.push.mock.calls[0][0].existing).toBeNull();
  });

  it("deletes the reservation when issueCreate fails", async () => {
    h.push.mockRejectedValueOnce(new Error("boom"));
    const outcome = await pushTaskToLinear(projectTaskRecordFixture({}));
    expect(outcome).toBe("failed");
    expect(h.del).toHaveBeenCalledTimes(1);
    expect(h.del.mock.calls[0][2]).toBe(h.reserve.mock.calls[0][0].externalId);
    expect(h.upsert).not.toHaveBeenCalled();
  });

  it("does not delete a link it did not reserve when an update fails", async () => {
    h.load.mockResolvedValue({
      taskId: "t",
      externalId: "e",
      identifier: "L-1",
      url: "u",
      lastSyncedHash: "old",
      clippedDescriptionHash: null,
    });
    h.push.mockRejectedValueOnce(new Error("boom"));
    expect(await pushTaskToLinear(projectTaskRecordFixture({}))).toBe("failed");
    expect(h.reserve).not.toHaveBeenCalled();
    expect(h.del).not.toHaveBeenCalled();
  });
});
