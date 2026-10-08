/**
 * 5ca01f06: ensure-writer.sh used to run an interactive `codex login` with no
 * terminal, which hung until the 120 s timeout. The host never waits on an
 * interactive login: when the script says Codex needs sign-in, it stops the
 * script and fails the run with this next step.
 */
export const CODEX_SIGN_IN_REQUIRED_MESSAGE =
  "Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.";

const CODEX_NEEDS_SIGN_IN = /Codex CLI needs ChatGPT sign-in/i;

/** The fail-fast reason for a script line, or null to keep waiting. */
export const resolveWriterSignInRequiredReason = (
  writerAgent: string,
  scriptOutput: string,
): string | null =>
  writerAgent === "codex" && CODEX_NEEDS_SIGN_IN.test(scriptOutput)
    ? CODEX_SIGN_IN_REQUIRED_MESSAGE
    : null;

const INSTALLING_WRITER_CLI = /Installing (\w+) CLI on this computer/;

/** 77e29f7a: ensure-writer installs a missing CLI; the host log must say so. */
export const resolveWriterCliInstallLogLine = (
  scriptOutput: string,
): string | null => {
  const match = INSTALLING_WRITER_CLI.exec(scriptOutput);
  return match === null
    ? null
    : `[agent-witch] ensure-writer: installing the ${match[1] ?? ""} CLI on this computer (it was not on PATH).`;
};
