const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/** Parses `{ force?: boolean }` from POST /update/run JSON body. */
export const parseAgentWitchSelfUpdateRunBody = (
  body: unknown,
): { readonly force: boolean } => ({
  force: isRecord(body) && body.force === true,
});
