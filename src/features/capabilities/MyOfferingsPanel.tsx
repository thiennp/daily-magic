"use client";

import { useEffect, useState } from "react";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export default function MyOfferingsPanel() {
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOfferings = async (): Promise<void> => {
      try {
        const response = await fetch("/api/capabilities/mine");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "capabilities" in data &&
          Array.isArray((data as { capabilities: unknown }).capabilities)
        ) {
          setCapabilities(
            (data as { capabilities: PublishedCapabilityRecord[] })
              .capabilities,
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadOfferings();
  }, []);

  const publishedCount = capabilities.filter(
    (capability) => capability.status === CapabilityStatus.PUBLISHED,
  ).length;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        What teammates can request
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Published assistants appear in your team directory when colleagues send
        you a task.
      </p>
      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading your offerings…
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {capabilities.map((capability) => (
            <li
              key={capability.id}
              className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
            >
              <p className="font-medium text-gray-800 dark:text-white/90">
                {capability.name}
              </p>
              {capability.description.length > 0 ? (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {capability.description}
                </p>
              ) : null}
              <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">
                {capability.status}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && publishedCount === 0 ? (
        <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
          Publish at least one assistant so teammates can choose it.
        </p>
      ) : null}
    </section>
  );
}
