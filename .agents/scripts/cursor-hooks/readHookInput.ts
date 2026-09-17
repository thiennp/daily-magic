import fs from "node:fs";

export interface HookInputBase {
  readonly hook_event_name?: string;
  readonly conversation_id?: string;
  readonly loop_count?: number;
  readonly status?: string;
}

export interface PostToolUseInput extends HookInputBase {
  readonly tool_name?: string;
  readonly tool_input?: unknown;
  readonly cwd?: string;
}

export interface AfterFileEditInput extends HookInputBase {
  readonly file_path?: string;
}

export const readHookInput = <T extends HookInputBase>(): T => {
  const text = fs.readFileSync(0, "utf8");
  if (text.trim().length === 0) {
    return {} as T;
  }
  return JSON.parse(text) as T;
};

const parseToolInputObject = (
  toolInput: unknown,
): Record<string, unknown> | null => {
  if (typeof toolInput === "object" && toolInput !== null) {
    return toolInput as Record<string, unknown>;
  }
  if (typeof toolInput === "string") {
    try {
      const parsed: unknown = JSON.parse(toolInput);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return null;
    }
  }
  return null;
};

export const resolveEditedFilePath = (
  input: PostToolUseInput | AfterFileEditInput,
): string | null => {
  if ("file_path" in input && typeof input.file_path === "string") {
    return input.file_path;
  }
  const post = input as PostToolUseInput;
  const obj = parseToolInputObject(post.tool_input);
  if (obj === null) {
    return null;
  }
  const candidates = ["path", "file_path", "target_file", "filePath"];
  for (const key of candidates) {
    const value = obj[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return null;
};
