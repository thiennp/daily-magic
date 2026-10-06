import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { formatOauthRedirectHost } from "@/lib/agentAccess/oauth/formatOauthRedirectHost";
import { loadOauthPending } from "@/lib/agentAccess/oauth/loadOauthPending";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Approve assistant | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

const readParam = (
  raw: Record<string, string | string[] | undefined>,
  key: string,
): string => {
  const value = raw[key];
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value[0] !== undefined) return value[0];
  return "";
};

export default async function OauthConsentPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const pendingId = readParam(params, "pending").trim();
  const errorCode = readParam(params, "error");

  if (!session?.user?.id) {
    const callback = `/oauth/consent${pendingId.length > 0 ? `?pending=${encodeURIComponent(pendingId)}` : ""}`;
    redirect(`/login?callbackUrl=${encodeURIComponent(callback)}`);
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

  const canDecide = pending !== null;

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">{OAUTH_CONSENT_COPY.title}</h1>
      <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
        {OAUTH_CONSENT_COPY.ownerLine}
      </p>

      {pending !== null ? (
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {OAUTH_CONSENT_COPY.clientLabel}
            </dt>
            <dd className="font-medium">{assistantName}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {OAUTH_CONSENT_COPY.continueAtLabel}
            </dt>
            <dd className="font-medium">{continueHost}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {OAUTH_CONSENT_COPY.openLinkHint}
        </p>
      )}

      {pending !== null ? (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {OAUTH_CONSENT_COPY.continueHint}
        </p>
      ) : null}

      {statusMessage !== null ? (
        <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">
          {statusMessage}
        </p>
      ) : null}

      {canDecide ? (
        <div className="mt-8 space-y-4">
          <form
            method="POST"
            action="/api/agent-access/oauth/consent"
            className="space-y-4"
          >
            <input type="hidden" name="pending" value={pendingId} />
            <input type="hidden" name="decision" value="approve" />
            <input
              type="hidden"
              name="termsVersion"
              value={AWC_TERMS_VERSION}
            />
            <label className="flex items-start gap-2 text-sm text-gray-800 dark:text-gray-200">
              <input
                type="checkbox"
                name="acceptTerms"
                value="true"
                required
                className="mt-1"
              />
              <span>{OAUTH_CONSENT_COPY.termsLabel}</span>
            </label>
            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
              >
                {OAUTH_CONSENT_COPY.confirm}
              </button>
            </div>
          </form>
          <form method="POST" action="/api/agent-access/oauth/consent">
            <input type="hidden" name="pending" value={pendingId} />
            <input type="hidden" name="decision" value="deny" />
            <button
              type="submit"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
            >
              {OAUTH_CONSENT_COPY.deny}
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
