import fs from "node:fs";

import type { WriterApiSecretsFile } from "./WriterApiSecrets.type";
import { resolveWriterApiSecretsPath } from "./writerApiSecretsPath";

export const writeWriterApiSecretsFile = (
  profileDir: string,
  secrets: WriterApiSecretsFile,
): void => {
  const secretsPath = resolveWriterApiSecretsPath(profileDir);
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(secretsPath, `${JSON.stringify(secrets, null, 2)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  try {
    fs.chmodSync(secretsPath, 0o600);
  } catch {
    // Best-effort on platforms that ignore mode bits.
  }
};
