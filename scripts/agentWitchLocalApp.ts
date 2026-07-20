import http from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_LOCAL_APP_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT,
} from "./agentWitchLocalApp.constants";
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
import { formatAgentWitchRelativeTimeAgo } from "./formatAgentWitchRelativeTimeAgo";
import { buildAgentWitchLocalAppShell } from "./buildAgentWitchLocalAppShell";
import { formatAgentWitchInstallBundleVersionLabel } from "./formatAgentWitchInstallBundleVersionLabel";
import { readAgentWitchInstallVersion } from "./agentWitchInstallVersion";
import { shouldShowAgentWitchLocalReviveButton } from "./shouldShowAgentWitchLocalReviveButton";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { loadOrCreateAgentWitchDeviceKeypair } from "./agentWitchDeviceKeypair";

const formatLocalAppTimestamp = (value: string | null): string =>
  formatAgentWitchRelativeTimeAgo(value) ?? "never";

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

const buildStatusBody = (input: {
  readonly status: LocalAppStatus;
  readonly stale: boolean;
  readonly linkCode: string;
  readonly installBundleVersion: string;
  readonly installBundleUpdatedAt: string | null;
}): string => {
  const connectedBadge = input.status.wsConnected
    ? `<span class="badge badge-online">Connected</span>`
    : `<span class="badge badge-offline">Disconnected</span>`;
  const healthBadge = input.stale
    ? `<span class="badge badge-warn">Stale</span>`
    : `<span class="badge badge-online">Fresh</span>`;
  const wakeError = input.status.wakeError
    ? `<div class="alert-error">${escapeHtml(input.status.wakeError)}</div>`
    : "";
  const reviveActions = shouldShowAgentWitchLocalReviveButton(
    input.status.wsConnected,
  )
    ? `<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`
    : "";

  return `<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Mac-side Agent Witch bridge at <a href="${AGENT_WITCH_LOCAL_APP_ORIGIN}"><code>${AGENT_WITCH_LOCAL_APP_ORIGIN}</code></a>.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${connectedBadge}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${escapeHtml(formatLocalAppTimestamp(input.status.lastHeartbeatAt))}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${healthBadge}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${escapeHtml(input.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${escapeHtml(input.installBundleVersion)}</code>${input.installBundleUpdatedAt !== null ? ` <span class="muted">· ${escapeHtml(formatLocalAppTimestamp(input.installBundleUpdatedAt))}</span>` : ""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${escapeHtml(input.status.publicKeyRaw.slice(0, 24))}…</span></div>
      </div>
      ${wakeError}
      ${reviveActions}
    </section>`;
};

export type AgentWitchLocalAppControllers = {
  readonly getStatus: () => LocalAppStatus;
  readonly reviveWebSocket: () => void;
};

export const startAgentWitchLocalApp = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly controllers: AgentWitchLocalAppControllers;
}): http.Server => {
  const linkCodePath = path.join(input.layout.installDir, "link-code.txt");
  const readInstallVersion = () =>
    readAgentWitchInstallVersion(input.layout.installDir);
  const buildInstallBundleStatus = () => {
    const installVersion = readInstallVersion();
    return {
      installBundleVersion:
        formatAgentWitchInstallBundleVersionLabel(installVersion),
      installBundleUpdatedAt: installVersion?.updatedAt ?? null,
      installVersion,
    };
  };
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
        const installBundle = buildInstallBundleStatus();
        sendJson(response, 200, {
          ok: true,
          ...status,
          installBundleVersion: installBundle.installBundleVersion,
          installBundleUpdatedAt: installBundle.installBundleUpdatedAt,
        });
        return;
      }

      if (method === "GET" && pathname === "/api/status") {
        const installBundle = buildInstallBundleStatus();
        sendJson(response, 200, {
          ...input.controllers.getStatus(),
          linkCode: ensureLinkCode(),
          installBundleVersion: installBundle.installBundleVersion,
          installBundleUpdatedAt: installBundle.installBundleUpdatedAt,
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
        const installBundle = buildInstallBundleStatus();
        sendHtml(
          response,
          buildAgentWitchLocalAppShell({
            title: "Status",
            activePath: "/",
            installVersion: installBundle.installVersion,
            body: buildStatusBody({
              status,
              stale,
              linkCode: ensureLinkCode(),
              installBundleVersion: installBundle.installBundleVersion,
              installBundleUpdatedAt: installBundle.installBundleUpdatedAt,
            }),
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/traffic") {
        const entries = readAgentWitchLocalTraffic(input.layout);
        const installBundle = buildInstallBundleStatus();
        const rows = entries
          .map(
            (entry) =>
              `<tr><td title="${escapeHtml(entry.at)}">${escapeHtml(formatLocalAppTimestamp(entry.at))}</td><td>${escapeHtml(entry.direction)}</td><td><code>${escapeHtml(entry.type)}</code></td><td>${escapeHtml(entry.summary)}</td><td>${escapeHtml(entry.action ?? "")}</td></tr>`,
          )
          .join("");
        const table =
          entries.length > 0
            ? `<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>`
            : `<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>`;
        sendHtml(
          response,
          buildAgentWitchLocalAppShell({
            title: "Traffic",
            activePath: "/traffic",
            installVersion: installBundle.installVersion,
            body: `<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${table}
            </section>`,
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
        const installBundle = buildInstallBundleStatus();
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
              `<article class="card"><div class="muted" title="${escapeHtml(chunk.createdAt)}">${escapeHtml(formatLocalAppTimestamp(chunk.createdAt))}${chunk.source ? ` · ${escapeHtml(chunk.source)}` : ""}</div><pre>${escapeHtml(chunk.text)}</pre></article>`,
          )
          .join("");
        sendHtml(
          response,
          buildAgentWitchLocalAppShell({
            title: "Knowledge",
            activePath: "/knowledge",
            installVersion: installBundle.installVersion,
            body: `<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${escapeHtml(q)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${list || '<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`,
          }),
        );
        return;
      }

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
    console.log(`[agent-witch] Local app ${AGENT_WITCH_LOCAL_APP_ORIGIN}`);
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
