import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  mapWorkflowCreateDraftToPlaybook,
  readWorkflowCreateDraftRecord,
} from "@/features/workflows/readWorkflowCreateDraftPlaybook";
import { persistWorkflowCreateDraft } from "@/features/workflows/persistWorkflowCreateDraft";
import { WORKFLOW_CREATE_DRAFT_LIBRARY_ID } from "@/features/workflows/workflowCreateDraft.constants";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

describe("workflow create draft session", () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("sessionStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips draft through sessionStorage", () => {
    persistWorkflowCreateDraft({
      version: 1,
      name: "Trial",
      type: CapabilityType.WORKFLOW,
      exampleRequest: "Extra",
      workflowFields: [
        { key: "topic", label: "Topic", type: "text", required: true },
      ],
      operatorSteps: [],
      trialFieldValues: { topic: "Ship trial run" },
    });

    const record = readWorkflowCreateDraftRecord();
    expect(record?.name).toBe("Trial");

    const playbook = mapWorkflowCreateDraftToPlaybook(record!);
    expect(playbook.id).toBe(WORKFLOW_CREATE_DRAFT_LIBRARY_ID);
    expect(playbook.initialWorkflowFieldValues?.topic).toBe("Ship trial run");
  });
});
