import { isBoolean, isNonEmptyString, isType, isUndefinedOr } from "guardz";

import {
  AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH,
  AGENT_ACCESS_REGISTRATION_METHODS,
  type AgentAccessRegistrationMethod,
} from "@/lib/agentAccess/agentAccess.constant";
import {
  AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  AWC_TERMS_VERSION,
} from "@/lib/agentAccess/awcTermsVersion.constant";

export interface AgentAccessRegisterBody {
  readonly method: AgentAccessRegistrationMethod;
  readonly displayName: string | null;
  readonly acceptTerms: true;
  readonly termsVersion: typeof AWC_TERMS_VERSION;
}

export type ParseAgentAccessRegisterBodyResult =
  | { readonly ok: true; readonly body: AgentAccessRegisterBody }
  | {
      readonly ok: false;
      readonly code: "invalid_arguments";
      readonly error: string;
    }
  | {
      readonly ok: false;
      readonly code: typeof AWC_TERMS_ACCEPTANCE_REQUIRED_CODE;
      readonly error: string;
      readonly status: 400;
    };

const isRegisterShape = isType<{
  readonly method: string;
  readonly displayName?: string;
  readonly acceptTerms?: boolean;
  readonly termsVersion?: string;
}>({
  method: isNonEmptyString,
  displayName: isUndefinedOr(isNonEmptyString),
  acceptTerms: isUndefinedOr(isBoolean),
  termsVersion: isUndefinedOr(isNonEmptyString),
});

const isRegistrationMethod = (
  value: string,
): value is AgentAccessRegistrationMethod =>
  AGENT_ACCESS_REGISTRATION_METHODS.some((method) => method === value);

const termsFailure = (): Extract<
  ParseAgentAccessRegisterBodyResult,
  { ok: false; code: typeof AWC_TERMS_ACCEPTANCE_REQUIRED_CODE }
> => ({
  ok: false,
  code: AWC_TERMS_ACCEPTANCE_REQUIRED_CODE,
  error: AWC_TERMS_ACCEPTANCE_REQUIRED_ERROR,
  status: 400,
});

export const parseAgentAccessRegisterBody = (
  value: unknown,
): ParseAgentAccessRegisterBodyResult => {
  if (!isRegisterShape(value) || !isRegistrationMethod(value.method)) {
    return {
      ok: false,
      code: "invalid_arguments",
      error: 'method must be "none" or "agentmail".',
    };
  }

  const displayName = value.displayName?.trim() ?? "";

  if (displayName.length > AGENT_ACCESS_DISPLAY_NAME_MAX_LENGTH) {
    return {
      ok: false,
      code: "invalid_arguments",
      error: 'method must be "none" or "agentmail".',
    };
  }

  if (value.acceptTerms !== true || value.termsVersion !== AWC_TERMS_VERSION) {
    return termsFailure();
  }

  return {
    ok: true,
    body: {
      method: value.method,
      displayName: displayName.length > 0 ? displayName : null,
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
    },
  };
};
