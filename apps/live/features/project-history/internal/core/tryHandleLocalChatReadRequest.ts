import type http from "node:http";

import { loadNodeSqlite } from "@agent-witch/live-token-saver";

import { getLocalChatMessage } from "./getLocalChatMessage";
import { isValidProjectComputerHistoryProjectId } from "./isValidProjectComputerHistoryProjectId";
import { listLocalChatIndexPage } from "./listLocalChatIndexPage";
import { listLocalChatThreadKeys } from "./listLocalChatThreadKeys";

export interface LocalChatReadRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly requestUrl: string;
  readonly response: http.ServerResponse;
  readonly sendJson: (
    response: http.ServerResponse,
    statusCode: number,
    payload: unknown,
  ) => void;
}

/** GET /api/local/projects/:projectId/chats */
const CHATS_LIST_RE =
  /^\/api\/local\/projects\/([^/]+)\/chats$/;
/** GET /api/local/projects/:projectId/chats/:threadKey/messages */
const CHAT_MESSAGES_RE =
  /^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/;

const parseLimit = (raw: string | null): number | undefined => {
  if (raw === null || raw === "") {
    return undefined;
  }
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Thin S13 local read stubs — list threads + page messages from the index.
 * Returns 503 when sqlite is unavailable (reads still attempt file fallback
 * for message pages; chats list may be empty).
 */
export const tryHandleLocalChatReadRequest = (
  input: LocalChatReadRouteInput,
): boolean => {
  const chatsMatch = CHATS_LIST_RE.exec(input.pathname);
  if (chatsMatch !== null) {
    if (input.method !== "GET") {
      input.sendJson(input.response, 405, { ok: false, error: "method_not_allowed" });
      return true;
    }
    const projectId = decodeURIComponent(chatsMatch[1] ?? "");
    if (!isValidProjectComputerHistoryProjectId(projectId)) {
      input.sendJson(input.response, 400, { ok: false, error: "invalid_project_id" });
      return true;
    }
    const sqlite = loadNodeSqlite();
    const listed = listLocalChatThreadKeys({ projectId });
    if (!sqlite.ok) {
      input.sendJson(input.response, 503, {
        ok: false,
        error: "index_unavailable",
        reason: sqlite.reason,
        threadKeys: listed.threadKeys,
      });
      return true;
    }
    input.sendJson(input.response, 200, {
      ok: true,
      projectId,
      threadKeys: listed.threadKeys,
    });
    return true;
  }

  const messagesMatch = CHAT_MESSAGES_RE.exec(input.pathname);
  if (messagesMatch !== null) {
    if (input.method !== "GET") {
      input.sendJson(input.response, 405, { ok: false, error: "method_not_allowed" });
      return true;
    }
    const projectId = decodeURIComponent(messagesMatch[1] ?? "");
    const threadKey = decodeURIComponent(messagesMatch[2] ?? "");
    if (!isValidProjectComputerHistoryProjectId(projectId) || threadKey.length === 0) {
      input.sendJson(input.response, 400, { ok: false, error: "invalid_path" });
      return true;
    }
    const query = new URL(input.requestUrl, "http://127.0.0.1").searchParams;
    const before = query.get("before");
    const beforeMessageId = query.get("beforeMessageId");
    const limit = parseLimit(query.get("limit"));
    const sqlite = loadNodeSqlite();
    const page = listLocalChatIndexPage({
      projectId,
      threadKey,
      beforeCreatedAt: before,
      beforeMessageId,
      limit,
    });
    const messages = page.rows.map((row) => {
      const body = getLocalChatMessage({
        projectId,
        messageId: row.messageId,
      });
      return {
        messageId: row.messageId,
        threadKey: row.threadKey,
        createdAt: row.createdAt,
        savedAt: row.savedAt,
        message: body?.message ?? null,
      };
    });
    if (!sqlite.ok) {
      input.sendJson(input.response, 503, {
        ok: false,
        error: "index_unavailable",
        reason: sqlite.reason,
        projectId,
        threadKey,
        messages,
      });
      return true;
    }
    input.sendJson(input.response, 200, {
      ok: true,
      projectId,
      threadKey,
      messages,
    });
    return true;
  }

  return false;
};
