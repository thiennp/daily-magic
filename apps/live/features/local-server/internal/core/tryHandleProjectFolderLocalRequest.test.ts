import type http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  PROJECT_FOLDER_LOCAL_PATH,
  tryHandleProjectFolderLocalRequest,
  type ProjectFolderLocalRouteInput,
} from "./tryHandleProjectFolderLocalRequest";

const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pf-route-"));

const run = async (input: {
  method: string;
  origin?: string;
  body?: string;
  link?: ReturnType<typeof vi.fn>;
}) => {
  const sendJson = vi.fn();
  const handled = await tryHandleProjectFolderLocalRequest({
    method: input.method,
    pathname: PROJECT_FOLDER_LOCAL_PATH,
    request: {
      headers: {
        host: "127.0.0.1:49152",
        ...(input.origin !== undefined ? { origin: input.origin } : {}),
      },
    } as unknown as http.IncomingMessage,
    response: {} as http.ServerResponse,
    profileDir,
    readCloudConfig: () => null,
    readBody: async () => input.body ?? "",
    sendJson,
    ...(input.link !== undefined
      ? { link: input.link as unknown as ProjectFolderLocalRouteInput["link"] }
      : {}),
  });
  return {
    handled,
    status: sendJson.mock.calls[0]?.[1],
    payload: sendJson.mock.calls[0]?.[2],
  };
};

describe("tryHandleProjectFolderLocalRequest", () => {
  it("GET reports linked folders in plain words", async () => {
    const result = await run({ method: "GET" });
    expect(result).toMatchObject({
      handled: true,
      status: 200,
      payload: {
        ok: true,
        summary: "No project folder linked on this computer yet.",
        folders: [],
      },
    });
  });

  it("refuses a POST from another website", async () => {
    const link = vi.fn();
    const result = await run({
      method: "POST",
      origin: "https://evil.example",
      body: JSON.stringify({ projectId: "p1", folderPath: "/tmp" }),
      link,
    });
    expect(result.status).toBe(403);
    expect(link).not.toHaveBeenCalled();
  });

  it("POST links with the parsed body and maps refusals to status codes", async () => {
    const link = vi.fn().mockResolvedValue({
      ok: false,
      httpStatus: 400,
      code: "folder_not_found",
      message: "That folder does not exist on this computer.",
    });
    const result = await run({
      method: "POST",
      body: JSON.stringify({
        projectId: "p1",
        folderPath: "~/x",
        allowOutsideHome: true,
      }),
      link,
    });
    expect(link).toHaveBeenCalledWith({
      projectId: "p1",
      folderPath: "~/x",
      allowOutsideHome: true,
      profileDir,
      cloudConfig: null,
    });
    expect(result).toMatchObject({
      status: 400,
      payload: { ok: false, error: "folder_not_found" },
    });
  });

  it("POST rejects a malformed body", async () => {
    const result = await run({ method: "POST", body: "{" });
    expect(result.status).toBe(400);
  });
});
