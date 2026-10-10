import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MacConnectBootstrapClient } from "@/features/agent-witch/mac-bootstrap/public-api/presentation";
import { resolveMacConnectBootstrapView } from "@/features/agent-witch/mac-bootstrap/public-api/infrastructure";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Connect Mac | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const toURLSearchParams = (
  raw: Record<string, string | string[] | undefined>,
): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value) && value[0] !== undefined) {
      params.set(key, value[0]);
    }
  }
  return params;
};

/** Mac app first-run: mint PKCE code after sign-in, redirect to agentwitch-local://. */
export default async function MacConnectPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = toURLSearchParams(await searchParams);
  const view = await resolveMacConnectBootstrapView({
    searchParams: params,
    userId: session?.user?.id ?? null,
  });

  if (view.kind === "login") {
    redirect(`/login?callbackUrl=${encodeURIComponent(view.callbackUrl)}`);
  }

  return (
    <MacConnectBootstrapClient
      redirectUrl={view.redirectUrl}
      errorSlug={view.errorSlug}
    />
  );
}
