import { beforeEach, describe, expect, it, vi } from "vitest";

import { AWC_PROJECT_DELETE_COPY } from "@/features/projects/public-api/types";
import requestDeleteUserProject from "@/features/projects/utils/requestDeleteUserProject";

describe("requestDeleteUserProject", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("maps 403 to the owner-only message", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, errorMessage: "nope" }), {
        status: 403,
      }),
    );

    await expect(requestDeleteUserProject("p1")).resolves.toEqual({
      ok: false,
      errorMessage: AWC_PROJECT_DELETE_COPY.ownerOnlyError,
    });
  });

  it("returns ok on 200", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true, projectId: "p1" }), {
        status: 200,
      }),
    );

    await expect(requestDeleteUserProject("p1")).resolves.toEqual({ ok: true });
  });
});
