"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentPageLayout from "@/features/pages/layouts/AgentPageLayout";
import ConnectionLabScenarioPicker from "@/features/agent-witch/connection-lab/ConnectionLabScenarioPicker";
import { ConnectionLabProvider } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ConnectionLabPageLayout() {
  return (
    <ConnectionLabProvider>
      <div className={APP_PAGE_STACK_CLASS}>
        <AppPanel>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Connection lab
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Mock device and WebSocket states without a database or local Agent
            Witch. Switch scenarios to verify send gating, Mac offline hints,
            and home connect flow.
          </p>
          <div className="mt-4">
            <ConnectionLabScenarioPicker />
          </div>
        </AppPanel>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <HomeConnectedMacsPanel
            installCommand="curl -fsSL http://localhost:3000/install/agent-witch.sh | bash"
            isWebSocketSupported
            host="localhost:3000"
          />
          <AgentPageLayout />
        </div>
      </div>
    </ConnectionLabProvider>
  );
}
