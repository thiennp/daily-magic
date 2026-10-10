"use client";

import ConnectionLabPageLayout from "@/features/agent-witch/connection-lab/ConnectionLabPageLayout";
import { ConnectionLabProvider } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { AppShell } from "@/features/shell/public-api/presentation";

export default function ConnectionLabAppChrome() {
  return (
    <ConnectionLabProvider>
      <AppShell>
        <ConnectionLabPageLayout />
      </AppShell>
    </ConnectionLabProvider>
  );
}
