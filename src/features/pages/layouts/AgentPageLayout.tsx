import { Suspense } from "react";

import WsTestPanel from "@/features/agent/WsTestPanel";

export default function AgentPageLayout() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          Loading task composer…
        </p>
      }
    >
      <WsTestPanel />
    </Suspense>
  );
}
