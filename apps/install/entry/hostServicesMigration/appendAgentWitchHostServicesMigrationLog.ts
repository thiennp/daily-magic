import { join } from "node:path";
import { appendFileSync, mkdirSync } from "node:fs";

export const appendAgentWitchHostServicesMigrationLog = (
  installDir: string,
  message: string,
  now = new Date(),
): void => {
  console.log(message);
  try {
    const logsDir = join(installDir, "logs");
    mkdirSync(logsDir, { recursive: true });
    const logPath = join(logsDir, "host-services-migration.log");
    const formatted = `${now.toISOString()} ${message}\n`;
    appendFileSync(logPath, formatted, "utf8");
  } catch {
    // never throws
  }
};
