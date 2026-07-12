"use client";

import { useState } from "react";

import CreateWorkflowPanel from "@/features/workflows/CreateWorkflowPanel";
import LibraryPanel from "@/features/library/LibraryPanel";

export default function LibraryPageClient() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <CreateWorkflowPanel
        onCreated={() => {
          setRefreshKey((key) => key + 1);
        }}
      />
      <LibraryPanel
        refreshKey={refreshKey}
        onUpdated={() => {
          setRefreshKey((key) => key + 1);
        }}
      />
    </div>
  );
}
