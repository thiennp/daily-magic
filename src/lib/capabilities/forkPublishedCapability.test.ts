import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: vi.fn(),
}));

vi.mock("@/lib/capabilities/canViewPublishedCapability", () => ({
  canViewPublishedCapability: vi.fn(),
}));

vi.mock("@/lib/capabilities/capabilityForkAudit", () => ({
  recordCapabilityFork: vi.fn().mockResolvedValue(undefined),
}));

vi.mock(
  "@/lib/capabilities/ensurePublishedCapabilityWorkflowOutputFieldsSchema",
  () => ({
    ensurePublishedCapabilityWorkflowOutputFieldsSchema: vi
      .fn()
      .mockResolvedValue(undefined),
  }),
);

vi.mock("@/lib/capabilities/mapPublishedCapabilityRow", () => ({
  default: vi.fn((row: { id: string }) => ({
    id: row.id,
    name: "n (copy)",
    ownerUserId: "user-2",
  })),
}));

import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import { forkPublishedCapability } from "@/lib/capabilities/forkPublishedCapability";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";

describe("forkPublishedCapability", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([{ id: "cap-fork" }]);
    vi.mocked(getPublishedCapabilityById).mockResolvedValue({
      id: "cap-src",
      ownerUserId: "owner-1",
      status: CapabilityStatus.PUBLISHED,
      visibility: CapabilityVisibility.PUBLIC,
      groupId: null,
      type: "workflow",
      name: "Source",
      description: "",
      exampleRequest: "",
      workflowFields: [],
      workflowOutputFields: [],
      operatorSteps: [],
      harnessSetSlug: null,
      currentVersionId: null,
      dispatchPolicyOverride: null,
      forkedFromCapabilityId: null,
      createdAt: "",
      updatedAt: "",
    } as never);
    vi.mocked(canViewPublishedCapability).mockResolvedValue(true);
  });

  it("INSERTs project_id on fork", async () => {
    const result = await forkPublishedCapability(
      "cap-src",
      "user-2",
      "proj-9",
    );
    expect(result.ok).toBe(true);
    const call = sqlMock.mock.calls[0];
    const strings = call[0] as TemplateStringsArray;
    const sqlText = Array.from(strings).join("?");
    expect(sqlText).toContain("project_id");
    expect(call.slice(1)).toContain("proj-9");
  });

  it("rejects a missing projectId before INSERT", async () => {
    const result = await forkPublishedCapability("cap-src", "user-2", "  ");
    expect(result).toEqual({ ok: false, reason: "project_required" });
    expect(sqlMock).not.toHaveBeenCalled();
    expect(getPublishedCapabilityById).not.toHaveBeenCalled();
  });
});
