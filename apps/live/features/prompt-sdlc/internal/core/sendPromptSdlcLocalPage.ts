import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const sendPromptSdlcLocalPage = async (
  input: PromptSdlcLocalRouteInput,
  body: Parameters<typeof buildPromptSdlcLocalPageBody>[0],
): Promise<void> => {
  input.sendHtml(
    input.response,
    await input.renderShell({
      title: "Prompt SDLC",
      activePath: "/prompt-sdlc",
      body: buildPromptSdlcLocalPageBody(body),
    }),
  );
};
