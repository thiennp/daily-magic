"use client";

import { useState } from "react";

import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import CreatePlaybookPanel from "@/features/capabilities/CreatePlaybookPanel";
import LibraryPanel from "@/features/library/LibraryPanel";

export default function LibraryPageClient() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { isSignedIn } = useGuestSessionState();

  return (
    <div className="space-y-6">
      {isSignedIn ? (
        <CreatePlaybookPanel
          onCreated={() => {
            setRefreshKey((key) => key + 1);
          }}
        />
      ) : null}
      <LibraryPanel
        refreshKey={refreshKey}
        onUpdated={() => {
          setRefreshKey((key) => key + 1);
        }}
      />
    </div>
  );
}
