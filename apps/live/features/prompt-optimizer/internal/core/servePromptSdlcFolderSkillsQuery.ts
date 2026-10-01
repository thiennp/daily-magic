import { queryPromptSdlcFolderSkills } from "./queryPromptSdlcFolderSkills";

export const servePromptSdlcFolderSkillsQuery = (input: {
  readonly method: string;
  readonly rawBody: string;
}): { readonly status: number; readonly body: unknown } => {
  if (input.method !== "POST") {
    return { status: 405, body: { ok: false, error: "Use POST." } };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input.rawBody.length === 0 ? "{}" : input.rawBody);
  } catch {
    return {
      status: 400,
      body: { ok: false, error: "Body must be JSON." },
    };
  }

  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      status: 400,
      body: { ok: false, error: "Body must be a JSON object." },
    };
  }

  const body = parsed as Record<string, unknown>;
  const workingDirectory =
    typeof body.workingDirectory === "string"
      ? body.workingDirectory.trim()
      : "";
  const query = typeof body.query === "string" ? body.query : "";
  const limit =
    typeof body.limit === "number"
      ? body.limit
      : typeof body.limit === "string" && body.limit.trim().length > 0
        ? Number(body.limit)
        : undefined;

  if (workingDirectory.length === 0) {
    return {
      status: 400,
      body: {
        ok: false,
        error: "workingDirectory is required (folder with .cursor/skills).",
      },
    };
  }
  if (typeof query !== "string" || query.trim().length === 0) {
    return {
      status: 400,
      body: { ok: false, error: "query is required." },
    };
  }

  const result = queryPromptSdlcFolderSkills({
    workingDirectory,
    query,
    limit: Number.isFinite(limit) ? limit : undefined,
  });
  return { status: 200, body: result };
};
