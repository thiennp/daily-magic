import { readOptionalPositiveSeconds } from "@/lib/dispatch/readOptionalPositiveSeconds";

export const parseAgentRunCompleteBody = (
  body: unknown,
): { readonly exitCode: number; readonly output: string } | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const exitCode = (body as { exitCode?: unknown }).exitCode;
  const output = (body as { output?: unknown }).output;

  if (typeof exitCode !== "number" || typeof output !== "string") {
    return null;
  }

  return { exitCode, output };
};

export const parseAgentRunEstimateComparisonBody = (
  body: unknown,
): {
  readonly estimateSeconds: number | null;
  readonly actualSeconds: number | null;
} | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const record = body as {
    estimateSeconds?: unknown;
    actualSeconds?: unknown;
  };
  const estimateSeconds = readOptionalPositiveSeconds(record.estimateSeconds);
  const actualSeconds = readOptionalPositiveSeconds(record.actualSeconds);
  if (estimateSeconds === null && actualSeconds === null) {
    return null;
  }

  return { estimateSeconds, actualSeconds };
};
