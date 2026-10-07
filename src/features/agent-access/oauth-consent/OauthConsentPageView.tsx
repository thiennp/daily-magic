import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";
import OauthConsentDecideForms from "@/features/agent-access/oauth-consent/OauthConsentDecideForms";

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
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-awc-fg dark:text-white">
      <h1 className="text-xl font-semibold">{OAUTH_CONSENT_COPY.title}</h1>
      <p className="mt-3 text-sm text-awc-fg-muted dark:text-gray-400">
        {OAUTH_CONSENT_COPY.sub}
      </p>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        {OAUTH_CONSENT_COPY.stop}
      </p>

      {showPending ? (
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-awc-fg-muted dark:text-gray-400">
              {OAUTH_CONSENT_COPY.clientLabel}
            </dt>
            <dd className="font-medium">{assistantName}</dd>
          </div>
          <div>
            <dt className="text-awc-fg-muted dark:text-gray-400">
              {OAUTH_CONSENT_COPY.continueAtLabel}
            </dt>
            <dd className="font-medium">{continueHost}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-awc-fg-muted dark:text-gray-400">
          {OAUTH_CONSENT_COPY.openLinkHint}
        </p>
      )}

      {showPending ? (
        <p className="mt-4 text-sm text-awc-fg-muted dark:text-gray-400">
          {OAUTH_CONSENT_COPY.continueHint}
        </p>
      ) : null}

      {statusMessage !== null ? (
        <p className="mt-6 text-sm text-awc-fg dark:text-gray-300">
          {statusMessage}
        </p>
      ) : null}

      {canDecide ? <OauthConsentDecideForms pendingId={pendingId} /> : null}
    </main>
  );
}
