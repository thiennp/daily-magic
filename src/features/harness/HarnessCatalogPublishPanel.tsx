"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import {
  fetchHarnessCatalogStatus,
  publishHarnessCatalog,
  type HarnessCatalogStatus,
} from "@/features/harness/fetchHarnessCatalogStatus";

export default function HarnessCatalogPublishPanel() {
  const [status, setStatus] = useState<HarnessCatalogStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    void fetchHarnessCatalogStatus().then(setStatus);
  }, []);

  const publishCatalog = async (): Promise<void> => {
    setIsPublishing(true);
    setMessage(null);

    const result = await publishHarnessCatalog();
    setIsPublishing(false);

    if (!result.ok) {
      setMessage(result.errorMessage ?? "Could not publish harness catalog.");
      return;
    }

    setMessage("Publish requested. Your local agent will refresh the catalog.");
    setStatus(await fetchHarnessCatalogStatus());
  };

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Catalog snapshot
      </h3>
      {status?.catalog ? (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          Last published from {status.catalog.hostname} at{" "}
          {new Date(status.catalog.reportedAt).toLocaleString()}.
        </p>
      ) : (
        <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          No catalog snapshot yet. Publish while your agent is online.
        </p>
      )}
      <div className="mt-3">
        <Button
          disabled={!status?.isAgentOnline || isPublishing}
          onClick={() => {
            void publishCatalog();
          }}
        >
          {isPublishing ? "Publishing…" : "Publish harness to catalog"}
        </Button>
      </div>
      {!status?.isAgentOnline ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Pair and connect your local agent to publish.
        </p>
      ) : null}
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
    </div>
  );
}
