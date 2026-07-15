"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import HarnessCatalogPublishPanel from "@/features/harness/HarnessCatalogPublishPanel";
import HarnessSetSharingPanel from "@/features/harness/HarnessSetSharingPanel";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";

export default function HarnessSharingPanel() {
  const embedded = useHomeSetupEmbedded();

  return (
    <AppPanel embedded={embedded}>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Sharing
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Choose who can borrow each rules bundle from your published catalog. New
        bundles stay private until you change them.
      </p>
      <HarnessCatalogPublishPanel />
      <HarnessSetSharingPanel />
    </AppPanel>
  );
}
