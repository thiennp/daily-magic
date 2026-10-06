import { SECURITY_HEADERS } from "@/lib/security/securityHeaders.constant";

type HeaderSink = {
  readonly setHeader: (name: string, value: string) => unknown;
};

/** Sets `SECURITY_HEADERS` on a Node response the custom server writes itself. */
export const applySecurityHeaders = (response: HeaderSink): void => {
  for (const { key, value } of SECURITY_HEADERS) {
    response.setHeader(key, value);
  }
};
