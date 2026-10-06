import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const getSticky = vi.hoisted(() => vi.fn());
const putSticky = vi.hoisted(() => vi.fn());
const deleteSticky = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/composer/getProjectComposerRecipientSticky", () => ({
  getProjectComposerRecipientSticky: getSticky,
}));
vi.mock("@/lib/projects/acl/composer/putProjectComposerRecipientSticky", () => ({
  putProjectComposerRecipientSticky: putSticky,
}));
vi.mock(
  "@/lib/projects/acl/composer/deleteProjectComposerRecipientSticky",
  () => ({
    deleteProjectComposerRecipientSticky: deleteSticky,
  }),
);

import {
  DELETE,
  GET,
  PUT,
} from "@/app/api/projects/[projectId]/composer/recipient-sticky/route";

const ctx = { params: Promise.resolve({ projectId: "proj-1" }) };
const putReq = (body: unknown) =>
  new Request("http://local/sticky", {
    method: "PUT",
    body: JSON.stringify(body),
  });

describe("composer recipient-sticky route", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    getSticky.mockReset();
    putSticky.mockReset();
    deleteSticky.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1", email: "o@x.com" },
      error: null,
    });
  });

  it("GET happy + fail paths", async () => {
    getSticky.mockResolvedValue({
      ok: true,
      sticky: { mode: "all", membershipId: null, updatedAt: "t" },
      cleared: false,
      clearedReason: null,
      singleAssistant: null,
    });
    const ok = await GET(new Request("http://local/sticky"), ctx);
    expect(ok.status).toBe(200);
    expect(await ok.json()).toMatchObject({ ok: true, projectId: "proj-1" });

    getSticky.mockResolvedValue({ ok: false, code: "forbidden" });
    expect((await GET(new Request("http://local/sticky"), ctx)).status).toBe(
      403,
    );
  });

  it("PUT happy + invalid + inactive + single_assistant", async () => {
    putSticky.mockResolvedValue({
      ok: true,
      sticky: { mode: "all", membershipId: null, updatedAt: "t" },
    });
    expect((await PUT(putReq({ mode: "all" }), ctx)).status).toBe(200);

    putSticky.mockResolvedValue({ ok: false, code: "invalid_body" });
    expect((await PUT(putReq({}), ctx)).status).toBe(400);

    putSticky.mockResolvedValue({ ok: false, code: "membership_inactive" });
    expect(
      (
        await PUT(putReq({ mode: "membership", membershipId: "x" }), ctx)
      ).status,
    ).toBe(409);

    putSticky.mockResolvedValue({ ok: false, code: "single_assistant" });
    expect((await PUT(putReq({ mode: "all" }), ctx)).status).toBe(409);
  });

  it("DELETE clears", async () => {
    deleteSticky.mockResolvedValue({ ok: true, cleared: true });
    const res = await DELETE(new Request("http://local/sticky"), ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, cleared: true });
  });
});
