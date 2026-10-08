import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

/** a9788f04: a plain text input that asks for the project's folder. */
export const isProjectFolderTextField = (
  field: WorkflowFieldDefinition,
): boolean => {
  if (field.type !== WorkflowFieldInputType.TEXT) {
    return false;
  }
  const text = `${field.key} ${field.label}`;
  return (
    /\b(folder|directory)\b/i.test(text) ||
    (/\brepo(sitory)?\b/i.test(text) && /\bpath\b/i.test(text))
  );
};

/**
 * a9788f04: a deep link (or pick) with a project fills "App folder path on
 * your computer (git repo)" with that project's folder. A value the user
 * typed is kept; one we filled earlier follows the project. Null: no change.
 */
export const prefillProjectFolderTextFields = (input: {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly folderPath: string;
  readonly previousFolderPath: string | null;
}): Record<string, string> | null => {
  const folderPath = input.folderPath.trim();
  if (folderPath.length === 0) {
    return null;
  }
  const keys = input.fields
    .filter(isProjectFolderTextField)
    .map((field) => field.key)
    .filter((key) => {
      const current = input.values[key]?.trim() ?? "";
      return (
        current !== folderPath &&
        (current.length === 0 || current === input.previousFolderPath)
      );
    });
  if (keys.length === 0) {
    return null;
  }
  return keys.reduce<Record<string, string>>(
    (next, key) => ({ ...next, [key]: folderPath }),
    { ...input.values },
  );
};
