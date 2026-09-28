import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";
import { selectPromptSdlcBestPrompt } from "../../../../adapters/promptSdlcAwcCore";
import { readPromptSdlcLocalCycle } from "./promptSdlcLocalStore";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";
import { writePromptSdlcLocalSkill } from "./writePromptSdlcLocalSkill";

const SAVED_SKILL_PATH = /^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/;

export const readPromptSdlcSkillNotice = (
  params: URLSearchParams,
): string | null => {
  const saved = params.get("savedSkill");
  if (saved !== null && SAVED_SKILL_PATH.test(saved)) {
    return `Saved the best prompt to ${saved} in the selected folder.`;
  }
  if (params.get("skillError") === "working") {
    return "The run is still working.";
  }
  if (params.get("skillError") === "missing") {
    return "That run is not on this Mac.";
  }
  if (params.get("skillError") === "empty") {
    return "This run has no scored prompt to save.";
  }
  if (params.get("skillError") === "folder") {
    return "The selected folder is not on this Mac.";
  }
  if (params.get("skillError") === "name") {
    return "Use a name with letters or numbers.";
  }
  if (params.get("skillError") === "prompt") {
    return "Enter the prompt to save.";
  }
  if (params.get("skillError") === "overwrite") {
    return "That skill file already exists. Check Replace, then save again.";
  }
  return null;
};

export const acceptPromptSdlcLocalSkillPost = (input: {
  readonly posted: URLSearchParams | null;
  readonly storePath: string;
}):
  | { readonly kind: "ignored" }
  | { readonly kind: "redirect"; readonly location: string } => {
  if (input.posted?.get("intent") !== "save-skill") {
    return { kind: "ignored" };
  }

  const cycleId = input.posted.get("cycleId") ?? "";
  const cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
  const back = (query: string): string =>
    `/prompt-sdlc?cycle=${encodeURIComponent(cycleId)}&${query}`;
  if (cycle === null) {
    return { kind: "redirect", location: "/prompt-sdlc?skillError=missing" };
  }
  if (!isPromptSdlcTerminalStatus(cycle.status)) {
    return { kind: "redirect", location: back("skillError=working") };
  }

  const best = selectPromptSdlcBestPrompt(
    cycle.revisions.map((revision) => ({
      roundNumber: revision.roundNumber,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? null,
      reasons: revision.judgement?.reasons ?? null,
    })),
  );
  if (
    best === null ||
    describePromptSdlcWriterTerminalFailure(best.promptText) !== null
  ) {
    return { kind: "redirect", location: back("skillError=empty") };
  }

  const written = writePromptSdlcLocalSkill({
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    name: input.posted.get("skillName") ?? cycle.sourceSkill?.name ?? "",
    description:
      input.posted.get("skillDescription") ??
      cycle.sourceSkill?.description ??
      "",
    promptText: input.posted.get("skillPrompt") ?? "",
    fileName:
      input.posted.get("skillFileName") ?? cycle.sourceSkill?.fileName ?? "",
    overwrite: input.posted.get("skillOverwrite") === "yes",
  });
  if (!written.ok) {
    const code = written.errorCode === "path" ? "folder" : written.errorCode;
    return { kind: "redirect", location: back(`skillError=${code}`) };
  }

  return {
    kind: "redirect",
    location: back(`savedSkill=${encodeURIComponent(written.relativePath)}`),
  };
};
