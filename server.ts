import { createServer } from "node:http";
import { parse } from "node:url";

import next from "next";
import { WebSocketServer } from "ws";

import { getAgentWitchHub } from "./src/lib/agentWitch/getAgentWitchHub";
import {
  isAllowedAgentWitchOrigin,
  isSecureAgentWitchUpgrade,
} from "./src/lib/agentWitch/isAllowedAgentWitchUpgrade";
import resolveAuthActorFromCookieHeader from "./src/lib/auth/resolveAuthActorFromCookieHeader";
import { attachAgentWitchWebSocket } from "./src/server/agentWitch/attachAgentWitchWebSocket";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME ?? "localhost";
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? "3000");
const wsPath = process.env.AGENT_WITCH_WS_PATH ?? "/api/agent-witch/ws";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const hub = getAgentWitchHub();

app.prepare().then(() => {
  const server = createServer((request, response) => {
    const parsedUrl = parse(request.url ?? "", true);
    handle(request, response, parsedUrl);
  });

  const webSocketServer = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url ?? "", true);

    if (pathname !== wsPath) {
      socket.destroy();
      return;
    }

    if (!isSecureAgentWitchUpgrade(request)) {
      socket.destroy();
      return;
    }

    if (!isAllowedAgentWitchOrigin(request)) {
      socket.destroy();
      return;
    }

    void resolveAuthActorFromCookieHeader(request.headers.cookie ?? "").then(
      (dashboardActor) => {
        webSocketServer.handleUpgrade(request, socket, head, (ws) => {
          attachAgentWitchWebSocket(hub, ws, { dashboardActor });
        });
      },
    );
  });

  server.listen(port, host, () => {
    console.log(`> Daily Magic ready on http://${hostname}:${port}`);
    console.log(`> Agent Witch WebSocket: ws://${hostname}:${port}${wsPath}`);
  });
});
