/**
 * 5ca01f06: "Failed to prepare codex: ensure-writer.sh timed out after 120s"
 * reached the floater, Home and Tasks as the raw reason (and the floater
 * called it a Claude login). A prepare failure maps to one next step for the
 * writer that was picked. Claude and Antigravity keep their own copy.
 */
const WRITER_PREPARE_FAILURE = /Failed to prepare ([\w-]+):\s*([^\n]*)/;
const CODEX_NOT_SIGNED_IN = /Codex isn't signed in on this computer/;

const WRITER_LABELS: Readonly<Record<string, string>> = {
  codex: "Codex",
  cursor: "Cursor",
};

export const summarizeWriterPrepareFailure = (
  output: string,
): string | null => {
  const match = WRITER_PREPARE_FAILURE.exec(output);
  const writerAgent = match?.[1] ?? "";
  const label = WRITER_LABELS[writerAgent];
  if (match === null || label === undefined) {
    return null;
  }
  if (writerAgent === "codex" && CODEX_NOT_SIGNED_IN.test(match[2] ?? "")) {
    return "Codex isn't signed in on this computer. Run codex login in a terminal there, or pick another coding tool.";
  }
  return `${label} isn't ready on this computer. Sign in to it there, or pick another coding tool, then retry.`;
};
