"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const buildLocalLogFrameSrc = (wakePort: number): string =>
  `http://127.0.0.1:${wakePort}/local`;

const LocalLogFrame = () => {
  const searchParams = useSearchParams();
  const wakePortRaw = searchParams.get("port")?.trim() ?? "";
  const wakePort = Number.parseInt(wakePortRaw, 10);
  const deviceName = searchParams.get("name")?.trim() ?? "This Mac";

  if (!Number.isFinite(wakePort) || wakePort <= 0 || wakePort > 65535) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-4 py-10">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Local logs unavailable
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Open this page from your Mac device menu after install completes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">
          Local logs — {deviceName}
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Loaded from 127.0.0.1:{wakePort}. This view only works on the Mac that
          runs Agent Witch.
        </p>
      </div>
      <iframe
        title={`Agent Witch local logs for ${deviceName}`}
        src={buildLocalLogFrameSrc(wakePort)}
        className="min-h-[calc(100vh-8rem)] w-full flex-1 border-0 bg-[#0b1020]"
        sandbox="allow-same-origin"
      />
    </div>
  );
};

export default function LocalLogPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-10 text-sm text-gray-500 dark:text-gray-400">
          Loading local logs…
        </div>
      }
    >
      <LocalLogFrame />
    </Suspense>
  );
}
