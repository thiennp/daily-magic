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

vi.mock("@/lib/capabilities/parseCapabilityBody", () => ({
  parseCreateCapabilityBody: vi.fn(),
}));

vi.mock("@/lib/projects/readProjectIdFromUnknown", () => ({
  readProjectIdFromUnknown: vi.fn(() => "proj-1"),
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import publishCapabilityWithHarness from "@/lib/capabilities/publishCapabilityWithHarness";
import { parseCreateCapabilityBody } from "@/lib/capabilities/parseCapabilityBody";
import { POST } from "@/app/api/capabilities/mine/route";

describe("POST /api/capabilities/mine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "user-1", email: "user@example.com" },
      error: null,
    } as never);
    vi.mocked(parseCreateCapabilityBody).mockReturnValue({
      name: "Probe",
      description: "",
      exampleRequest: "",
      type: "workflow",
      workflowFields: [{ key: "t", label: "T", type: "text", required: true }],
      workflowOutputFields: [],
      harnessItems: [],
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
        body: JSON.stringify({ name: "Probe", projectId: "proj-1" }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      error: "Could not create assistant offering.",
      code: "capability_create_failed",
    });
  });
});
