import { describe, expect, it } from "vitest";

import {
  buildApproveAccessPayload,
  isReservedProjectDisplayName,
  isValidProjectDisplayName,
  mapAccessActionHttpError,
  normalizeProjectDisplayName,
  pickRandomAvailableDisplayName,
} from "@/features/projects/access/utils/projectDisplayName.helpers";

describe("projectDisplayName helpers", () => {
  it("normalizes with trim + casefold", () => {
    expect(normalizeProjectDisplayName("  Buni ")).toBe("buni");
  });

  it("rejects reserved and invalid names", () => {
    expect(isReservedProjectDisplayName("Owner")).toBe(true);
    expect(isReservedProjectDisplayName("broadcast")).toBe(true);
    expect(isValidProjectDisplayName("a")).toBe(false);
    expect(isValidProjectDisplayName("good-name")).toBe(true);
    expect(isValidProjectDisplayName("has/slash")).toBe(false);
    expect(isValidProjectDisplayName("system")).toBe(false);
  });

  it("picks from available list", () => {
    const available = ["Ada", "Buni", "Conti"] as const;
    const pick = pickRandomAvailableDisplayName(available);
    expect(pick).not.toBeNull();
    expect(available).toContain(pick);
    expect(pickRandomAvailableDisplayName([])).toBeNull();
  });

  it("builds Approve payload requiring name for agents only", () => {
    expect(
      buildApproveAccessPayload({
        requestId: "req-1",
        requesterIsAgent: true,
        projectDisplayName: "Buni",
      }),
    ).toEqual({
      ok: true,
      body: {
        requestId: "req-1",
        action: "approve",
        projectDisplayName: "Buni",
      },
    });

    expect(
      buildApproveAccessPayload({
        requestId: "req-2",
        requesterIsAgent: true,
        projectDisplayName: "  ",
      }).ok,
    ).toBe(false);

    expect(
      buildApproveAccessPayload({
        requestId: "req-3",
        requesterIsAgent: false,
      }),
    ).toEqual({
      ok: true,
      body: { requestId: "req-3", action: "approve" },
    });
  });

  it("maps 409/400/422 name errors", () => {
    expect(mapAccessActionHttpError(409, "").code).toBe("name_taken");
    expect(mapAccessActionHttpError(400, "").code).toBe("name_invalid");
    expect(mapAccessActionHttpError(422, "").code).toBe("name_reserved");
    expect(mapAccessActionHttpError(500, "boom").code).toBe("other");
  });
});
