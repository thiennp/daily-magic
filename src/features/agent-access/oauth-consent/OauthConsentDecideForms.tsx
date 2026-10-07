import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";
import AwcTermsLinksSentence from "@/features/agent-access/terms/AwcTermsLinksSentence";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";

type OauthConsentDecideFormsProps = {
  readonly pendingId: string;
};

/** Confirm (with linked Terms checkbox) / Deny forms on /oauth/consent. */
export default function OauthConsentDecideForms({
  pendingId,
}: OauthConsentDecideFormsProps) {
  return (
    <>
      <div className="mt-8 space-y-4">
        <form
          method="POST"
          action="/api/agent-access/oauth/consent"
          className="space-y-4"
        >
          <input type="hidden" name="pending" value={pendingId} />
          <input type="hidden" name="decision" value="approve" />
          <input type="hidden" name="termsVersion" value={AWC_TERMS_VERSION} />
          <label className="flex items-start gap-2 text-sm text-awc-fg dark:text-gray-200">
            <input
              type="checkbox"
              name="acceptTerms"
              value="true"
              required
              className="mt-1"
            />
            <AwcTermsLinksSentence
              prefix={OAUTH_CONSENT_COPY.termsLabelPrefix}
              suffix={OAUTH_CONSENT_COPY.termsLabelSuffix}
            />
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
            className="rounded-md border border-awc-border-strong px-4 py-2 text-sm font-medium text-awc-fg hover:bg-awc-surface-2 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            {OAUTH_CONSENT_COPY.deny}
          </button>
        </form>
      </div>
    </>
  );
}
