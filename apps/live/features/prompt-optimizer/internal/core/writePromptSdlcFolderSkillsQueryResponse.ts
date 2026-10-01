import { servePromptSdlcFolderSkillsQuery } from "./servePromptSdlcFolderSkillsQuery";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const writePromptSdlcFolderSkillsQueryResponse = async (
  input: PromptSdlcLocalRouteInput,
): Promise<void> => {
  const result = servePromptSdlcFolderSkillsQuery({
    method: input.method,
    rawBody: input.method === "POST" ? await input.readBody(input.request) : "",
  });
  input.response.writeHead(result.status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  input.response.end(JSON.stringify(result.body));
};
