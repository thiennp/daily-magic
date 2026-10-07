import type http from "node:http";

import {
  describeLinkedProjectFolders,
  linkAgentWitchProjectFolder,
  type AgentWitchCloudApiConfig,
} from "@agent-witch/live-projects";

import { isCodingToolsPauseOriginAllowed } from "./tryHandleCodingToolsPauseLocalRequest";

/** GET = linked folders on this computer; POST `{ projectId, folderPath, allowOutsideHome? }` = link. */
export const PROJECT_FOLDER_LOCAL_PATH = "/api/local/projects/folder";

export interface ProjectFolderLocalRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly profileDir: string;
  readonly readCloudConfig: () => AgentWitchCloudApiConfig | null;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendJson: (
    response: http.ServerResponse,
    statusCode: number,
    payload: unknown,
  ) => void;
  readonly link?: typeof linkAgentWitchProjectFolder;
}

const parseLinkBody = (
  raw: string,
): {
  readonly projectId: string;
  readonly folderPath: string;
  readonly allowOutsideHome: boolean;
} | null => {
  try {
    const body = JSON.parse(raw) as Record<string, unknown> | null;
    if (
      typeof body?.projectId !== "string" ||
      typeof body.folderPath !== "string"
    ) {
      return null;
    }
    return {
      projectId: body.projectId,
      folderPath: body.folderPath,
      allowOutsideHome: body.allowOutsideHome === true,
    };
  } catch {
    return null;
  }
};

export const tryHandleProjectFolderLocalRequest = async (
  input: ProjectFolderLocalRouteInput,
): Promise<boolean> => {
  if (input.pathname !== PROJECT_FOLDER_LOCAL_PATH) {
    return false;
  }
  if (input.method === "GET") {
    input.sendJson(input.response, 200, {
      ok: true,
      ...describeLinkedProjectFolders(input.profileDir),
    });
    return true;
  }
  if (input.method !== "POST") {
    input.sendJson(input.response, 405, {
      ok: false,
      error: "method_not_allowed",
    });
    return true;
  }
  // Local app answers CORS `*`: only same-machine callers (no Origin) or the
  // AWL page itself may link a folder.
  const origin = input.request.headers.origin;
  const host = input.request.headers.host;
  if (
    !isCodingToolsPauseOriginAllowed(
      typeof origin === "string" ? origin : undefined,
      typeof host === "string" ? host : undefined,
    )
  ) {
    input.sendJson(input.response, 403, {
      ok: false,
      error: "forbidden_origin",
    });
    return true;
  }
  const body = parseLinkBody(await input.readBody(input.request));
  if (body === null) {
    input.sendJson(input.response, 400, {
      ok: false,
      error: "invalid_body",
      message: "Send projectId and folderPath.",
    });
    return true;
  }
  const link = input.link ?? linkAgentWitchProjectFolder;
  const result = await link({
    ...body,
    profileDir: input.profileDir,
    cloudConfig: input.readCloudConfig(),
  });
  if (result.ok) {
    input.sendJson(input.response, 200, result);
    return true;
  }
  input.sendJson(input.response, result.httpStatus, {
    ok: false,
    error: result.code,
    message: result.message,
  });
  return true;
};
