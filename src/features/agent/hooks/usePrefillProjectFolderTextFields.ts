"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

import { prefillProjectFolderTextFields } from "@/lib/workflows/prefillProjectFolderTextFields";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

/**
 * a9788f04: once the project (from the link or a pick) and the workflow's
 * fields are known, fill its folder-path text input so Start is not blocked.
 */
export const usePrefillProjectFolderTextFields = (input: {
  readonly fields: readonly WorkflowFieldDefinition[];
  readonly values: Readonly<Record<string, string>>;
  readonly setValues: Dispatch<SetStateAction<Record<string, string>>>;
  readonly projectFolderPath: string | null;
}): void => {
  const [applied, setApplied] = useState<{
    readonly key: string;
    readonly folderPath: string | null;
  }>({ key: "", folderPath: null });
  const folderPath = input.projectFolderPath?.trim() ?? "";
  const key = `${folderPath}|${input.fields.map((field) => field.key).join(",")}`;
  if (
    folderPath.length === 0 ||
    input.fields.length === 0 ||
    applied.key === key
  ) {
    return;
  }
  setApplied({ key, folderPath });
  const next = prefillProjectFolderTextFields({
    fields: input.fields,
    values: input.values,
    folderPath,
    previousFolderPath: applied.folderPath,
  });
  if (next !== null) {
    input.setValues(next);
  }
};
