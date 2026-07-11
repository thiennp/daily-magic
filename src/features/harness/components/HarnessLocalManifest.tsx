import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";

interface HarnessLocalManifestProps {
  readonly localManifest: HarnessManifest | null;
  readonly manifestHostname: string | null;
}

export default function HarnessLocalManifest({
  localManifest,
  manifestHostname,
}: HarnessLocalManifestProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Reported local harness
      </h3>
      {localManifest ? (
        <>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Machine: {manifestHostname ?? "unknown"}
          </p>
          <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {JSON.stringify(localManifest, null, 2)}
          </pre>
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          No local harness manifest reported yet. Connect your local agent and
          send a harness request.
        </p>
      )}
    </div>
  );
}
