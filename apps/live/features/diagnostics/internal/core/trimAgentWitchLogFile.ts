import fs from "node:fs";

/**
 * Keep a log file bounded: when it exceeds `maxBytes`, rewrite it with only the
 * last `keepBytes` (cut at a line start). Safe for launchd/shell appenders:
 * the file is truncated in place, so their O_APPEND handles keep working.
 */
export const trimAgentWitchLogFile = (
  filePath: string,
  options: { readonly maxBytes: number; readonly keepBytes: number },
): boolean => {
  try {
    const { size } = fs.statSync(filePath);
    if (size <= options.maxBytes) {
      return false;
    }
    const handle = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(options.keepBytes);
    const read = fs.readSync(
      handle,
      buffer,
      0,
      options.keepBytes,
      size - options.keepBytes,
    );
    fs.closeSync(handle);
    const tail = buffer.subarray(0, read).toString("utf8");
    const firstNewline = tail.indexOf("\n");
    const kept = firstNewline === -1 ? tail : tail.slice(firstNewline + 1);
    fs.truncateSync(filePath, 0);
    fs.appendFileSync(filePath, kept, "utf8");
    return true;
  } catch {
    return false;
  }
};

const MAX_LOG_BYTES = 5 * 1024 * 1024;
const KEEP_LOG_BYTES = 1024 * 1024;

export const trimAgentWitchLogs = (filePaths: readonly string[]): void => {
  for (const filePath of filePaths) {
    trimAgentWitchLogFile(filePath, {
      maxBytes: MAX_LOG_BYTES,
      keepBytes: KEEP_LOG_BYTES,
    });
  }
};
