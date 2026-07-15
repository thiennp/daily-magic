"use client";

import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";

const MANIFEST_PRE_BOX_CLASS =
  "mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300";

interface HarnessLocalManifestProps {
  readonly localManifest: HarnessManifest | null;
  readonly manifestHostname: string | null;
}

export default function HarnessLocalManifest({
  localManifest,
  manifestHostname,
}: HarnessLocalManifestProps) {
  const embedded = useHomeSetupEmbedded();

  return (
    <div className={embedded ? undefined : "mt-6"}>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Reported local setup
      </h3>
      {localManifest ? (
        <>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Machine: {manifestHostname ?? "unknown"}
          </p>
          <pre
            className={resolveHomeSetupNestedBoxClass(
              embedded,
              MANIFEST_PRE_BOX_CLASS,
              "mt-3 max-h-80 overflow-auto text-xs text-gray-700 dark:text-gray-300",
            )}
          >
            {JSON.stringify(localManifest, null, 2)}
          </pre>
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Nothing synced from your Mac yet. Connect your Mac, then refresh from
          here.
        </p>
      )}
    </div>
  );
}
