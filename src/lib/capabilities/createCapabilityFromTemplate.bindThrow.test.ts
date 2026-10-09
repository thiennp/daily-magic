import { beforeEach, describe, expect, it, vi } from "vitest";

import createCapabilityFromTemplate from "@/lib/capabilities/createCapabilityFromTemplate";

const mocks = vi.hoisted(() => ({
  requireProjectIdForCreate: vi.fn(),
  findCapabilityTemplateById: vi.fn(),
  createPublishedCapability: vi.fn(),
  publishCapabilityVersion: vi.fn(),
  bindPublishedCapabilityToProject: vi.fn(),
  deletePublishedCapabilityAfterFailedBind: vi.fn(),
  requestCapabilityTemplateHarnessInstall: vi.fn(),
}));

vi.mock("@/lib/projects/requireProjectIdForCreate", () => ({
  requireOwnerProjectIdForCreate: mocks.requireProjectIdForCreate,
}));
vi.mock("@/lib/capabilities/templates/findCapabilityTemplateById", () => ({
  default: mocks.findCapabilityTemplateById,
}));
vi.mock("@/lib/capabilities/createPublishedCapability", () => ({
  createPublishedCapability: mocks.createPublishedCapability,
}));
vi.mock("@/lib/capabilities/publishCapabilityVersion", () => ({
  publishCapabilityVersion: mocks.publishCapabilityVersion,
}));
vi.mock("@/lib/capabilities/bindPublishedCapabilityToProject", () => ({
  default: mocks.bindPublishedCapabilityToProject,
}));
vi.mock("@/lib/capabilities/deletePublishedCapabilityAfterFailedBind", () => ({
  default: mocks.deletePublishedCapabilityAfterFailedBind,
}));
vi.mock("@/lib/capabilities/requestCapabilityTemplateHarnessInstall", () => ({
  default: mocks.requestCapabilityTemplateHarnessInstall,
}));
vi.mock("@/lib/harness/partitionHarnessItemsByAudience", () => ({
  mapHarnessItemsToOperatorSteps: () => [],
}));

describe("createCapabilityFromTemplate bind throw", () => {
  beforeEach(() => {
    Object.values(mocks).forEach((fn) => fn.mockReset());
    mocks.requireProjectIdForCreate.mockResolvedValue({
      ok: true,
      projectId: "proj-1",
    });
    mocks.findCapabilityTemplateById.mockReturnValue({
      id: "tpl-1",
      name: "Demo",
      description: "",
      exampleRequest: "",
      type: "workflow",
      workflowFields: [{ id: "f1", label: "F", required: true }],
      harness: { slug: "demo", name: "Demo", items: [] },
    });
    mocks.createPublishedCapability.mockResolvedValue({
      capability: { id: "cap-1", name: "Demo" },
      componentId: "comp-1",
    });
    mocks.publishCapabilityVersion.mockResolvedValue({
      capability: { id: "cap-1", name: "Demo" },
      componentId: "comp-1",
      capabilityVersionId: "cver-1",
      componentVersionId: "compver-1",
    });
    mocks.deletePublishedCapabilityAfterFailedBind.mockResolvedValue(undefined);
  });

  it("compensates when bind throws", async () => {
    mocks.bindPublishedCapabilityToProject.mockRejectedValue(
      new Error("db down"),
    );
    const result = await createCapabilityFromTemplate({
      ownerUserId: "user-1",
      templateId: "tpl-1",
      projectId: "proj-1",
    });
    expect(result).toMatchObject({
      ok: false,
      code: "project_bind_failed",
      error: "db down",
    });
    expect(mocks.deletePublishedCapabilityAfterFailedBind).toHaveBeenCalled();
  });

  it("keeps bind error if compensation fails", async () => {
    mocks.bindPublishedCapabilityToProject.mockResolvedValue({
      ok: false,
      error: "bind failed",
    });
    mocks.deletePublishedCapabilityAfterFailedBind.mockRejectedValue(
      new Error("undo failed"),
    );
    const result = await createCapabilityFromTemplate({
      ownerUserId: "user-1",
      templateId: "tpl-1",
      projectId: "proj-1",
    });
    expect(result).toMatchObject({
      ok: false,
      code: "project_bind_failed",
      error: "bind failed",
    });
  });
});
