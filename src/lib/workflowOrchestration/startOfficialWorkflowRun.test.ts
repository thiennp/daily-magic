import { beforeEach, describe, expect, it, vi } from "vitest";

const getCapability = vi.hoisted(() => vi.fn());
const createRecord = vi.hoisted(() => vi.fn());
const continueRun = vi.hoisted(() => vi.fn());

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: getCapability,
}));
vi.mock("@/lib/workflowOrchestration/createWorkflowRunRecord", () => ({
  createWorkflowRunRecord: createRecord,
}));
vi.mock("@/lib/workflowOrchestration/continueOfficialWorkflowRun", () => ({
  continueOfficialWorkflowRun: continueRun,
}));

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { startOfficialWorkflowRun } from "@/lib/workflowOrchestration/startOfficialWorkflowRun";

const start = () =>
  startOfficialWorkflowRun({
    runtime: {} as never,
    requesterUserId: "user-1",
    capabilityId: "cap-1",
    fieldValues: {},
    dispatchBodyBase: {},
  });

describe("startOfficialWorkflowRun not-found code", () => {
  beforeEach(() => {
    getCapability.mockReset();
    createRecord.mockReset();
    continueRun.mockReset();
  });

  it("returns code not_found when the capability does not exist", async () => {
    getCapability.mockResolvedValue(null);

    await expect(start()).resolves.toEqual({
      ok: false,
      message: "Workflow capability not found.",
      code: "not_found",
    });
    expect(createRecord).not.toHaveBeenCalled();
  });

  it("returns code not_found when another user owns the capability", async () => {
    getCapability.mockResolvedValue({
      id: "cap-1",
      status: CapabilityStatus.PUBLISHED,
      ownerUserId: "someone-else",
      type: CapabilityType.WORKFLOW,
      harnessSetSlug: null,
    });

    const result = await start();

    expect(result).toMatchObject({ ok: false, code: "not_found" });
    expect(createRecord).not.toHaveBeenCalled();
  });
});
