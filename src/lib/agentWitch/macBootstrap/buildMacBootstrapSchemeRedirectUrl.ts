import { MAC_BOOTSTRAP_SCHEME_BASE } from "@/lib/agentWitch/macBootstrap/macBootstrap.constants";

export const buildMacBootstrapSchemeRedirectUrl = (input: {
  readonly state: string;
  readonly code?: string;
  readonly error?: string;
}): string => {
  const url = new URL(MAC_BOOTSTRAP_SCHEME_BASE);
  url.searchParams.set("state", input.state);
  if (input.code !== undefined && input.code.length > 0) {
    url.searchParams.set("code", input.code);
  }
  if (input.error !== undefined && input.error.length > 0) {
    url.searchParams.set("error", input.error);
  }
  return url.toString();
};
