import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PREFERRED_CURSOR_ARTIFACTS = "/opt/cursor/artifacts";

/** Walkthrough path when writable; otherwise a process-local temp dir. */
export const resolveWritableCursorArtifactsDir = (): string => {
  try {
    fs.mkdirSync(PREFERRED_CURSOR_ARTIFACTS, { recursive: true });
    const probe = path.join(
      PREFERRED_CURSOR_ARTIFACTS,
      `.write-probe-${process.pid}`,
    );
    fs.writeFileSync(probe, "");
    fs.unlinkSync(probe);
    return PREFERRED_CURSOR_ARTIFACTS;
  } catch {
    return fs.mkdtempSync(path.join(os.tmpdir(), "cursor-artifacts-"));
  }
};
