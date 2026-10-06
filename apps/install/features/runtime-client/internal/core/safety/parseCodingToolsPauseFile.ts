export interface CodingToolsPauseState {
  readonly paused: boolean;
  readonly updatedAt: string | null;
}

export const CODING_TOOLS_NOT_PAUSED: CodingToolsPauseState = {
  paused: false,
  updatedAt: null,
};

const CODING_TOOLS_PAUSED_UNREADABLE: CodingToolsPauseState = {
  paused: true,
  updatedAt: null,
};

/**
 * Pure parse of `coding-tools-pause.json`. No file → not paused. A file that
 * exists but cannot be read as `{ paused: boolean }` → paused (fail closed).
 */
export const parseCodingToolsPauseFile = (
  raw: string | null,
): CodingToolsPauseState => {
  if (raw === null) {
    return CODING_TOOLS_NOT_PAUSED;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as { paused?: unknown }).paused !== "boolean"
    ) {
      return CODING_TOOLS_PAUSED_UNREADABLE;
    }
    const record = parsed as { paused: boolean; updatedAt?: unknown };
    return {
      paused: record.paused,
      updatedAt:
        typeof record.updatedAt === "string" ? record.updatedAt : null,
    };
  } catch {
    return CODING_TOOLS_PAUSED_UNREADABLE;
  }
};
