import {
  AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  AWC_TERMS_VERSION,
} from "@/lib/agentAccess/awcTermsVersion.constant";

export type AwcTermsAcceptanceOk = {
  readonly ok: true;
  readonly termsVersion: typeof AWC_TERMS_VERSION;
};

export type AwcTermsAcceptanceFail = {
  readonly ok: false;
  readonly status: 400;
  readonly code: typeof AWC_TERMS_ACCEPTANCE_REQUIRED_CODE;
  readonly error: typeof AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR;
};

/**
 * Shared terms gate for register + device/start (S0b / S1).
 * Requires acceptTerms === true and termsVersion === AWC_TERMS_VERSION.
 */
export const requireAwcTermsAcceptance = (input: {
  readonly acceptTerms?: unknown;
  readonly termsVersion?: unknown;
}): AwcTermsAcceptanceOk | AwcTermsAcceptanceFail => {
  if (
    input.acceptTerms !== true ||
    input.termsVersion !== AWC_TERMS_VERSION
  ) {
    return {
      ok: false,
      status: 400,
      code: AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
      error: AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
    };
  }

  return { ok: true, termsVersion: AWC_TERMS_VERSION };
};
