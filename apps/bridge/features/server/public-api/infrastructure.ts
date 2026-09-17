import http from "node:http";

import { resolveAgentWitchWakeListenPort } from "../../../adapters/legacyScripts";
import { handleBridgeRequest } from "../internal/handleBridgeRequest";

export const startBridgeServer = async (): Promise<http.Server> => {
  const port = await resolveAgentWitchWakeListenPort();
  const server = http.createServer((request, response) => {
    void handleBridgeRequest(request, response, port);
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      resolve();
    });
  });

  process.stdout.write(
    `Agent Witch wake server listening on http://127.0.0.1:${port}\n`,
  );

  return server;
};

/** @deprecated Use `startBridgeServer` — kept for legacy `scripts/` importers. */
export const startAgentWitchWakeServer = startBridgeServer;
