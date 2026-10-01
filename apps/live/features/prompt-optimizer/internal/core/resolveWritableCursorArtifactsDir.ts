import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PREFERRED_CURSOR_ARTIFACTS = "/opt/cursor/artifacts";

let cachedWritableCursorArtifactsDir: string | null = null;

/** Walkthrough path when writable; otherwise a process-local temp dir. */
export const resolveWritableCursorArtifactsDir = (): string => {
  if (cachedWritableCursorArtifactsDir !== null) {
    return cachedWritableCursorArtifactsDir;
  }
  try {
    fs.mkdirSync(PREFERRED_CURSOR_ARTIFACTS, { recursive: true });
    const probe = path.join(
      PREFERRED_CURSOR_ARTIFACTS,
      `.write-probe-${process.pid}`,
    );
    fs.writeFileSync(probe, "");
    fs.unlinkSync(probe);
    cachedWritableCursorArtifactsDir = PREFERRED_CURSOR_ARTIFACTS;
    return PREFERRED_CURSOR_ARTIFACTS;
  } catch {
    cachedWritableCursorArtifactsDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "cursor-artifacts-"),
    );
    return cachedWritableCursorArtifactsDir;
  }
};
