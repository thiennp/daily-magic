import type { Metadata } from "next";

import DownloadPageBody from "@/features/download/DownloadPageBody";
import AppShell from "@/features/shell/AppShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const title = `Download | ${AGENT_WITCH_PRODUCT_NAME}`;
const description =
  "Download the AgentWitch menu bar app for Mac on Apple Silicon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${AGENT_WITCH_DEFAULT_ORIGIN}/download`,
  },
};

export default function DownloadPage() {
  return (
    <AppShell>
      <DownloadPageBody />
    </AppShell>
  );
}
