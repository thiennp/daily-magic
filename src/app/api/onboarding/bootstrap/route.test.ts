import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth: vi.fn(),
}));

vi.mock("@/lib/capabilities/ensureSampleWorkflowCapability", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/onboarding/loadOnboardingBootstrapFlags", () => ({
  loadOnboardingBootstrapFlags: vi.fn(),
}));

import { requireAuth } from "@/lib/auth/requireAuth";
import ensureSampleWorkflowCapability from "@/lib/capabilities/ensureSampleWorkflowCapability";
import { loadOnboardingBootstrapFlags } from "@/lib/onboarding/loadOnboardingBootstrapFlags";
import { GET } from "@/app/api/onboarding/bootstrap/route";

describe("GET /api/onboarding/bootstrap", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireAuth).mockResolvedValue({
      actor: { id: "user-1", email: "user@example.com" },
      error: null,
    } as never);
    vi.mocked(loadOnboardingBootstrapFlags).mockResolvedValue({
      firstTaskSent: false,
      automationCreated: false,
      macPaired: false,
      workflowCreated: false,
      setupAcknowledged: false,
    });
  });

  it("returns onboarding flags when sample seed succeeds", async () => {
    vi.mocked(ensureSampleWorkflowCapability).mockResolvedValue(null);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      ok: true,
      firstTaskSent: false,
      automationCreated: false,
      macPaired: false,
      workflowCreated: false,
      setupAcknowledged: false,
    });
    expect(ensureSampleWorkflowCapability).toHaveBeenCalledWith("user-1");
  });

  it("still returns onboarding flags when sample seed throws (F-UI-LI-1)", async () => {
    vi.mocked(ensureSampleWorkflowCapability).mockRejectedValue(
      new Error('column "operator_steps" of relation "published_capabilities" does not exist'),
    );

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.macPaired).toBe(false);
    expect(loadOnboardingBootstrapFlags).toHaveBeenCalledWith("user-1");
  });
});
