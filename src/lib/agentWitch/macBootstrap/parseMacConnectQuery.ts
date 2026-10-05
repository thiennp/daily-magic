import {
  MAC_BOOTSTRAP_CLIENT_ID,
  MAC_BOOTSTRAP_PKCE_METHOD,
} from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";
import {
  MAC_BOOTSTRAP_ERROR_SLUG,
  type MacBootstrapErrorSlug,
} from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";

export type MacConnectQuery =
  | {
      readonly ok: true;
      readonly state: string;
      readonly codeChallenge: string;
    }
  | {
      readonly ok: false;
      readonly error: MacBootstrapErrorSlug;
      readonly state: string;
    };

const readParam = (
  params: URLSearchParams,
  key: string,
): string | undefined => {
  const value = params.get(key)?.trim();
  return value !== undefined && value.length > 0 ? value : undefined;
};

/** Validate `/connect?client=mac-app&state=&code_challenge=&code_challenge_method=S256`. */
export const parseMacConnectQuery = (
  params: URLSearchParams,
): MacConnectQuery => {
  const state = readParam(params, "state") ?? "";
  const client = readParam(params, "client");
  const codeChallenge = readParam(params, "code_challenge");
  const method = readParam(params, "code_challenge_method");

  if (client !== undefined && client !== MAC_BOOTSTRAP_CLIENT_ID) {
    return {
      ok: false,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_client,
      state,
    };
  }

  if (
    client === undefined ||
    state.length === 0 ||
    codeChallenge === undefined
  ) {
    return {
      ok: false,
      error: MAC_BOOTSTRAP_ERROR_SLUG.missing_params,
      state,
    };
  }

  if (method !== MAC_BOOTSTRAP_PKCE_METHOD) {
    return {
      ok: false,
      error: MAC_BOOTSTRAP_ERROR_SLUG.invalid_pkce,
      state,
    };
  }

  return { ok: true, state, codeChallenge };
};
