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
import { readNextRedirectStatus } from "@/lib/shell/readNextRedirectStatus";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

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
      expect(readNextRedirectStatus(error)).toBe(307);
    }
  });
});
