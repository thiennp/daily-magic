import fs from "node:fs";
import path from "node:path";

const CLIENT_SOURCE_PATH = path.join(
  process.cwd(),
  "scripts",
  "agent-witch.ts",
);

export const readAgentWitchClientSource = (): string =>
  fs.readFileSync(CLIENT_SOURCE_PATH, "utf8");
