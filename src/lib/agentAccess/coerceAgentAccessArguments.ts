export const coerceAgentAccessArguments = (value: unknown): unknown => {
  if (typeof value !== "string") {
    return value ?? {};
  }

  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return {};
  }

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return value;
  }
};

export const readAgentAccessInvokeBody = (
  payload: unknown,
): { readonly name: string; readonly arguments: unknown } | null => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    return null;
  }

  const record = payload as Readonly<Record<string, unknown>>;
  const name = record.name;

  if (typeof name !== "string" || name.trim().length === 0) {
    return null;
  }

  const raw = record.arguments !== undefined ? record.arguments : record.args;

  return {
    name: name.trim(),
    arguments: coerceAgentAccessArguments(raw ?? {}),
  };
};
