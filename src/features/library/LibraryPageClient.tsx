"use client";

import { useEffect, useState } from "react";

import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import CreatePlaybookPanel from "@/features/capabilities/CreatePlaybookPanel";
import GuestLibraryPanel from "@/features/library/GuestLibraryPanel";
import LibraryPanel from "@/features/library/LibraryPanel";
import { GUEST_LIBRARY_DRAFTS_SYNCED_EVENT } from "@/features/library/guestLibraryDraftsSyncedEvent.constant";
import { submitGuestPlaybook } from "@/features/library/utils/submitGuestPlaybook";

export default function LibraryPageClient() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { isSignedIn, sessionState } = useGuestSessionState();

  useEffect(() => {
    const onSynced = (): void => {
      setRefreshKey((key) => key + 1);
    };

    window.addEventListener(GUEST_LIBRARY_DRAFTS_SYNCED_EVENT, onSynced);
    return () => {
      window.removeEventListener(GUEST_LIBRARY_DRAFTS_SYNCED_EVENT, onSynced);
    };
  }, []);

  const bumpRefresh = (): void => {
    setRefreshKey((key) => key + 1);
  };

  return (
    <div className="space-y-6">
      {isSignedIn ? (
        <CreatePlaybookPanel onCreated={bumpRefresh} />
      ) : (
        <CreatePlaybookPanel
          onCreated={bumpRefresh}
          submitPlaybook={submitGuestPlaybook}
          workflowSubmitLabel="Save to this browser"
          agentSubmitLabel="Save to this browser"
        />
      )}
      {sessionState === "guest" ? (
        <GuestLibraryPanel
          refreshKey={refreshKey}
          onDraftsChanged={bumpRefresh}
        />
      ) : (
        <LibraryPanel refreshKey={refreshKey} onUpdated={bumpRefresh} />
      )}
    </div>
  );
}
