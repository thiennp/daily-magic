import { buildMacBootstrapSchemeRedirectUrl } from "@/lib/agentWitch/macBootstrap/buildMacBootstrapSchemeRedirectUrl";
import { mintMacBootstrapCode } from "@/lib/agentWitch/macBootstrap/mintMacBootstrapCode";
import { MAC_BOOTSTRAP_ERROR_SLUG } from "@/lib/agentWitch/macBootstrap/macBootstrapErrorSlug.constant";
import { parseMacConnectQuery } from "@/lib/agentWitch/macBootstrap/parseMacConnectQuery";

export type MacConnectBootstrapView =
  | { readonly kind: "login"; readonly callbackUrl: string }
  | { readonly kind: "redirect"; readonly redirectUrl: string; readonly errorSlug?: string };

export const resolveMacConnectBootstrapView = async (input: {
  readonly searchParams: URLSearchParams;
  readonly userId: string | null;
}): Promise<MacConnectBootstrapView> => {
  const callbackUrl = `/connect?${input.searchParams.toString()}`;
  if (input.userId === null) {
    return { kind: "login", callbackUrl };
  }

  const parsed = parseMacConnectQuery(input.searchParams);
  if (!parsed.ok) {
    return {
      kind: "redirect",
      errorSlug: parsed.error,
      redirectUrl: buildMacBootstrapSchemeRedirectUrl({
        state: parsed.state,
        error: parsed.error,
      }),
    };
  }

  const minted = await mintMacBootstrapCode({
    userId: input.userId,
    state: parsed.state,
    codeChallenge: parsed.codeChallenge,
  });
  if (!minted.ok) {
    return {
      kind: "redirect",
      errorSlug: MAC_BOOTSTRAP_ERROR_SLUG.mint_failed,
      redirectUrl: buildMacBootstrapSchemeRedirectUrl({
        state: parsed.state,
        error: MAC_BOOTSTRAP_ERROR_SLUG.mint_failed,
      }),
    };
  }

  return {
    kind: "redirect",
    redirectUrl: buildMacBootstrapSchemeRedirectUrl({
      state: parsed.state,
      code: minted.code,
    }),
  };
};
