import { Suspense } from "react";

import WsTestPanel from "@/features/wsTest/WsTestPanel";

export default function AgentPageLayout() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Suspense
        fallback={
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Loading task composer…
          </p>
        }
      >
        <WsTestPanel />
      </Suspense>
    </div>
  );
}
