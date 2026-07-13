"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import ConnectedClientsList from "@/features/home/ConnectedClientsList";

export default function HomePresencePanel() {
  return (
    <AppPanel padding="compact">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Who is online
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        Paired Macs that are online right now (heartbeat every 30 seconds).
      </p>
      <div className="mt-4">
        <ConnectedClientsList compact />
      </div>
    </AppPanel>
  );
}
