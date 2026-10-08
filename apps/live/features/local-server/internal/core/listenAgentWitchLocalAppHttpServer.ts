import type http from "node:http";

/**
 * Binds the local AWL HTTP server on `host`. Tries `preferredPort` when set;
 * on EADDRINUSE falls back to an OS-assigned port (`0`).
 */
export const listenAgentWitchLocalAppHttpServer = (
  server: http.Server,
  input: {
    readonly host: string;
    readonly preferredPort?: number | null;
  },
): Promise<number> =>
  new Promise((resolve, reject) => {
    const bind = (port: number): void => {
      const onError = (error: NodeJS.ErrnoException): void => {
        server.off("listening", onListening);
        if (error.code === "EADDRINUSE" && port !== 0) {
          server.removeListener("error", onError);
          bind(0);
          return;
        }
        reject(error);
      };
      const onListening = (): void => {
        server.removeListener("error", onError);
        const address = server.address();
        const boundPort =
          typeof address === "object" && address !== null ? address.port : port;
        resolve(boundPort);
      };
      server.once("error", onError);
      server.once("listening", onListening);
      server.listen(port, input.host);
    };

    const preferred =
      input.preferredPort !== null &&
      input.preferredPort !== undefined &&
      input.preferredPort > 0
        ? input.preferredPort
        : 0;
    bind(preferred);
  });
