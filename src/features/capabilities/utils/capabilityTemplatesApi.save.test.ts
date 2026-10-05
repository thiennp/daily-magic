import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/home/utils/onboardingWorkflowCreatedStore", () => ({
  markOnboardingWorkflowCreated: vi.fn(),
}));

import {
  SAVE_TO_PROJECT_REQUIRED_MESSAGE,
  saveCapabilityTemplateToLibrary,
} from "@/features/capabilities/utils/capabilityTemplatesApi";

describe("saveCapabilityTemplateToLibrary (project required)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts project_id with the template id", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ harnessInstalled: false }), {
        status: 200,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await saveCapabilityTemplateToLibrary("tpl-1", " proj-1 ");

    expect(result.ok).toBe(true);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/capabilities/templates/save");
    expect(JSON.parse(String(init.body))).toEqual({
      templateId: "tpl-1",
      project_id: "proj-1",
    });
  });

  it("does not call the API without a project", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await saveCapabilityTemplateToLibrary("tpl-1", "  ");

    expect(result.ok).toBe(false);
    expect(result.errorMessage).toBe(SAVE_TO_PROJECT_REQUIRED_MESSAGE);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
