import { createServer } from "node:http";
import { parse } from "node:url";

import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME ?? "localhost";
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? "3000");
const healthPath = "/api/health";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let nextReady = false;

const server = createServer((request, response) => {
  const parsedUrl = parse(request.url ?? "", true);

  if (parsedUrl.pathname === healthPath) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  if (!nextReady) {
    response.writeHead(503, { "Content-Type": "text/plain" });
    response.end("Service starting");
    return;
  }

  handle(request, response, parsedUrl);
});

server.listen(port, host, () => {
  console.log(`> Daily Magic listening on http://${host}:${port}`);
  console.log(`> Health check: http://${host}:${port}${healthPath}`);
});

void app
  .prepare()
  .then(() => {
    nextReady = true;
    console.log(`> Daily Magic ready on http://${hostname}:${port}`);
    console.log(
      `> Agent Witch transport: HTTP poll + SSE (no WebSocket upgrade)`,
    );
  })
  .catch((error: unknown) => {
    console.error("Failed to prepare Daily Magic server:", error);
    process.exit(1);
  });
