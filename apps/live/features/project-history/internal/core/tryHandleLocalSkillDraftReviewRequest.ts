import type http from "node:http";

import { buildAgentWitchLocalSkillDraftReviewPage } from "./buildAgentWitchLocalSkillDraftReviewPage";
import { discardProjectHistorySkillgenDraftForReview } from "./discardProjectHistorySkillgenDraftForReview";
import { isValidProjectComputerHistoryProjectId } from "./isValidProjectComputerHistoryProjectId";
import {
  listProjectHistorySkillgenDraftsForReview,
  readProjectHistorySkillgenDraftForReview,
} from "./listProjectHistorySkillgenDraftsForReview";
import { publishProjectHistorySkillgenDraftForReview } from "./publishProjectHistorySkillgenDraftForReview";
import { saveProjectHistorySkillgenDraftForReview } from "./saveProjectHistorySkillgenDraftForReview";

export type LocalSkillDraftReviewRouteInput = {
  readonly method: string;
  readonly pathname: string;
  readonly requestUrl: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly online: boolean;
  readonly resolveProjectName: (projectId: string) => string | null;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendHtml: (response: http.ServerResponse, html: string) => void;
  readonly sendJson: (
    response: http.ServerResponse,
    statusCode: number,
    payload: unknown,
  ) => void;
};

const PAGE_RE = /^\/project\/skill-drafts$/;
const LIST_RE = /^\/api\/local\/projects\/([^/]+)\/skill-drafts$/;
const ITEM_RE = /^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)$/;
const PUBLISH_RE =
  /^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)\/publish$/;

const parseJson = async (
  input: LocalSkillDraftReviewRouteInput,
): Promise<Record<string, unknown>> => {
  const raw = await input.readBody(input.request);
  if (!raw.trim()) return {};
  const parsed: unknown = JSON.parse(raw);
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("invalid_json");
  }
  return parsed as Record<string, unknown>;
};

const mapError = (error: unknown): { status: number; code: string } => {
  const code = error instanceof Error ? error.message : "error";
  if (code === "draft_not_found") return { status: 404, code };
  if (
    code === "invalid_draft_id" ||
    code === "invalid_project_id" ||
    code === "draft_incomplete" ||
    code === "invalid_project_skill_id" ||
    code === "invalid_json"
  ) {
    return { status: 400, code };
  }
  return { status: 500, code: "error" };
};

/**
 * Local skill draft review page + JSON API over `skills/_drafts`.
 * GET /project/skill-drafts?projectId=
 * GET/PUT/DELETE /api/local/projects/:id/skill-drafts[/:draftId]
 * POST .../publish
 */
export const tryHandleLocalSkillDraftReviewRequest = async (
  input: LocalSkillDraftReviewRouteInput,
): Promise<boolean> => {
  if (PAGE_RE.test(input.pathname)) {
    if (input.method !== "GET") {
      input.response.writeHead(405);
      input.response.end();
      return true;
    }
    const url = new URL(input.requestUrl, "http://127.0.0.1");
    const projectId = url.searchParams.get("projectId") ?? "";
    if (!isValidProjectComputerHistoryProjectId(projectId)) {
      input.sendJson(input.response, 400, {
        ok: false,
        error: "invalid_project_id",
      });
      return true;
    }
    let drafts: ReturnType<typeof listProjectHistorySkillgenDraftsForReview> =
      [];
    try {
      drafts = listProjectHistorySkillgenDraftsForReview(projectId);
    } catch {
      drafts = [];
    }
    const projectName =
      input.resolveProjectName(projectId) ?? projectId.slice(0, 8);
    input.sendHtml(
      input.response,
      buildAgentWitchLocalSkillDraftReviewPage({
        projectId,
        projectName,
        online: input.online,
        drafts,
      }),
    );
    return true;
  }

  const publishMatch = PUBLISH_RE.exec(input.pathname);
  if (publishMatch !== null) {
    if (input.method !== "POST") {
      input.sendJson(input.response, 405, {
        ok: false,
        error: "method_not_allowed",
      });
      return true;
    }
    const projectId = decodeURIComponent(publishMatch[1] ?? "");
    const draftId = decodeURIComponent(publishMatch[2] ?? "");
    if (!isValidProjectComputerHistoryProjectId(projectId)) {
      input.sendJson(input.response, 400, {
        ok: false,
        error: "invalid_project_id",
      });
      return true;
    }
    try {
      const body = await parseJson(input);
      const result = publishProjectHistorySkillgenDraftForReview({
        projectId,
        draftId,
        title: typeof body.title === "string" ? body.title : undefined,
        body: typeof body.body === "string" ? body.body : undefined,
      });
      input.sendJson(input.response, 200, { ok: true, ...result });
    } catch (error) {
      const mapped = mapError(error);
      input.sendJson(input.response, mapped.status, {
        ok: false,
        error: mapped.code,
      });
    }
    return true;
  }

  const itemMatch = ITEM_RE.exec(input.pathname);
  if (itemMatch !== null) {
    const projectId = decodeURIComponent(itemMatch[1] ?? "");
    const draftId = decodeURIComponent(itemMatch[2] ?? "");
    if (!isValidProjectComputerHistoryProjectId(projectId)) {
      input.sendJson(input.response, 400, {
        ok: false,
        error: "invalid_project_id",
      });
      return true;
    }
    try {
      if (input.method === "GET") {
        const draft = readProjectHistorySkillgenDraftForReview(
          projectId,
          draftId,
        );
        if (draft === null) {
          input.sendJson(input.response, 404, {
            ok: false,
            error: "draft_not_found",
          });
          return true;
        }
        input.sendJson(input.response, 200, { ok: true, draft });
        return true;
      }
      if (input.method === "PUT") {
        const body = await parseJson(input);
        const draft = saveProjectHistorySkillgenDraftForReview({
          projectId,
          draftId,
          title: typeof body.title === "string" ? body.title : "",
          body: typeof body.body === "string" ? body.body : "",
          tags: Array.isArray(body.tags)
            ? body.tags.filter((t): t is string => typeof t === "string")
            : undefined,
        });
        input.sendJson(input.response, 200, { ok: true, draft });
        return true;
      }
      if (input.method === "DELETE") {
        discardProjectHistorySkillgenDraftForReview({ projectId, draftId });
        input.sendJson(input.response, 200, { ok: true });
        return true;
      }
      input.sendJson(input.response, 405, {
        ok: false,
        error: "method_not_allowed",
      });
    } catch (error) {
      const mapped = mapError(error);
      input.sendJson(input.response, mapped.status, {
        ok: false,
        error: mapped.code,
      });
    }
    return true;
  }

  const listMatch = LIST_RE.exec(input.pathname);
  if (listMatch !== null) {
    if (input.method !== "GET") {
      input.sendJson(input.response, 405, {
        ok: false,
        error: "method_not_allowed",
      });
      return true;
    }
    const projectId = decodeURIComponent(listMatch[1] ?? "");
    if (!isValidProjectComputerHistoryProjectId(projectId)) {
      input.sendJson(input.response, 400, {
        ok: false,
        error: "invalid_project_id",
      });
      return true;
    }
    try {
      const drafts = listProjectHistorySkillgenDraftsForReview(projectId);
      input.sendJson(input.response, 200, { ok: true, projectId, drafts });
    } catch {
      input.sendJson(input.response, 500, {
        ok: false,
        error: "could_not_read_drafts",
      });
    }
    return true;
  }

  return false;
};
