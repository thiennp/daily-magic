"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import { COMPANY_MEMBERS_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import HarnessCatalogPublishPanel from "@/features/harness/HarnessCatalogPublishPanel";
import HarnessSetSharingPanel from "@/features/harness/HarnessSetSharingPanel";
import {
  HarnessSharingVisibility,
  type HarnessSharingVisibilityValue,
} from "@/lib/harness/HarnessSharingVisibility.constant";

export default function HarnessSharingPanel() {
  const [visibility, setVisibility] = useState<HarnessSharingVisibilityValue>(
    HarnessSharingVisibility.GROUP,
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/agent-witch/harness-sharing");
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "visibility" in data &&
        typeof (data as { visibility: string }).visibility === "string"
      ) {
        const nextVisibility = (data as { visibility: string }).visibility;
        if (
          nextVisibility === HarnessSharingVisibility.PRIVATE ||
          nextVisibility === HarnessSharingVisibility.GROUP ||
          nextVisibility === HarnessSharingVisibility.PUBLIC
        ) {
          setVisibility(nextVisibility);
        }
      }
    })();
  }, []);

  const saveVisibility = async (): Promise<void> => {
    const response = await fetch("/api/agent-witch/harness-sharing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility }),
    });

    setMessage(
      response.ok
        ? "Harness sharing preference saved."
        : "Could not save harness sharing preference.",
    );
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Harness sharing
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Control who can borrow your local harness catalog when your agent is
        online or from the last published snapshot.
      </p>
      <select
        value={visibility}
        onChange={(event) => {
          setVisibility(event.target.value as HarnessSharingVisibilityValue);
        }}
        className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
      >
        <option value={HarnessSharingVisibility.PRIVATE}>Private</option>
        <option value={HarnessSharingVisibility.GROUP}>
          {COMPANY_MEMBERS_LABEL} only
        </option>
        <option value={HarnessSharingVisibility.PUBLIC}>
          Public (signed-in users)
        </option>
      </select>
      <div className="mt-4">
        <Button onClick={() => void saveVisibility()}>Save sharing</Button>
      </div>
      {message ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {message}
        </p>
      ) : null}
      <HarnessCatalogPublishPanel />
      <HarnessSetSharingPanel />
    </section>
  );
}
