import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock("@/lib/capabilities/ensureAgentComponentForPublishedCapability", () => ({
  default: vi.fn().mockResolvedValue("comp-1"),
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
    name: "n",
    ownerUserId: "user-1",
  })),
}));

import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";

describe("createPublishedCapability", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([{ id: "cap-1" }]);
  });

  it("INSERTs project_id (069 CHECK requires it on new rows)", async () => {
    await createPublishedCapability({
      ownerUserId: "user-1",
      projectId: "proj-1",
      name: "Probe",
    });

    expect(sqlMock).toHaveBeenCalled();
    const call = sqlMock.mock.calls[0];
    const strings = call[0] as TemplateStringsArray;
    const sqlText = Array.from(strings).join("?");
    expect(sqlText).toContain("project_id");
    const values = call.slice(1);
    expect(values).toContain("proj-1");
  });

  it("rejects a missing projectId before INSERT", async () => {
    await expect(
      createPublishedCapability({
        ownerUserId: "user-1",
        projectId: "   ",
        name: "Probe",
      }),
    ).rejects.toThrow("project_id is required.");
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
