import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";

type OauthConsentPageViewProps = {
  readonly assistantName: string;
  readonly canDecide: boolean;
  readonly continueHost: string | null;
  readonly pendingId: string;
  readonly showPending: boolean;
  readonly statusMessage: string | null;
};

export default function OauthConsentPageView({
  assistantName,
  canDecide,
  continueHost,
  pendingId,
  showPending,
  statusMessage,
}: OauthConsentPageViewProps) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">{OAUTH_CONSENT_COPY.title}</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {OAUTH_CONSENT_COPY.sub}
      </p>

      {showPending ? (
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

      {showPending ? (
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
