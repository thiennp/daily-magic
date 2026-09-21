"use client";

import { GUEST_LIBRARY_DRAFTS_SYNCED_EVENT } from "@/features/library/guestLibraryDraftsSyncedEvent.constant";
import { useSyncGuestLibraryOnSignIn } from "@/features/library/hooks/useSyncGuestLibraryOnSignIn";

export default function GuestLibraryDraftSyncListener() {
  useSyncGuestLibraryOnSignIn(() => {
    window.dispatchEvent(new CustomEvent(GUEST_LIBRARY_DRAFTS_SYNCED_EVENT));
  });

  return null;
}
