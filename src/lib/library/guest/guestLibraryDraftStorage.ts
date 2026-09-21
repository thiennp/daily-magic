import isGuestLibraryDraft from "@/lib/library/guest/isGuestLibraryDraft";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

export const GUEST_LIBRARY_DRAFTS_STORAGE_KEY =
  "agentwitch.library.guest-drafts.v1";

const readRawDrafts = (): readonly GuestLibraryDraft[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(GUEST_LIBRARY_DRAFTS_STORAGE_KEY);
  if (raw === null || raw.length === 0) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry) => isGuestLibraryDraft(entry));
  } catch {
    return [];
  }
};

export const readGuestLibraryDrafts = (): readonly GuestLibraryDraft[] =>
  [...readRawDrafts()].sort(
    (left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
  );

export const writeGuestLibraryDrafts = (
  drafts: readonly GuestLibraryDraft[],
): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    GUEST_LIBRARY_DRAFTS_STORAGE_KEY,
    JSON.stringify(drafts),
  );
};

export const upsertGuestLibraryDraft = (draft: GuestLibraryDraft): void => {
  const current = readRawDrafts();
  const without = current.filter((entry) => entry.localId !== draft.localId);
  writeGuestLibraryDrafts([draft, ...without]);
};

export const removeGuestLibraryDraft = (localId: string): void => {
  writeGuestLibraryDrafts(
    readRawDrafts().filter((entry) => entry.localId !== localId),
  );
};

export const clearGuestLibraryDrafts = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GUEST_LIBRARY_DRAFTS_STORAGE_KEY);
};
