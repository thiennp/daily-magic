import { Suspense } from "react";

import WsTestPanel from "@/features/agent/WsTestPanel";

export default function AgentPageLayout() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading task composer…
        </p>
      }
    >
      <WsTestPanel />
    </Suspense>
  );
}
