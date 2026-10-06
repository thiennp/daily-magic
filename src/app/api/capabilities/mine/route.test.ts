import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  listPublishedCapabilitiesForOwner: vi.fn(),
}));

vi.mock("@/lib/capabilities/publishCapabilityWithHarness", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/projects/readProjectIdFromUnknown", () => ({
  readProjectIdFromUnknown: vi.fn(() => "proj-1"),
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import publishCapabilityWithHarness from "@/lib/capabilities/publishCapabilityWithHarness";
import { POST } from "@/app/api/capabilities/mine/route";

describe("POST /api/capabilities/mine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "user-1", email: "user@example.com" },
      error: null,
    } as never);
  });

  it("returns capability_create_failed with 500 when create throws", async () => {
    vi.mocked(publishCapabilityWithHarness).mockRejectedValue(
      new Error("published_capabilities_project_id_required"),
    );

    const response = await POST(
      new Request("https://www.agentwitch.com/api/capabilities/mine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Probe",
          type: "workflow",
          projectId: "proj-1",
          workflowFields: [
            { key: "t", label: "T", type: "text", required: true },
          ],
        }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      error: "Could not create assistant offering.",
      code: "capability_create_failed",
    });
  });

  it("returns 400 invalid_visibility for a non-enum visibility", async () => {
    const response = await POST(
      new Request("https://www.agentwitch.com/api/capabilities/mine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Probe",
          type: "agent",
          visibility: "secret",
          projectId: "proj-1",
        }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({
      error: "visibility must be private, group, or public.",
      code: "invalid_visibility",
    });
    expect(publishCapabilityWithHarness).not.toHaveBeenCalled();
  });

  it("passes a valid private visibility through to publish", async () => {
    vi.mocked(publishCapabilityWithHarness).mockResolvedValue({
      ok: true,
      capability: { id: "cap-1", visibility: "private" },
      harnessInstalled: false,
      harnessInstallMessage: null,
      projectId: "proj-1",
    } as never);

    const response = await POST(
      new Request("https://www.agentwitch.com/api/capabilities/mine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Probe",
          type: "agent",
          visibility: "private",
          projectId: "proj-1",
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(publishCapabilityWithHarness).toHaveBeenCalledWith(
      "user-1",
      expect.objectContaining({ visibility: "private", name: "Probe" }),
      expect.anything(),
      "proj-1",
    );
  });
});
