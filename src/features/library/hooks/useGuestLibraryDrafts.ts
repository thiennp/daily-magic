"use client";

import { useCallback, useMemo } from "react";

import { readGuestLibraryDrafts } from "@/lib/library/guest/guestLibraryDraftStorage";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

export function useGuestLibraryDrafts(refreshKey = 0): {
  readonly drafts: readonly GuestLibraryDraft[];
  readonly reload: () => void;
} {
  const drafts = useMemo(() => readGuestLibraryDrafts(), [refreshKey]);

  const reload = useCallback(() => {
    return undefined;
  }, []);

  return { drafts, reload };
}
