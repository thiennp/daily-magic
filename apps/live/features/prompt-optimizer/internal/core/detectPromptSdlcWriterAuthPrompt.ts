import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatch";

/**
 * Writer CLIs that are not signed in print an interactive login prompt and then
 * wait (agy: 60 s) for a browser code. Detect it from the live output so the step
 * can fail fast instead of burning the timeout.
 */
const INTERACTIVE_LOGIN_PROMPT =
  /please visit the url to log in|paste the authorization code|waiting for authentication|authentication timed out|accounts\.google\.com\/o\/oauth2/i;

/** CLI status lines meaning "not signed in" (stderr only: a model reply could quote them). */
const NOT_SIGNED_IN_STATUS =
  /authentication required|not logged in|login required|please run .{1,40}\blogin\b|authentication failed or timed out/i;

export const detectPromptSdlcWriterAuthPrompt = (input: {
  readonly stdout: string;
  readonly stderr: string;
}): boolean => {
  if (
    INTERACTIVE_LOGIN_PROMPT.test(input.stderr) ||
    NOT_SIGNED_IN_STATUS.test(input.stderr)
  ) {
    return true;
  }
  // stdout carries the model reply; require two distinct login-prompt markers there.
  const stdoutMarkers = input.stdout.match(
    new RegExp(INTERACTIVE_LOGIN_PROMPT.source, "gi"),
  );
  return new Set((stdoutMarkers ?? []).map((m) => m.toLowerCase())).size >= 2;
};

const SIGN_IN_STEPS: Record<
  HarnessWriterAgentId,
  { readonly label: string; readonly command: string }
> = {
  antigravity: { label: "Antigravity CLI", command: "agy" },
  "claude-cli": { label: "Claude CLI", command: "claude" },
  codex: { label: "Codex CLI", command: "codex login" },
  cursor: { label: "Cursor CLI", command: "cursor-agent login" },
};

/** Plain-English fix. Never includes the CLI's OAuth URL or its state. */
export const buildPromptSdlcWriterSignInMessage = (
  writerAgent: HarnessWriterAgentId,
): string => {
  const step = SIGN_IN_STEPS[writerAgent];
  return `${step.label} isn't signed in on this computer. Open Terminal, run \`${step.command}\` once and finish sign-in, then retry.`;
};
