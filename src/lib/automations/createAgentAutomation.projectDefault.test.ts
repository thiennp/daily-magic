import { beforeEach, describe, expect, it, vi } from "vitest";

import { createAgentAutomation } from "@/lib/automations/createAgentAutomation";
import type { CreateAgentAutomationInput } from "@/lib/automations/parseAgentAutomationBody";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: vi.fn(),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  listUserProjectsForOwner: vi.fn(),
}));
vi.mock("@/lib/automations/prepareAutomationFieldValues", () => ({
  prepareAutomationFieldValues: vi.fn(),
}));
vi.mock("@/lib/automations/insertAgentAutomationRecord", () => ({
  insertAgentAutomationRecord: vi.fn(),
}));
vi.mock("@/lib/automations/buildAutomationDispatchPrompt", () => ({
  buildAutomationDispatchPrompt: vi.fn(() => "prompt"),
}));
vi.mock("@/lib/automations/resolveAutomationNextRunAt", () => ({
  resolveAutomationNextRunAt: vi.fn(() => null),
}));

import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { prepareAutomationFieldValues } from "@/lib/automations/prepareAutomationFieldValues";
import { insertAgentAutomationRecord } from "@/lib/automations/insertAgentAutomationRecord";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";

const project = (id: string, name: string): UserProjectRecord => ({
  id,
  ownerUserId: "user-1",
  deviceId: null,
  name,
  folderPath: `~/projects/${id}`,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
});

const input = (projectId?: string | null): CreateAgentAutomationInput => ({
  name: "Nightly",
  capabilityId: "cap-1",
  triggerType: "webhook",
  projectId,
});

const preparedProjectId = (): string | null =>
  vi.mocked(prepareAutomationFieldValues).mock.calls[0]?.[0].projectId ??
  null;

describe("createAgentAutomation project default", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getPublishedCapabilityById).mockResolvedValue({
      id: "cap-1",
      ownerUserId: "user-1",
    } as never);
    vi.mocked(prepareAutomationFieldValues).mockImplementation(
      async ({ projectId }) =>
        ({ ok: true, fieldValues: {}, projectId }) as never,
    );
    vi.mocked(insertAgentAutomationRecord).mockResolvedValue({} as never);
  });

  it("keeps an explicit projectId without listing projects", async () => {
    await createAgentAutomation("user-1", input(" launch "));

    expect(preparedProjectId()).toBe("launch");
    expect(listUserProjectsForOwner).not.toHaveBeenCalled();
  });

  it("falls back Default → Personal → first via the shared resolver", async () => {
    vi.mocked(listUserProjectsForOwner).mockResolvedValue([
      project("launch", "Launch"),
      project("personal", "Personal"),
      project("default", "Default"),
    ]);
    await createAgentAutomation("user-1", input(null));
    expect(preparedProjectId()).toBe("default");

    vi.clearAllMocks();
    vi.mocked(getPublishedCapabilityById).mockResolvedValue({
      id: "cap-1",
      ownerUserId: "user-1",
    } as never);
    vi.mocked(listUserProjectsForOwner).mockResolvedValue([
      project("launch", "Launch"),
      project("personal", "Personal"),
    ]);
    await createAgentAutomation("user-1", input(""));
    expect(preparedProjectId()).toBe("personal");
  });

  it("passes null when the owner has no projects", async () => {
    vi.mocked(listUserProjectsForOwner).mockResolvedValue([]);
    await createAgentAutomation("user-1", input());

    expect(preparedProjectId()).toBeNull();
  });
});
