import type { Metadata } from "next";

import { DownloadPageBody } from "@/features/download/public-api/presentation";
import { AppShell } from "@/features/shell/public-api/presentation";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { auth } from "@/lib/auth/auth";

const title = `Download | ${AGENT_WITCH_PRODUCT_NAME}`;
const description = "Download and set up the AgentWitch app for Mac or Linux.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${AGENT_WITCH_DEFAULT_ORIGIN}/download`,
  },
};

export default async function DownloadPage() {
  const session = await auth();
  return (
    <AppShell>
      <DownloadPageBody signedInEmail={session?.user?.email ?? null} />
    </AppShell>
  );
}
