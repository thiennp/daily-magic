import http from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_LOCAL_APP_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT,
  formatAgentWitchRelativeTimeAgo,
} from "@agent-witch/live-local-server";
import {
  clearAgentWitchErrorLog,
  clearAgentWitchLocalTraffic,
  clearAgentWitchLocalWsTrace,
  readAgentWitchErrorLogTail,
  readAgentWitchLocalTraffic,
  readAgentWitchLocalWsTrace,
} from "@agent-witch/live-diagnostics";
import { buildAgentWitchLocalErrorLogPageBody } from "@agent-witch/live-diagnostics/presentation";
import {
  buildAgentWitchLocalHeartbeatElapsedMarkup,
  buildAgentWitchLocalStatusTraceSection,
} from "@agent-witch/live-status-health/presentation";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "@agent-witch/install-connection-health";
import { AGENT_WITCH_CONNECTION_STALE_MS } from "@agent-witch/install-connection-health/types";
import {
  queryAgentWitchRag,
  readAgentWitchRagChunks,
} from "@agent-witch/live-knowledge";
import {
  type AgentWitchLocalInstallUpdateFlash,
  buildAgentWitchLocalInstallUpdateFlashHtml,
  buildAgentWitchLocalInstallUpdateHeaderButtonHtml,
  buildAgentWitchLocalInstallUpdatePromptHtml,
  buildAgentWitchLocalAppShell,
} from "@agent-witch/live-shell/presentation";
import { buildAgentWitchLocalHomePageBody } from "@agent-witch/live-home/presentation";
import { buildAgentWitchLocalTaskPageBody } from "@agent-witch/live-tasks/presentation";
import { buildAgentWitchLocalWriterApiPageBody } from "@agent-witch/live-writer-settings/presentation";
import {
  buildAgentWitchLocalHarnessPageBody,
  parseHarnessSubmitFormBody,
} from "@agent-witch/live-harness/presentation";
import {
  applyInstalledHarnessSetsToProjectCursor,
  assertReadableFileUnderHome,
  buildDefaultLocalHarnessScanFolder,
  clearLocalHarnessRevealCache,
  mergeLocalHarnessRevealWithCursorDir,
  readAgentWitchProjectHarnessSetSlugs,
  readInstalledLocalHarnessSnapshot,
  readLocalHarnessRevealCache,
  streamLocalHarnessReveal,
  submitLocalHarnessSelection,
  writeLocalHarnessRevealCache,
} from "@agent-witch/live-harness";
import {
  addAgentWitchLocalProjectToRegistry,
  ensureAgentWitchProjectFolder,
  findAgentWitchLocalProjectById,
  pickMacOsFolderDialog,
  readAgentWitchLocalProjectsRegistry,
  syncAgentWitchLocalProjectsFromCloud,
} from "@agent-witch/live-projects";
import {
  buildAgentWitchLocalProjectDetailPageBody,
  buildAgentWitchLocalProjectsPageBody,
} from "@agent-witch/live-projects/presentation";
import {
  formatAgentWitchInstallBundleVersionLabel,
  resolveAgentWitchLocalCloudAppOrigin,
  resolveAgentWitchLocalInstallUpdateOffer,
  shouldShowAgentWitchLocalReviveButton,
  triggerAgentWitchLocalInstallBundleUpdate,
} from "@agent-witch/live-shell";
import { readAgentWitchInstallVersion } from "@agent-witch/install-self-update";
import { runLocalSelfDelegatedTask } from "@agent-witch/live-tasks";
import {
  applyWriterApiSettings,
  readAgentWitchRunConfig,
  readWriterApiSecretsFile,
  resolveAgentWitchProfileDirFromConfigPath,
  resolveWriterExecutionBackend,
} from "@agent-witch/install-runtime-client";
import type { WriterExecutionBackend } from "@agent-witch/install-runtime-client/types";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { loadOrCreateAgentWitchDeviceKeypair } from "@agent-witch/install-device-identity";
import type { LocalHarnessRevealResult } from "@agent-witch/live-harness/types";

const formatLocalAppTimestamp = (value: string | null): string =>
  formatAgentWitchRelativeTimeAgo(value) ?? "never";

const LOCAL_HARNESS_FILE_PREVIEW_MAX_CHARS = 48_000;

const resolveHarnessImportSectionExpanded = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly reveal: LocalHarnessRevealResult | null;
    readonly importQuery: boolean;
    readonly justSubmitted: boolean;
  },
): boolean => {
  if (input.importQuery) {
    return true;
  }

  if (input.justSubmitted) {
    return false;
  }

  return input.reveal !== null && input.reveal.sets.length > 0;
};

const buildHarnessPageBodyInput = (
  layout: AgentWitchLocalLayout,
  input: {
    readonly cloudAppOrigin: string;
    readonly reveal: LocalHarnessRevealResult | null;
    readonly scanFolder?: string;
    readonly flashMessage?: string | null;
    readonly flashError?: string | null;
    readonly importSectionExpanded: boolean;
  },
) => ({
  scanFolder:
    input.scanFolder ??
    input.reveal?.scanRoots[0] ??
    buildDefaultLocalHarnessScanFolder(),
  reveal: input.reveal,
  installed: readInstalledLocalHarnessSnapshot(layout),
  cloudAppOrigin: input.cloudAppOrigin,
  flashMessage: input.flashMessage,
  flashError: input.flashError,
  importSectionExpanded: input.importSectionExpanded,
});

const syncLocalProjectsFromCloud = async (
  layout: AgentWitchLocalLayout,
): Promise<{ readonly ok: boolean; readonly message: string }> => {
  const runConfig = readAgentWitchRunConfig();
  if (runConfig === null) {
    return {
      ok: false,
      message:
        "Mac client config missing — showing folders registered on this Mac only.",
    };
  }

  const result = await syncAgentWitchLocalProjectsFromCloud(layout, runConfig);
  return { ok: result.ok, message: result.message };
};

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
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${connectedBadge}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${buildAgentWitchLocalHeartbeatElapsedMarkup(input.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${healthBadge}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${escapeHtml(input.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${escapeHtml(input.installBundleVersion)}</code>${input.installBundleUpdatedAt !== null ? ` <span class="muted">· ${escapeHtml(formatLocalAppTimestamp(input.installBundleUpdatedAt))}</span>` : ""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${escapeHtml(input.status.publicKeyRaw.slice(0, 24))}…</span></div>
      </div>
      ${wakeError}
      ${reviveActions}
    </section>`;
};

const readLocalAppUpdateFlash = (
  requestUrl: string | undefined,
): AgentWitchLocalInstallUpdateFlash => {
  const url = new URL(
    requestUrl ?? "/",
    `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
  );
  const value = url.searchParams.get("update");
  if (value === "ok") {
    return "ok";
  }
  if (value === "failed") {
    return "failed";
  }
  if (value === "started") {
    return "started";
  }
  return null;
};

export type AgentWitchLocalAppControllers = {
  readonly getStatus: () => LocalAppStatus;
  readonly reviveWebSocket: () => void;
  readonly reportHarnessManifestIfConnected?: () => {
    readonly ok: boolean;
    readonly errorMessage?: string;
  };
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
  const buildLocalAppShell = async (shell: {
    readonly title: string;
    readonly activePath: Parameters<
      typeof buildAgentWitchLocalAppShell
    >[0]["activePath"];
    readonly body: string;
    readonly installVersion?: ReturnType<typeof readInstallVersion> | null;
    readonly updateFlash?: AgentWitchLocalInstallUpdateFlash;
  }): Promise<string> => {
    const installVersion = shell.installVersion ?? readInstallVersion();
    const offer = await getInstallUpdateOffer();
    const updatePromptHtml = buildAgentWitchLocalInstallUpdatePromptHtml(offer);
    const updateFlashHtml = buildAgentWitchLocalInstallUpdateFlashHtml(
      shell.updateFlash ?? null,
    );
    return buildAgentWitchLocalAppShell({
      title: shell.title,
      activePath: shell.activePath,
      body: shell.body,
      cloudAppOrigin: resolveAgentWitchLocalCloudAppOrigin(installVersion),
      installBundleVersionLabel:
        formatAgentWitchInstallBundleVersionLabel(installVersion),
      prependBody: `${updateFlashHtml}${updatePromptHtml}`,
      headerUpdateButtonHtml:
        buildAgentWitchLocalInstallUpdateHeaderButtonHtml(offer),
    });
  };
  let installUpdateOfferCache: {
    readonly cachedAtMs: number;
    readonly offer: Awaited<
      ReturnType<typeof resolveAgentWitchLocalInstallUpdateOffer>
    >;
  } | null = null;
  const getInstallUpdateOffer = async (): Promise<
    Awaited<ReturnType<typeof resolveAgentWitchLocalInstallUpdateOffer>>
  > => {
    const nowMs = Date.now();
    if (
      installUpdateOfferCache !== null &&
      nowMs - installUpdateOfferCache.cachedAtMs < 60_000
    ) {
      return installUpdateOfferCache.offer;
    }

    const offer = await resolveAgentWitchLocalInstallUpdateOffer(input.layout);
    installUpdateOfferCache = { cachedAtMs: nowMs, offer };
    return offer;
  };
  const clearInstallUpdateOfferCache = (): void => {
    installUpdateOfferCache = null;
  };
  let localInstallBundleUpdateInFlight = false;
  const runLocalInstallBundleUpdateInBackground = (): void => {
    if (localInstallBundleUpdateInFlight) {
      return;
    }
    localInstallBundleUpdateInFlight = true;
    void triggerAgentWitchLocalInstallBundleUpdate()
      .catch((error: unknown) => {
        console.error(
          "[agent-witch-local-app] install bundle update failed:",
          error,
        );
      })
      .finally(() => {
        localInstallBundleUpdateInFlight = false;
        clearInstallUpdateOfferCache();
      });
  };
  const handleLocalInstallBundleUpdateRequest = async (
    response: http.ServerResponse,
  ): Promise<void> => {
    clearInstallUpdateOfferCache();
    const offer = await getInstallUpdateOffer();
    if (!offer.updateAvailable) {
      response.writeHead(303, { Location: "/?update=ok" });
      response.end();
      return;
    }

    response.writeHead(303, { Location: "/?update=started" });
    response.end();
    runLocalInstallBundleUpdateInBackground();
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

      if (method === "GET" && pathname === "/api/trace") {
        sendJson(response, 200, {
          entries: readAgentWitchLocalWsTrace(input.layout),
        });
        return;
      }

      if (
        (method === "DELETE" && pathname === "/api/trace") ||
        (method === "POST" && pathname === "/api/trace/clear")
      ) {
        clearAgentWitchLocalWsTrace(input.layout);
        if (method === "POST") {
          response.writeHead(303, { Location: "/status" });
          response.end();
          return;
        }
        sendJson(response, 200, { ok: true });
        return;
      }

      if (method === "POST" && pathname === "/api/errors/clear") {
        clearAgentWitchErrorLog(input.layout.errorLogPath);
        response.writeHead(303, { Location: "/errors" });
        response.end();
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

      if (method === "GET" && pathname === "/api/update-status") {
        const offer = await getInstallUpdateOffer();
        sendJson(response, 200, { ok: true, ...offer });
        return;
      }

      if (
        (method === "GET" || method === "POST") &&
        pathname === "/api/update"
      ) {
        await handleLocalInstallBundleUpdateRequest(response);
        return;
      }

      if (method === "GET" && pathname === "/") {
        const status = input.controllers.getStatus();
        const installBundle = buildInstallBundleStatus();
        const installed = readInstalledLocalHarnessSnapshot(input.layout);
        const errorLog = readAgentWitchErrorLogTail(input.layout.errorLogPath);
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Home",
            activePath: "/",
            installVersion: installBundle.installVersion,
            updateFlash: readLocalAppUpdateFlash(request.url ?? undefined),
            body: buildAgentWitchLocalHomePageBody({
              wsConnected: status.wsConnected,
              lastHeartbeatAt: status.lastHeartbeatAt,
              installBundleVersion: installBundle.installBundleVersion,
              harnessSetCount: installed.sets.length,
              knowledgeChunkCount: readAgentWitchRagChunks(input.layout).length,
              trafficEntryCount: readAgentWitchLocalTraffic(input.layout)
                .length,
              wakeError: status.wakeError,
              errorLogByteSize: errorLog.byteSize,
              errorLogExists: errorLog.exists,
            }),
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/task") {
        const status = input.controllers.getStatus();
        const installBundle = buildInstallBundleStatus();
        const runConfig = readAgentWitchRunConfig();
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const flashMessage =
          url.searchParams.get("ok") === "1"
            ? "Task finished — status reported to cloud."
            : null;
        const flashError =
          url.searchParams.get("failed") === "1"
            ? (url.searchParams.get("error")?.trim() ?? "Task failed.")
            : null;
        const lastRunId = url.searchParams.get("runId");
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Task",
            activePath: "/task",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalTaskPageBody({
              defaultWorkspace: runConfig?.workspace ?? "",
              wsConnected: status.wsConnected,
              flashMessage,
              flashError,
              lastRunId,
            }),
          }),
        );
        return;
      }

      if (method === "POST" && pathname === "/task/dispatch") {
        const rawBody = await readBody(request);
        const form = new URLSearchParams(rawBody);
        const prompt = form.get("prompt")?.trim() ?? "";
        const writerAgent = form.get("writerAgent")?.trim() ?? "claude-cli";
        const projectFolder = form.get("projectFolder")?.trim() ?? "";
        const result = await runLocalSelfDelegatedTask({
          prompt,
          writerAgent,
          ...(projectFolder.length > 0
            ? { projectFolderPath: projectFolder }
            : {}),
        });
        const query = new URLSearchParams();
        if (result.ok) {
          query.set("ok", "1");
        } else {
          query.set("failed", "1");
          if (result.errorMessage !== undefined) {
            query.set("error", result.errorMessage.slice(0, 240));
          }
        }
        if (result.agentRunId !== undefined) {
          query.set("runId", result.agentRunId);
        }
        response.writeHead(303, { Location: `/task?${query.toString()}` });
        response.end();
        return;
      }

      if (method === "GET" && pathname === "/errors") {
        const installBundle = buildInstallBundleStatus();
        const errorLog = readAgentWitchErrorLogTail(input.layout.errorLogPath);
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Errors",
            activePath: "/errors",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalErrorLogPageBody({
              errorLogPath: input.layout.errorLogPath,
              content: errorLog.content,
              exists: errorLog.exists,
              truncated: errorLog.truncated,
              byteSize: errorLog.byteSize,
            }),
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/status") {
        const status = input.controllers.getStatus();
        const health = readAgentWitchConnectionHealth(input.layout);
        const stale = isAgentWitchConnectionHealthStale(
          health,
          AGENT_WITCH_CONNECTION_STALE_MS,
        );
        const installBundle = buildInstallBundleStatus();
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Status",
            activePath: "/status",
            installVersion: installBundle.installVersion,
            body: `${buildStatusBody({
              status,
              stale,
              linkCode: ensureLinkCode(),
              installBundleVersion: installBundle.installBundleVersion,
              installBundleUpdatedAt: installBundle.installBundleUpdatedAt,
            })}${buildAgentWitchLocalStatusTraceSection({
              entries: readAgentWitchLocalWsTrace(input.layout),
            })}`,
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
          await buildLocalAppShell({
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

      if (method === "GET" && pathname === "/projects") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const installBundle = buildInstallBundleStatus();
        const cloudAppOrigin = resolveAgentWitchLocalCloudAppOrigin(
          installBundle.installVersion,
        );
        const sync = await syncLocalProjectsFromCloud(input.layout);
        const flashMessage =
          url.searchParams.get("added") === "1" ? "Project added." : null;
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Projects",
            activePath: "/projects",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalProjectsPageBody({
              projects: readAgentWitchLocalProjectsRegistry(input.layout),
              cloudAppOrigin,
              syncMessage: sync.message,
              syncOk: sync.ok,
              flashMessage,
            }),
          }),
        );
        return;
      }

      if (method === "GET" && pathname === "/project") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const projectId = url.searchParams.get("id")?.trim() ?? "";
        const installBundle = buildInstallBundleStatus();
        await syncLocalProjectsFromCloud(input.layout);
        const project = findAgentWitchLocalProjectById(input.layout, projectId);
        if (project === null) {
          response.writeHead(404);
          response.end("Project not found");
          return;
        }
        const linkedFlash =
          url.searchParams.get("linked") === "1"
            ? `Harness linked (${url.searchParams.get("files") ?? "0"} file(s) written).`
            : null;
        sendHtml(
          response,
          await buildLocalAppShell({
            title: project.name,
            activePath: "/projects",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalProjectDetailPageBody({
              project,
              installed: readInstalledLocalHarnessSnapshot(input.layout),
              linkedSetSlugs: readAgentWitchProjectHarnessSetSlugs(
                project.projectFolderPath,
              ),
              flashMessage: linkedFlash,
            }),
          }),
        );
        return;
      }

      if (method === "POST" && pathname === "/projects/add") {
        const chosen = pickMacOsFolderDialog();
        if (chosen === null) {
          response.writeHead(303, { Location: "/projects" });
          response.end();
          return;
        }

        ensureAgentWitchProjectFolder({ projectFolderPath: chosen });
        addAgentWitchLocalProjectToRegistry(input.layout, {
          projectFolderPath: chosen,
        });
        response.writeHead(303, { Location: "/projects?added=1" });
        response.end();
        return;
      }

      if (method === "POST" && pathname === "/projects/link-harness") {
        const rawBody = await readBody(request);
        const form = new URLSearchParams(rawBody);
        const projectId = form.get("projectId")?.trim() ?? "";
        const project = findAgentWitchLocalProjectById(input.layout, projectId);
        if (project === null) {
          response.writeHead(404);
          response.end("Project not found");
          return;
        }

        const setSlugs = form.getAll("applySet").map((value) => String(value));
        const applyResult = applyInstalledHarnessSetsToProjectCursor({
          layout: input.layout,
          projectFolderPath: project.projectFolderPath,
          setSlugs,
        });

        if (!applyResult.ok) {
          const installBundle = buildInstallBundleStatus();
          sendHtml(
            response,
            await buildLocalAppShell({
              title: project.name,
              activePath: "/projects",
              installVersion: installBundle.installVersion,
              body: buildAgentWitchLocalProjectDetailPageBody({
                project,
                installed: readInstalledLocalHarnessSnapshot(input.layout),
                linkedSetSlugs: readAgentWitchProjectHarnessSetSlugs(
                  project.projectFolderPath,
                ),
                flashError: applyResult.errorMessage,
              }),
            }),
          );
          return;
        }

        response.writeHead(303, {
          Location: `/project?id=${encodeURIComponent(project.id)}&linked=1&files=${applyResult.writtenFileCount}`,
        });
        response.end();
        return;
      }

      if (method === "GET" && pathname === "/harness") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const installBundle = buildInstallBundleStatus();
        const reveal = readLocalHarnessRevealCache(input.layout);
        const justSubmitted = url.searchParams.get("submitted") === "1";
        const flashMessage = justSubmitted
          ? url.searchParams.get("syncFailed") === "1"
            ? `Local harness updated (${url.searchParams.get("count") ?? "0"} items). Cloud sync failed — check WS connection on Status.`
            : url.searchParams.get("synced") === "1"
              ? `Local harness updated and manifest reported to cloud (${url.searchParams.get("count") ?? "0"} items).`
              : "Local harness updated from your selection."
          : url.searchParams.get("stopped") === "1"
            ? `Reveal stopped. ${reveal?.sets.length ?? 0} set(s) saved — you can submit or scan again.`
            : url.searchParams.get("revealed") === "1"
              ? `Reveal found ${reveal?.sets.length ?? 0} set(s).`
              : null;
        const scanFolder =
          reveal?.scanRoots[0] ?? buildDefaultLocalHarnessScanFolder();
        const importSectionExpanded = resolveHarnessImportSectionExpanded(
          input.layout,
          {
            reveal,
            importQuery: url.searchParams.get("import") === "1",
            justSubmitted,
          },
        );
        const cloudAppOrigin = resolveAgentWitchLocalCloudAppOrigin(
          installBundle.installVersion,
        );
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Harness",
            activePath: "/harness",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalHarnessPageBody(
              buildHarnessPageBodyInput(input.layout, {
                cloudAppOrigin,
                reveal,
                scanFolder,
                flashMessage,
                importSectionExpanded,
              }),
            ),
          }),
        );
        return;
      }

      if (method === "POST" && pathname === "/api/harness/pick-folder") {
        const chosen = pickMacOsFolderDialog();
        if (chosen === null) {
          sendJson(response, 200, { cancelled: true });
          return;
        }
        sendJson(response, 200, { path: chosen });
        return;
      }

      if (method === "GET" && pathname === "/api/harness/file-content") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const filePath = url.searchParams.get("path")?.trim() ?? "";
        const safePath = assertReadableFileUnderHome(filePath);
        if (safePath === null) {
          sendJson(response, 404, {
            errorMessage:
              "File not found or not readable under your home folder.",
          });
          return;
        }

        try {
          const rawContent = fs.readFileSync(safePath, "utf8");
          const content =
            rawContent.length > LOCAL_HARNESS_FILE_PREVIEW_MAX_CHARS
              ? `${rawContent.slice(0, LOCAL_HARNESS_FILE_PREVIEW_MAX_CHARS)}\n… (truncated)`
              : rawContent;
          sendJson(response, 200, { content });
        } catch {
          sendJson(response, 500, { errorMessage: "Could not read file." });
        }
        return;
      }

      if (method === "POST" && pathname === "/api/harness/reveal/add-project") {
        const rawBody = await readBody(request);
        let projectPath = "";
        try {
          const parsed: unknown = JSON.parse(rawBody);
          if (
            typeof parsed === "object" &&
            parsed !== null &&
            typeof (parsed as { projectPath?: unknown }).projectPath ===
              "string"
          ) {
            projectPath = (
              parsed as { projectPath: string }
            ).projectPath.trim();
          }
        } catch {
          sendJson(response, 400, {
            ok: false,
            errorMessage: "Invalid JSON body.",
          });
          return;
        }

        if (projectPath.length === 0) {
          sendJson(response, 400, {
            ok: false,
            errorMessage: "projectPath is required.",
          });
          return;
        }

        const existing = readLocalHarnessRevealCache(input.layout);
        const merged = mergeLocalHarnessRevealWithCursorDir({
          reveal: existing,
          projectPath,
        });

        if (merged === null || merged.sets.length === 0) {
          sendJson(response, 400, {
            ok: false,
            errorMessage:
              "No .cursor folder with harness files found under that path.",
          });
          return;
        }

        writeLocalHarnessRevealCache(input.layout, merged);
        sendJson(response, 200, {
          ok: true,
          setCount: merged.sets.length,
        });
        return;
      }

      if (method === "GET" && pathname === "/api/harness/reveal/stream") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const scanRoot = url.searchParams.get("scanRoot")?.trim() ?? "";
        if (scanRoot.length === 0) {
          sendJson(response, 400, {
            errorMessage: "Choose a folder to scan first.",
          });
          return;
        }

        let aborted = false;
        request.on("close", () => {
          aborted = true;
        });

        response.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          ...LOCAL_APP_CORS_HEADERS,
        });

        const reveal = streamLocalHarnessReveal({
          scanRoot,
          response,
          shouldAbort: () => aborted,
        });
        writeLocalHarnessRevealCache(input.layout, reveal);
        response.end();
        return;
      }

      if (method === "POST" && pathname === "/harness/reveal") {
        response.writeHead(410, { "Content-Type": "text/plain" });
        response.end("Use GET /api/harness/reveal/stream with a scan folder.");
        return;
      }

      if (method === "POST" && pathname === "/harness/submit") {
        const reveal = readLocalHarnessRevealCache(input.layout);
        if (reveal === null) {
          const installBundle = buildInstallBundleStatus();
          const cloudAppOrigin = resolveAgentWitchLocalCloudAppOrigin(
            installBundle.installVersion,
          );
          sendHtml(
            response,
            await buildLocalAppShell({
              title: "Harness",
              activePath: "/harness",
              installVersion: installBundle.installVersion,
              body: buildAgentWitchLocalHarnessPageBody(
                buildHarnessPageBodyInput(input.layout, {
                  cloudAppOrigin,
                  reveal: null,
                  flashError: "Run reveal before submit.",
                  importSectionExpanded: true,
                }),
              ),
            }),
          );
          return;
        }

        const rawBody = await readBody(request);
        const form = new URLSearchParams(rawBody);
        const sets = parseHarnessSubmitFormBody(form, reveal);
        const result = submitLocalHarnessSelection({
          layout: input.layout,
          sets,
        });

        if (!result.ok) {
          const installBundle = buildInstallBundleStatus();
          const cloudAppOrigin = resolveAgentWitchLocalCloudAppOrigin(
            installBundle.installVersion,
          );
          sendHtml(
            response,
            await buildLocalAppShell({
              title: "Harness",
              activePath: "/harness",
              installVersion: installBundle.installVersion,
              body: buildAgentWitchLocalHarnessPageBody(
                buildHarnessPageBodyInput(input.layout, {
                  cloudAppOrigin,
                  reveal,
                  flashError: result.errorMessage ?? "Submit failed.",
                  importSectionExpanded: true,
                }),
              ),
            }),
          );
          return;
        }

        clearLocalHarnessRevealCache(input.layout);

        const syncResult =
          input.controllers.reportHarnessManifestIfConnected?.();
        const syncQuery =
          syncResult?.ok === true ? "&synced=1" : "&syncFailed=1";

        response.writeHead(303, {
          Location: `/harness?submitted=1&count=${result.writtenItemCount ?? 0}${syncQuery}`,
        });
        response.end();
        return;
      }

      if (method === "GET" && pathname === "/writer-api") {
        const url = new URL(
          request.url ?? "/",
          `http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}`,
        );
        const runConfig = readAgentWitchRunConfig();
        const writerExecutionBackend: WriterExecutionBackend =
          runConfig?.writerExecutionBackend ??
          resolveWriterExecutionBackend(undefined);
        const profileDir = resolveAgentWitchProfileDirFromConfigPath(
          input.layout.configPath,
        );
        const secrets = readWriterApiSecretsFile(profileDir);
        const flashMessage =
          url.searchParams.get("saved") === "1"
            ? "Writer API settings saved on this Mac."
            : null;
        const installBundle = buildInstallBundleStatus();
        sendHtml(
          response,
          await buildLocalAppShell({
            title: "Writer API",
            activePath: "/writer-api",
            installVersion: installBundle.installVersion,
            body: buildAgentWitchLocalWriterApiPageBody({
              writerExecutionBackend,
              secrets,
              flashMessage,
            }),
          }),
        );
        return;
      }

      if (method === "POST" && pathname === "/writer-api") {
        const rawBody = await readBody(request);
        const form = new URLSearchParams(rawBody);
        const backendRaw = form.get("writerExecutionBackend")?.trim() ?? "cli";
        applyWriterApiSettings({
          configPath: input.layout.configPath,
          writerExecutionBackend: resolveWriterExecutionBackend(backendRaw),
          anthropicApiKey: form.get("anthropicApiKey") ?? undefined,
          anthropicModel: form.get("anthropicModel") ?? undefined,
          openaiApiKey: form.get("openaiApiKey") ?? undefined,
          openaiModel: form.get("openaiModel") ?? undefined,
          googleApiKey: form.get("googleApiKey") ?? undefined,
          googleModel: form.get("googleModel") ?? undefined,
        });
        response.writeHead(303, { Location: "/writer-api?saved=1" });
        response.end();
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
          await buildLocalAppShell({
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
