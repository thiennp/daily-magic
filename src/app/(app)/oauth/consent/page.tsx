import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { OauthConsentPageView } from "@/features/agent-access/public-api/presentation";
import {
  buildAssistantOwnerLoginPath,
  OAUTH_CONSENT_COPY,
  readOauthConsentSearchParam,
} from "@/features/agent-access/public-api/types";
import { formatOauthRedirectHost } from "@/lib/agentAccess/oauth/formatOauthRedirectHost";
import { loadOauthPending } from "@/lib/agentAccess/oauth/loadOauthPending";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: OAUTH_CONSENT_COPY.pageTitle,
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OauthConsentPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const pendingId = readOauthConsentSearchParam(params, "pending").trim();
  const errorCode = readOauthConsentSearchParam(params, "error");

  if (!session?.user?.id) {
    const callback = `/oauth/consent${pendingId.length > 0 ? `?pending=${encodeURIComponent(pendingId)}` : ""}`;
    redirect(buildAssistantOwnerLoginPath(callback));
  }

  const pending =
    pendingId.length > 0 ? await loadOauthPending({ pendingId }) : null;

  const assistantName =
    pending?.clientDisplayName ?? OAUTH_CONSENT_COPY.clientFallback;
  const continueHost =
    pending !== null
      ? (formatOauthRedirectHost(pending.redirectUri) ??
        OAUTH_CONSENT_COPY.continueAtFallback)
      : null;

  const statusMessage =
    errorCode === "terms_acceptance_required"
      ? OAUTH_CONSENT_COPY.termsRequired
      : errorCode === "invalid_request" ||
          (pendingId.length > 0 && pending === null)
        ? OAUTH_CONSENT_COPY.expired
        : null;

  return (
    <OauthConsentPageView
      assistantName={assistantName}
      canDecide={pending !== null}
      continueHost={continueHost}
      pendingId={pendingId}
      showPending={pending !== null}
      statusMessage={statusMessage}
    />
  );
}
