import { maskMiddleForTrace } from "./maskMiddleForTrace";

const SENSITIVE_KEY_PATTERN =
  /(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i;

const shouldRedactKey = (key: string): boolean =>
  SENSITIVE_KEY_PATTERN.test(key);

const redactStringValue = (value: string): string => maskMiddleForTrace(value);

export const redactAgentWitchTraceBody = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactAgentWitchTraceBody(item));
  }

  if (typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  for (const [key, nested] of Object.entries(record)) {
    if (typeof nested === "string" && shouldRedactKey(key)) {
      output[key] = redactStringValue(nested);
      continue;
    }

    output[key] = redactAgentWitchTraceBody(nested);
  }

  return output;
};
