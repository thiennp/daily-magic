import { beforeEach, describe, expect, it, vi } from "vitest";

const ensureAcl = vi.hoisted(() => vi.fn(async () => undefined));
const sweep = vi.hoisted(() => vi.fn(async () => 3));

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: ensureAcl,
}));

vi.mock("@/lib/projects/acl/messaging/sweepProjectChatMessagePrune", () => ({
  sweepProjectChatMessagePrune: () => sweep(),
}));

import { deleteReadProjectMessages } from "@/lib/projects/acl/messaging/deleteReadProjectMessages";

describe("deleteReadProjectMessages", () => {
  beforeEach(() => {
    ensureAcl.mockClear();
    sweep.mockClear();
    sweep.mockResolvedValue(3);
  });

  it("ensures ACL then runs the keep-300 prune sweep", async () => {
    await expect(deleteReadProjectMessages()).resolves.toBe(3);
    expect(ensureAcl).toHaveBeenCalledTimes(1);
    expect(sweep).toHaveBeenCalledTimes(1);
  });

  it("returns 0 when the sweep throws", async () => {
    ensureAcl.mockRejectedValueOnce(new Error("boom"));
    await expect(deleteReadProjectMessages()).resolves.toBe(0);
  });
});
