import type { CheckContextInput } from "../../public-api/types";

const readOptionalString = (
  record: Readonly<Record<string, unknown>>,
  key: string,
): string | undefined => {
  const value = record[key];
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

/** Coerce MCP / HTTP JSON body into CheckContextInput. */
export const parseCheckContextArgs = (raw: unknown): CheckContextInput => {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return {};
  }
  const record = raw as Readonly<Record<string, unknown>>;
  return {
    ...(readOptionalString(record, "cwd") !== undefined
      ? { cwd: readOptionalString(record, "cwd") }
      : {}),
    ...(readOptionalString(record, "message") !== undefined
      ? { message: readOptionalString(record, "message") }
      : {}),
    ...(readOptionalString(record, "sessionId") !== undefined
      ? { sessionId: readOptionalString(record, "sessionId") }
      : {}),
    ...(readOptionalString(record, "projectId") !== undefined
      ? { projectId: readOptionalString(record, "projectId") }
      : {}),
  };
};
