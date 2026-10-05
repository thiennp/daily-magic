import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/auth", () => ({
  getAuthActor: vi.fn(),
}));

vi.mock("@/lib/shell/resolveNavConsolidationRedirect", () => ({
  resolveNavConsolidationRedirectPath: vi.fn(),
}));

import { getAuthActor } from "@/lib/auth/auth";
import { runNavConsolidationPageRedirect } from "@/lib/shell/runNavConsolidationPageRedirect";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";

/** Next `redirect()` / `permanentRedirect()` encode status in error.digest. */
const readRedirectStatus = (error: unknown): number | null => {
  if (typeof error !== "object" || error === null || !("digest" in error)) {
    return null;
  }
  const digest = (error as { digest: unknown }).digest;
  if (typeof digest !== "string" || !digest.startsWith("NEXT_REDIRECT;")) {
    return null;
  }
  const status = Number(digest.split(";").at(-2));
  return Number.isFinite(status) ? status : null;
};

describe("runNavConsolidationPageRedirect", () => {
  beforeEach(() => {
    vi.mocked(getAuthActor).mockReset();
    vi.mocked(resolveNavConsolidationRedirectPath).mockReset();
  });

  it("uses a temporary 307 when signed out (do not cache login/session hops)", async () => {
    vi.mocked(getAuthActor).mockResolvedValue(null);
    vi.mocked(resolveNavConsolidationRedirectPath).mockResolvedValue(
      "/projects?intent=library",
    );

    try {
      await runNavConsolidationPageRedirect({
        intent: "library",
        searchParams: Promise.resolve({}),
      });
      expect.unreachable("expected redirect");
    } catch (error) {
      expect(readRedirectStatus(error)).toBe(307);
    }
  });

  it("keeps a permanent 308 when signed in", async () => {
    vi.mocked(getAuthActor).mockResolvedValue({ id: "u1" } as never);
    vi.mocked(resolveNavConsolidationRedirectPath).mockResolvedValue(
      "/projects/p1#library",
    );

    try {
      await runNavConsolidationPageRedirect({
        intent: "library",
        searchParams: Promise.resolve({ project: "p1" }),
      });
      expect.unreachable("expected redirect");
    } catch (error) {
      expect(readRedirectStatus(error)).toBe(308);
    }
  });
});
