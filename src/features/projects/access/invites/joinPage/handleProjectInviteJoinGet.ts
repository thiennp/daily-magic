import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  hashAgentAccessClientIp,
  readClientIp,
} from "@/lib/agentAccess/readClientIp";
import { PROJECT_INVITE_JOIN_JSON_SUFFIX } from "@/lib/projects/acl/invites/projectInviteJoinPath.constant";
import { readProjectInviteJoinState } from "@/lib/projects/acl/invites/readProjectInviteJoinState";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import {
  PROJECT_INVITE_JOIN_PAGE_COPY as COPY,
  PROJECT_INVITE_JOIN_PAGE_PER_HOUR,
  PROJECT_INVITE_JOIN_PAGE_RATE_BUCKET,
} from "@/features/projects/access/invites/joinPage/projectInviteJoinPageCopy.constant";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";

const PUBLIC_HEADERS = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
  "Referrer-Policy": "no-referrer",
  Vary: "Accept",
} as const;

const safeDecode = (raw: string): string => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const parseJoinRequest = (request: Request, rawToken: string) => {
  const decoded = safeDecode(rawToken ?? "").trim();
  const hasSuffix = decoded.endsWith(PROJECT_INVITE_JOIN_JSON_SUFFIX);
  const token = hasSuffix
    ? decoded.slice(0, -PROJECT_INVITE_JOIN_JSON_SUFFIX.length)
    : decoded;
  const accept = request.headers.get("accept") ?? "";
  return { token, wantsJson: hasSuffix || accept.includes("application/json") };
};

const respond = (
  status: number,
  wantsJson: boolean,
  body: { readonly markdown: string; readonly json: unknown },
): Response =>
  wantsJson
    ? Response.json(body.json, { status, headers: PUBLIC_HEADERS })
    : new Response(body.markdown, {
        status,
        headers: {
          ...PUBLIC_HEADERS,
          "Content-Type": "text/markdown; charset=utf-8",
        },
      });

const respondError = (
  status: number,
  wantsJson: boolean,
  code: string,
  message: string,
): Response =>
  respond(status, wantsJson, {
    markdown: `${message}\n`,
    json: { ok: false, code, error: message },
  });

/**
 * GET /join/<inviteToken> — public, no session, read-only. Rate-limited per IP.
 * Never redeems or mutates the invite; 404 unknown, 410 revoked/expired/used up.
 */
export const handleProjectInviteJoinGet = async (
  request: Request,
  rawToken: string,
): Promise<Response> => {
  const { token, wantsJson } = parseJoinRequest(request, rawToken);
  const allowed = await consumeAgentAccessBucket({
    subjectHash: hashAgentAccessClientIp(readClientIp(request)),
    bucket: PROJECT_INVITE_JOIN_PAGE_RATE_BUCKET,
    limit: PROJECT_INVITE_JOIN_PAGE_PER_HOUR,
  });
  if (!allowed) {
    return respondError(429, wantsJson, "rate_limited", COPY.rateLimited);
  }
  const state = await readProjectInviteJoinState(token);
  if (state.kind === "unknown") {
    return respondError(404, wantsJson, "not_found", COPY.notFound);
  }
  if (state.kind === "gone") {
    return respondError(410, wantsJson, "invite_gone", COPY.gone);
  }
  const page = buildProjectInviteJoinPage({
    token,
    projectId: state.projectId,
    projectName: state.projectName?.replace(/\s+/g, " ") ?? null,
    autoApprove: state.autoApprove,
  });
  return respond(200, wantsJson, {
    markdown: renderProjectInviteJoinPageMarkdown(page),
    json: page,
  });
};
