import fs from "node:fs";
import path from "node:path";

export const AGENT_WITCH_ERROR_LOG_TAIL_MAX_BYTES = 256_000;

export const clearAgentWitchErrorLog = (errorLogPath: string): void => {
  fs.mkdirSync(path.dirname(errorLogPath), { recursive: true });
  fs.writeFileSync(errorLogPath, "", "utf8");
};

export const readAgentWitchErrorLogTail = (
  errorLogPath: string,
  maxBytes: number = AGENT_WITCH_ERROR_LOG_TAIL_MAX_BYTES,
): {
  readonly content: string;
  readonly exists: boolean;
  readonly truncated: boolean;
  readonly byteSize: number;
} => {
  if (!fs.existsSync(errorLogPath)) {
    return { content: "", exists: false, truncated: false, byteSize: 0 };
  }

  const stat = fs.statSync(errorLogPath);
  if (!stat.isFile()) {
    return { content: "", exists: false, truncated: false, byteSize: 0 };
  }

  const byteSize = stat.size;
  if (byteSize === 0) {
    return { content: "", exists: true, truncated: false, byteSize: 0 };
  }

  const readStart = Math.max(0, byteSize - maxBytes);
  const readLength = byteSize - readStart;
  const buffer = Buffer.alloc(readLength);
  const fileHandle = fs.openSync(errorLogPath, "r");

  try {
    fs.readSync(fileHandle, buffer, 0, readLength, readStart);
  } finally {
    fs.closeSync(fileHandle);
  }

  let content = buffer.toString("utf8");
  if (readStart > 0) {
    const firstNewline = content.indexOf("\n");
    if (firstNewline >= 0) {
      content = content.slice(firstNewline + 1);
    }
  }

  return {
    content,
    exists: true,
    truncated: readStart > 0,
    byteSize,
  };
};
