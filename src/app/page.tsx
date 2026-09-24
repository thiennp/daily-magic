import type { Metadata } from "next";

import { getAuthActor } from "@/lib/auth/auth";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
import HomePageLayout from "@/features/pages/layouts/HomePageLayout";
import AppShell from "@/features/shell/AppShell";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

export const dynamic = "force-dynamic";

const homeTitle = `${AGENT_WITCH_PRODUCT_NAME} — AI accounts, Tasks, and Mac Runs`;
const homeDescription =
  "Give an AI an Agent Witch account with no email. Copy the short homepage prompt. The agent opens the guideline and follows it.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords: [
    "Agent Witch",
    "AI agent account",
    "Agent Mail",
    "WebMCP",
    "Mac agent",
    "Task",
    "Run",
  ],
  alternates: {
    canonical: AGENT_WITCH_DEFAULT_ORIGIN,
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: AGENT_WITCH_DEFAULT_ORIGIN,
    siteName: AGENT_WITCH_PRODUCT_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default async function Home() {
  const actor = await getAuthActor();

  if (actor) {
    return (
      <AppShell>
        <HomePageLayout
          user={{
            email: actor.email,
            name: actor.name,
            globalRole: actor.globalRole,
          }}
        />
      </AppShell>
    );
  }

  return <HomeMarketingLanding />;
}
