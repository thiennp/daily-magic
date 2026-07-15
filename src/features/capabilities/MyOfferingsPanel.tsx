"use client";

import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import shouldShowMyOfferingsPanel from "@/features/capabilities/shouldShowMyOfferingsPanel";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import isUserCreatedCapability from "@/lib/capabilities/isUserCreatedCapability";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export default function MyOfferingsPanel() {
  const { groups, isLoading: isLoadingGroups } = useDispatchTargets();
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoadingCapabilities, setIsLoadingCapabilities] = useState(true);

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
        setIsLoadingCapabilities(false);
      }
    };

    void loadOfferings();
  }, []);

  const userCreatedCapabilities = capabilities.filter(isUserCreatedCapability);

  const publishedCount = userCreatedCapabilities.filter(
    (capability) => capability.status === CapabilityStatus.PUBLISHED,
  ).length;

  const isLoading = isLoadingGroups || isLoadingCapabilities;

  if (
    isLoading ||
    !shouldShowMyOfferingsPanel(groups.length, userCreatedCapabilities.length)
  ) {
    return null;
  }

  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        What teammates can request
      </h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Published assistants appear in your company directory when colleagues
        send you a task.
      </p>
      <ul className="mt-4 space-y-3">
        {userCreatedCapabilities.map((capability) => (
          <li key={capability.id} className={APP_SURFACE_NESTED_CARD_CLASS}>
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
              {capability.forkedFromCapabilityId !== null
                ? " · saved from teammate"
                : ""}
            </p>
          </li>
        ))}
      </ul>
      {publishedCount === 0 ? (
        <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
          Publish at least one assistant so teammates can choose it.
        </p>
      ) : null}
    </AppPanel>
  );
}
