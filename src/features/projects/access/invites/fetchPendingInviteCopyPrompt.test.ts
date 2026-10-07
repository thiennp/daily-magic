import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchPendingInviteCopyPrompt } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";

const respond = (status: number, body: unknown) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

describe("fetchPendingInviteCopyPrompt (107)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls the owner prompt endpoint no-store and builds the short prompt", async () => {
    const fetchMock = respond(200, {
      url: "https://www.agentwitch.com/invite/p/tok-server-123456",
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchPendingInviteCopyPrompt({
      projectId: "proj-1",
      inviteId: "inv-1",
      projectName: "Demo",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/projects/proj-1/invites/inv-1/prompt",
      { cache: "no-store" },
    );
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.prompt).toContain('Join my AgentWitch project "Demo"');
    expect(result.prompt).toContain("tok-server-123456");
  });

  it("passes the server message through on 410 / 409", async () => {
    vi.stubGlobal(
      "fetch",
      respond(410, {
        ok: false,
        code: "invite_not_usable",
        errorMessage:
          "This invite was used, cancelled, or expired. Make a new invite.",
      }),
    );
    const result = await fetchPendingInviteCopyPrompt({
      projectId: "proj-1",
      inviteId: "inv-1",
      projectName: null,
    });
    expect(result).toEqual({
      ok: false,
      errorMessage:
        "This invite was used, cancelled, or expired. Make a new invite.",
    });
  });

  it("network failure → not ok, no throw", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    const result = await fetchPendingInviteCopyPrompt({
      projectId: "proj-1",
      inviteId: "inv-1",
      projectName: null,
    });
    expect(result).toEqual({ ok: false, errorMessage: null });
  });
});
