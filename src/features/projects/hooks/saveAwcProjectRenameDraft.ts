import patchUserProjectName from "@/features/projects/utils/patchUserProjectName";

export type SaveAwcProjectRenameDraftResult =
  | { readonly kind: "validation"; readonly message: string }
  | { readonly kind: "unchanged" }
  | { readonly kind: "saved"; readonly name: string }
  | { readonly kind: "error"; readonly message: string };

const saveAwcProjectRenameDraft = async (input: {
  readonly projectId: string;
  readonly draft: string;
  readonly currentName: string;
}): Promise<SaveAwcProjectRenameDraftResult> => {
  const trimmed = input.draft.trim();
  if (trimmed.length === 0) {
    return { kind: "validation", message: "Enter a project name." };
  }

  if (trimmed === input.currentName) {
    return { kind: "unchanged" };
  }

  const result = await patchUserProjectName(input.projectId, trimmed);
  if (result.kind === "error") {
    return { kind: "error", message: result.message };
  }

  return { kind: "saved", name: result.name };
};

export default saveAwcProjectRenameDraft;
