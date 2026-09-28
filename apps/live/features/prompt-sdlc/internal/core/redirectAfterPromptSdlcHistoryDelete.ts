import { deletePromptSdlcLocalCycle } from "./promptSdlcLocalStore";

export const redirectAfterPromptSdlcHistoryDelete = (input: {
  readonly posted: URLSearchParams | null;
  readonly storePath: string;
  readonly openCycleId: string | null;
}): string | null => {
  if (input.posted?.get("intent") !== "delete-history") {
    return null;
  }

  const cycleId = input.posted.get("cycleId") ?? "";
  deletePromptSdlcLocalCycle(input.storePath, cycleId);
  const openCycleId = input.openCycleId ?? input.posted.get("openCycleId");
  if (
    openCycleId === null ||
    openCycleId.length === 0 ||
    openCycleId === cycleId
  ) {
    return "/prompt-sdlc";
  }

  return `/prompt-sdlc?cycle=${encodeURIComponent(openCycleId)}`;
};
