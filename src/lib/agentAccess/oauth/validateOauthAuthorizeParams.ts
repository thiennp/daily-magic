import { isAllowedOauthRedirectUri } from "@/lib/agentAccess/oauth/isAllowedOauthRedirectUri";
import { isPkceS256Method } from "@/lib/agentAccess/oauth/verifyPkceS256";

export type OauthAuthorizeParamsError = {
  readonly ok: false;
  readonly status: number;
  readonly error: string;
  readonly error_description: string;
};

export const validateOauthAuthorizeParams = (input: {
  readonly redirectUri: string;
  readonly codeChallenge: string;
  readonly codeChallengeMethod: string;
}): OauthAuthorizeParamsError | null => {
  if (!isAllowedOauthRedirectUri(input.redirectUri)) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: "redirect_uri is not allowed.",
    };
  }
  if (!isPkceS256Method(input.codeChallengeMethod)) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: 'code_challenge_method must be "S256" (plain rejected).',
    };
  }
  if (
    input.codeChallenge.trim().length < 43 ||
    input.codeChallenge.trim().length > 128
  ) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: "code_challenge is required (PKCE S256).",
    };
  }
  return null;
};
