"use client";

import ConnectedClientsList from "@/features/home/ConnectedClientsList";

export default function HomePresencePanel() {
  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-theme-xs ring-1 ring-gray-200/50 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Who is online
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        Teammates and connected Macs right now.
      </p>
      <div className="mt-4">
        <ConnectedClientsList compact />
      </div>
    </section>
  );
}
