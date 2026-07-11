import isNonEmptyString from "./isNonEmptyString";

const isClaudeRunPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): payload is { readonly prompt: string } =>
  payload !== undefined && isNonEmptyString(payload.prompt);

export default isClaudeRunPayload;
