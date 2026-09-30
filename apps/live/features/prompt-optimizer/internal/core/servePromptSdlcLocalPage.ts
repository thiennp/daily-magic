import {
  acceptPromptSdlcLocalSkillPost,
  readPromptSdlcSkillNotice,
} from "./acceptPromptSdlcLocalSkillPost";
import { tryAcceptPromptSdlcWizardPost } from "./acceptPromptSdlcWizardPost";
import { answerPromptSdlcLocalManual } from "./answerPromptSdlcLocalManual";
import { presentPromptSdlcLocalComposer } from "./presentPromptSdlcLocalComposer";
import { redirectAfterPromptSdlcHistoryDelete } from "./redirectAfterPromptSdlcHistoryDelete";
import {
  describePromptSdlcLocalModels,
  readPromptSdlcLocalExampleFields,
} from "./promptSdlcLocalForm";
import { parsePromptSdlcLocalPostedBody } from "./parsePromptSdlcLocalPostedBody";
import { readPromptSdlcInstalledWriters } from "./runPromptSdlcLocalCycle";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const servePromptSdlcLocalPage = async (
  input: PromptSdlcLocalRouteInput,
): Promise<void> => {
  const url = new URL(input.requestUrl, "http://127.0.0.1");
  const installedIds = await readPromptSdlcInstalledWriters();
  const selection = describePromptSdlcLocalModels(installedIds);
  const posted =
    input.method === "POST"
      ? parsePromptSdlcLocalPostedBody(
          input.request.headers["content-type"],
          await input.readBody(input.request),
        )
      : null;
  if (
    tryAcceptPromptSdlcWizardPost({
      posted,
      storePath: input.storePath,
      response: input.response,
    })
  ) {
    return;
  }

  if (await answerPromptSdlcLocalManual(input, posted, selection)) {
    return;
  }

  const filled = readPromptSdlcLocalExampleFields(
    url.searchParams.get("example"),
  );
  const deletedTo = redirectAfterPromptSdlcHistoryDelete({
    posted,
    storePath: input.storePath,
    openCycleId: url.searchParams.get("cycle"),
  });
  if (deletedTo !== null) {
    input.response.writeHead(303, { Location: deletedTo });
    input.response.end();
    return;
  }

  const skill = acceptPromptSdlcLocalSkillPost({
    posted,
    storePath: input.storePath,
  });
  if (skill.kind === "redirect") {
    input.response.writeHead(303, { Location: skill.location });
    input.response.end();
    return;
  }

  await presentPromptSdlcLocalComposer({
    route: input,
    posted,
    installedIds,
    selection,
    goal: posted?.get("goal") ?? filled.goal,
    prompt: posted?.get("prompt") ?? filled.prompt,
    skillNotice: readPromptSdlcSkillNotice(url.searchParams),
    cycleId: url.searchParams.get("cycle"),
  });
};
