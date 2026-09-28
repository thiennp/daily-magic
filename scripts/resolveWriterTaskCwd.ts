import expandAgentWitchProjectFolderPath from "./expandAgentWitchProjectFolderPath";

export const resolveWriterTaskCwd = (input: {
  readonly workspace: string;
  readonly projectFolderPath?: string;
}): string => {
  const trimmed = input.projectFolderPath?.trim() ?? "";
  if (trimmed.length === 0) {
    return input.workspace;
  }

  return expandAgentWitchProjectFolderPath(trimmed);
};
