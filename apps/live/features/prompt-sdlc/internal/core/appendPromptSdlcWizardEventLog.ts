import fs from "node:fs";
import path from "node:path";

export const promptSdlcWizardLogPath = (storePath: string): string =>
  path.join(path.dirname(storePath), "prompt-sdlc-wizard.log.jsonl");

export const appendPromptSdlcWizardEventLog = (
  storePath: string,
  event: {
    readonly cycleId: string;
    readonly kind: string;
    readonly phase?: string;
    readonly detail?: string;
  },
): void => {
  const logPath = promptSdlcWizardLogPath(storePath);
  const line = `${JSON.stringify({
    ts: new Date().toISOString(),
    ...event,
  })}\n`;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, line, "utf8");
};
