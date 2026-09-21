"use client";

import { readGuestLibraryDrafts } from "@/lib/library/guest/guestLibraryDraftStorage";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

export function useGuestLibraryDrafts(refreshKey = 0): {
  readonly drafts: readonly GuestLibraryDraft[];
  readonly reload: () => void;
} {
  void refreshKey;

  return {
    drafts: readGuestLibraryDrafts(),
    reload: () => undefined,
  };
}
