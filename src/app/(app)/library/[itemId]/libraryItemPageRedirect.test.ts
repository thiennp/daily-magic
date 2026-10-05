import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/auth", () => ({
  getAuthActor: vi.fn(),
}));

vi.mock("@/lib/library/lookupLibraryItemProjectId", () => ({
  lookupLibraryItemProjectId: vi.fn(),
}));

vi.mock("@/lib/shell/resolveLegacyItemRedirectPath", () => ({
  resolveLegacyItemRedirectPath: vi.fn(),
}));

import LibraryItemPage from "@/app/(app)/library/[itemId]/page";
import { getAuthActor } from "@/lib/auth/auth";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

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

describe("LibraryItemPage redirect status", () => {
  beforeEach(() => {
    vi.mocked(getAuthActor).mockReset();
    vi.mocked(resolveLegacyItemRedirectPath).mockReset();
  });

  it("uses temporary 307 for signed-out visitors (login callback must not cache)", async () => {
    vi.mocked(getAuthActor).mockResolvedValue(null);
    vi.mocked(resolveLegacyItemRedirectPath).mockResolvedValue(
      `/login?callbackUrl=${encodeURIComponent("/library/cap-1")}`,
    );

    try {
      await LibraryItemPage({
        params: Promise.resolve({ itemId: "cap-1" }),
        searchParams: Promise.resolve({}),
      });
      expect.unreachable("expected redirect");
    } catch (error) {
      expect(readRedirectStatus(error)).toBe(307);
    }
  });
});
