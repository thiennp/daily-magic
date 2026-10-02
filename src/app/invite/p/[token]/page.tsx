import type { Metadata } from "next";

import ProjectInviteInstructionsBody from "@/features/projects/access/invites/ProjectInviteInstructionsBody";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Bot invite | ${AGENT_WITCH_PRODUCT_NAME}`,
  description:
    "Agent Witch project invites are redeemed via MCP redeem_project_invite — register/connect first if needed; not a browser login.",
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly params: Promise<{ readonly token: string }>;
};

/**
 * Public token-carrier page (no auth). Redeem is MCP/REST — not browser login.
 * Instructs install/connect when no connector exists.
 */
export default async function ProjectInviteInstructionsPage({
  params,
}: PageProps) {
  const { token: raw } = await params;
  const token = decodeURIComponent(raw ?? "").trim();
  const hasToken = token.length >= 16;

  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Bot project invite</h1>
      <ProjectInviteInstructionsBody token={token} hasToken={hasToken} />
    </main>
  );
}
