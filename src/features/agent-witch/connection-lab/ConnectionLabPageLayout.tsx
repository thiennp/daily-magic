"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentPageLayout from "@/features/pages/layouts/AgentPageLayout";
import ConnectionLabScenarioPicker from "@/features/agent-witch/connection-lab/ConnectionLabScenarioPicker";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ConnectionLabPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPanel>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Connection lab
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Mock Mac and connection states without a real Mac or database. Switch
          scenarios to verify send gating, offline hints, and home connect flow.
        </p>
        <div className="mt-4">
          <ConnectionLabScenarioPicker />
        </div>
      </AppPanel>

      <AgentPageLayout />
    </div>
  );
}
