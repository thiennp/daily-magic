import { installHarnessFromWakeServer } from "../../../../../adapters/legacyScripts";
import { sendJson } from "../../../../server/features/http-server/internal/bridgeHttp.util";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";

const readHarnessBody = async (
  ctx: BridgeRequestContext,
): Promise<unknown | null> => {
  const chunks: Buffer[] = [];
  for await (const chunk of ctx.request) {
    chunks.push(Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    sendJson(
      ctx.response,
      400,
      {
        ok: false,
        errorMessage: "Invalid JSON body.",
      },
      ctx.cors.headers,
    );
    return null;
  }
};

export const tryHandleHarnessProxyRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (
    ctx.request.method === "POST" &&
    (ctx.pathname === "/harness/install" || ctx.pathname === "/harness/borrow")
  ) {
    const body = await readHarnessBody(ctx);
    if (body === null) {
      return true;
    }

    const installResult = installHarnessFromWakeServer(body);
    sendJson(
      ctx.response,
      installResult.ok ? 200 : 400,
      installResult,
      ctx.cors.headers,
    );
    return true;
  }

  return false;
};
