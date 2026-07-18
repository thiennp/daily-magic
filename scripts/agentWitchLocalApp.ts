import http from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_LOCAL_APP_PORT } from "./agentWitchLocalApp.constants";
import {
  clearAgentWitchLocalTraffic,
  readAgentWitchLocalTraffic,
} from "./agentWitchLocalTrafficLog";
import {
  queryAgentWitchRag,
  readAgentWitchRagChunks,
} from "./agentWitchLocalRag";
import {
  readAgentWitchConnectionHealth,
  isAgentWitchConnectionHealthStale,
} from "./agentWitchConnectionHealth";
import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { loadOrCreateAgentWitchDeviceKeypair } from "./agentWitchDeviceKeypair";

type LocalAppStatus = {
  readonly wsConnected: boolean;
  readonly lastHeartbeatAt: string | null;
  readonly wakeError: string | null;
  readonly linkCode: string | null;
  readonly publicKeyRaw: string;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const LOCAL_APP_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Request-Private-Network",
  "Access-Control-Allow-Private-Network": "true",
};

const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  payload: unknown,
): void => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    ...LOCAL_APP_CORS_HEADERS,
  });
  response.end(JSON.stringify(payload));
};

const sendHtml = (response: http.ServerResponse, html: string): void => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(html);
};

const readBody = async (request: http.IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
};

const buildShellPage = (input: {
  readonly title: string;
  readonly body: string;
}): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(input.title)} · Agent Witch Local</title>
  <style>
    :root { color-scheme: light; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; background: #f4f6f8; color: #15202b; }
    header { background: #0f172a; color: #f8fafc; padding: 1rem 1.25rem; }
    header a { color: #cbd5e1; margin-right: 1rem; text-decoration: none; }
    main { max-width: 960px; margin: 0 auto; padding: 1.25rem; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    pre { white-space: pre-wrap; word-break: break-word; font-size: 12px; }
    .muted { color: #64748b; }
    input, button { font: inherit; padding: 0.4rem 0.6rem; }
  </style>
</head>
<body>
  <header>
    <strong>Agent Witch Local</strong>
    <nav style="margin-top:0.5rem">
      <a href="/">Status</a>
      <a href="/traffic">Traffic</a>
      <a href="/knowledge">Knowledge</a>
    </nav>
  </header>
  <main>${input.body}</main>
</body>
</html>`;

export type AgentWitchLocalAppControllers = {
  readonly getStatus: () => LocalAppStatus;
  readonly reviveWebSocket: () => void;
};

export const startAgentWitchLocalApp = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly controllers: AgentWitchLocalAppControllers;
}): http.Server => {
  const linkCodePath = path.join(input.layout.installDir, "link-code.txt");
  const ensureLinkCode = (): string => {
    if (fs.existsSync(linkCodePath)) {
      return fs.readFileSync(linkCodePath, "utf8").trim();
    }
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    fs.writeFileSync(linkCodePath, code, "utf8");
    return code;
  };

  const server = http.createServer((request, response) => {
    void (async () => {
      const pathname = request.url?.split("?")[0] ?? "/";
      const method = request.method ?? "GET";

      if (method === "OPTIONS") {
        response.writeHead(204, LOCAL_APP_CORS_HEADERS);
        response.end();
        return;
      }

      if (method === "GET" && pathname === "/health") {
        const status = input.controllers.getStatus();
        sendJson(response, 200, { ok: true, ...status });
        return;
      }

      if (method === "GET" && pathname === "/api/status") {
        sendJson(response, 200, {
          ...input.controllers.getStatus(),
          linkCode: ensureLinkCode(),
        });
        return;
      }

      if (method === "GET" && pathname === "/api/traffic") {
        sendJson(response, 200, {
          entries: readAgentWitchLocalTraffic(input.layout),
        });
        return;
      }

      if (method === "DELETE" && pathname === "/api/traffic") {
        clearAgentWitchLocalTraffic(input.layout);
        sendJson(response, 200, { ok: true });
        return;
      }

      if (method === "GET" && pathname === "/api/knowledge") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const q = url.searchParams.get("q")?.trim() ?? "";
        if (q.length > 0) {
          const hits = await queryAgentWitchRag({
            layout: input.layout,
            query: q,
            limit: 20,
          });
          sendJson(response, 200, { chunks: hits, query: q });
          return;
        }
        sendJson(response, 200, {
          chunks: readAgentWitchRagChunks(input.layout).slice(-50).reverse(),
        });
        return;
      }

      if (method === "POST" && pathname === "/api/revive") {
        input.controllers.reviveWebSocket();
        sendJson(response, 200, { ok: true });
        return;
      }

      if (method === "GET" && pathname === "/") {
        const status = input.controllers.getStatus();
        const health = readAgentWitchConnectionHealth(input.layout);
        const stale = isAgentWitchConnectionHealthStale(
          health,
          AGENT_WITCH_CONNECTION_STALE_MS,
        );
        sendHtml(
          response,
          buildShellPage({
            title: "Status",
            body: `<div class="card">
              <h1>Local bridge</h1>
              <p>Port <code>${AGENT_WITCH_LOCAL_APP_PORT}</code></p>
              <p>WS connected: <strong>${status.wsConnected ? "yes" : "no"}</strong></p>
              <p>Last heartbeat: ${escapeHtml(status.lastHeartbeatAt ?? "never")}</p>
              <p>Health file stale: ${stale ? "yes" : "no"}</p>
              <p>Link code: <code>${escapeHtml(ensureLinkCode())}</code></p>
              <p class="muted">Public key: ${escapeHtml(status.publicKeyRaw.slice(0, 24))}…</p>
              ${status.wakeError ? `<p>Wake error: ${escapeHtml(status.wakeError)}</p>` : ""}
              <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
                <button type="submit">Revive WebSocket</button>
              </form>
            </div>`,
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/traffic") {
        const entries = readAgentWitchLocalTraffic(input.layout);
        const rows = entries
          .map(
            (entry) =>
              `<tr><td>${escapeHtml(entry.at)}</td><td>${escapeHtml(entry.direction)}</td><td>${escapeHtml(entry.type)}</td><td>${escapeHtml(entry.summary)}</td><td>${escapeHtml(entry.action ?? "")}</td></tr>`,
          )
          .join("");
        sendHtml(
          response,
          buildShellPage({
            title: "Traffic",
            body: `<div class="card">
              <h1>WS traffic log</h1>
              <p class="muted">Frames sent/received and local actions.</p>
              <table width="100%" cellpadding="6"><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table>
            </div>`,
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/knowledge") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const q = url.searchParams.get("q")?.trim() ?? "";
        const chunks =
          q.length > 0
            ? await queryAgentWitchRag({
                layout: input.layout,
                query: q,
                limit: 20,
              })
            : readAgentWitchRagChunks(input.layout).slice(-50).reverse();
        const list = chunks
          .map(
            (chunk) =>
              `<div class="card"><div class="muted">${escapeHtml(chunk.createdAt)}${chunk.source ? ` · ${escapeHtml(chunk.source)}` : ""}</div><pre>${escapeHtml(chunk.text)}</pre></div>`,
          )
          .join("");
        sendHtml(
          response,
          buildShellPage({
            title: "Knowledge",
            body: `<div class="card">
              <h1>Local knowledge</h1>
              <form method="GET" action="/knowledge">
                <input name="q" value="${escapeHtml(q)}" placeholder="Search local RAG" style="width:70%" />
                <button type="submit">Search</button>
              </form>
            </div>${list || '<p class="muted">No chunks yet. Finish an agent turn to index.</p>'}`,
          }),
        );
        return;
      }

      // unused body reader keeps API extensible
      if (method === "POST") {
        await readBody(request);
      }

      response.writeHead(404);
      response.end("Not found");
    })().catch((error: unknown) => {
      console.error("[agent-witch-local-app]", error);
      response.writeHead(500);
      response.end("Internal error");
    });
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `[agent-witch] Local app port ${AGENT_WITCH_LOCAL_APP_PORT} already in use — skipping bind.`,
      );
      return;
    }
    console.error("[agent-witch] Local app server error:", error);
  });

  server.listen(AGENT_WITCH_LOCAL_APP_PORT, "127.0.0.1", () => {
    console.log(
      `[agent-witch] Local app http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
    );
  });

  return server;
};

export const reviveAgentWitchProcessViaLaunchctl = (label: string): void => {
  spawn(
    "launchctl",
    ["kickstart", "-k", `gui/${process.getuid?.() ?? 501}/${label}`],
    {
      stdio: "ignore",
      detached: true,
    },
  ).unref();
};

export const resolveLocalAppPublicKey = (
  layout: AgentWitchLocalLayout,
): string => loadOrCreateAgentWitchDeviceKeypair(layout).publicKeyRaw;
