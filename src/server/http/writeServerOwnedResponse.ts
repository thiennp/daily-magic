import { applySecurityHeaders } from "@/lib/security/applySecurityHeaders";

type ServerOwnedResponseSink = {
  readonly setHeader: (name: string, value: string) => unknown;
  readonly writeHead: (
    statusCode: number,
    headers: Record<string, string>,
  ) => unknown;
  readonly end: (body: string) => unknown;
};

/**
 * Writes a response that server.ts answers without Next.js (health, startup
 * 503), with the same security headers Next.js adds to its own responses.
 */
export const writeServerOwnedResponse = (
  response: ServerOwnedResponseSink,
  input: {
    readonly statusCode: number;
    readonly contentType: string;
    readonly body: string;
  },
): void => {
  applySecurityHeaders(response);
  response.writeHead(input.statusCode, { "Content-Type": input.contentType });
  response.end(input.body);
};
