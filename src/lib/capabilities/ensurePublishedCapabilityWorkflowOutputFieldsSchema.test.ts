import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ensurePublishedCapabilityWorkflowOutputFieldsSchema,
  resetPublishedCapabilityWorkflowOutputFieldsSchemaEnsureForTests,
} from "@/lib/capabilities/ensurePublishedCapabilityWorkflowOutputFieldsSchema";

const sqlMock = vi.fn().mockResolvedValue([]);

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
}));

describe("ensurePublishedCapabilityWorkflowOutputFieldsSchema", () => {
  beforeEach(() => {
    sqlMock.mockClear();
    resetPublishedCapabilityWorkflowOutputFieldsSchemaEnsureForTests();
  });

  it("adds workflow_output_fields only once per process", async () => {
    await ensurePublishedCapabilityWorkflowOutputFieldsSchema();
    await ensurePublishedCapabilityWorkflowOutputFieldsSchema();

    expect(sqlMock).toHaveBeenCalledTimes(1);
  });
});
