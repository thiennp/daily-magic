import type http from "node:http";

export const readJsonBody = async (
  request: http.IncomingMessage,
): Promise<unknown> => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    return {};
  }
};

export const sendJson = (
  response: http.ServerResponse,
  statusCode: number,
  payload: unknown,
  corsHeaders: Record<string, string>,
): void => {
  response.writeHead(statusCode, corsHeaders);
  response.end(JSON.stringify(payload));
};

export const rejectOrigin = (response: http.ServerResponse): void => {
  response.writeHead(403);
  response.end();
};

export const parsePathname = (request: http.IncomingMessage): string =>
  request.url?.split("?")[0] ?? "/";

export const parseQueryLimit = (
  request: http.IncomingMessage,
  defaultPath: string,
  defaultLimit = 20,
  maxLimit = 200,
): number => {
  const requestUrl = new URL(request.url ?? defaultPath, "http://127.0.0.1");
  const limit = Number.parseInt(
    requestUrl.searchParams.get("limit") ?? String(defaultLimit),
    10,
  );
  return Number.isFinite(limit) && limit > 0
    ? Math.min(limit, maxLimit)
    : defaultLimit;
};
