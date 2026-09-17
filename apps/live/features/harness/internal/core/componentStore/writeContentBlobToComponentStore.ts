import fs from "node:fs";
import path from "node:path";

import { sha256Utf8Content } from "./sha256Content";

export const writeContentBlobToComponentStore = (input: {
  readonly storeDir: string;
  readonly content: string;
}): string => {
  const contentSha256 = sha256Utf8Content(input.content);
  const blobPath = path.join(input.storeDir, contentSha256);
  if (!fs.existsSync(blobPath)) {
    fs.mkdirSync(input.storeDir, { recursive: true });
    fs.writeFileSync(blobPath, input.content);
  }

  return contentSha256;
};
