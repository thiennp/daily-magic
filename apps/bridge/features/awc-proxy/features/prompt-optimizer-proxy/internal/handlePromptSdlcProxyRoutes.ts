import {
  probeLocalRunClis,
  requestOllamaChat,
  resolveWriterCliCommands,
} from "../../../../../adapters/promptSdlcProxy";
import { sendJson } from "../../../../server/features/http-server/public-api/infrastructure";
import type { BridgeRequestContext } from "../../../../server/internal/bridgeRequestContext.type";
import { buildPromptSdlcLocalModelCatalog } from "./buildPromptSdlcLocalModelCatalog";

const readJsonBody = async (
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
      { ok: false, errorMessage: "Invalid JSON body." },
      ctx.cors.headers,
    );
    return null;
  }
};

export const tryHandlePromptSdlcProxyRoutes = async (
  ctx: BridgeRequestContext,
): Promise<boolean> => {
  if (ctx.request.method === "GET" && ctx.pathname === "/prompt-optimizer/models") {
    const probe = await probeLocalRunClis({
      commands: resolveWriterCliCommands({}),
    });
    sendJson(
      ctx.response,
      200,
      {
        ok: true,
        ...buildPromptSdlcLocalModelCatalog({
          installedWriterIds: probe.installedWriterIds,
          ollamaModels: probe.ollamaModels,
        }),
      },
      ctx.cors.headers,
    );
    return true;
  }

  if (ctx.request.method === "POST" && ctx.pathname === "/prompt-optimizer/chat") {
    const body = await readJsonBody(ctx);
    if (body === null) {
      return true;
    }

    const model =
      typeof body === "object" &&
      body !== null &&
      "model" in body &&
      typeof body.model === "string"
        ? body.model
        : "";
    const prompt =
      typeof body === "object" &&
      body !== null &&
      "prompt" in body &&
      typeof body.prompt === "string"
        ? body.prompt
        : "";
    const text = await requestOllamaChat({ model, prompt });
    if (text === null) {
      sendJson(
        ctx.response,
        502,
        { ok: false, errorMessage: "Ollama did not reply." },
        ctx.cors.headers,
      );
      return true;
    }

    sendJson(ctx.response, 200, { ok: true, text }, ctx.cors.headers);
    return true;
  }

  return false;
};
