import fs from "node:fs";
import path from "node:path";

export interface E2eCleanupLogEntry {
  readonly at: string;
  readonly kind: string;
  readonly email?: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly note?: string;
}

const resolveE2eCleanupLogPath = (): string =>
  path.join(process.cwd(), ".e2e", "cleanup-log.ndjson");

export const appendE2eCleanupLog = (entry: E2eCleanupLogEntry): void => {
  const logPath = resolveE2eCleanupLogPath();
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFileSync(logPath, `${JSON.stringify(entry)}\n`, "utf8");
};

export const appendE2eCleanupLogForTestEmail = (input: {
  readonly email: string;
  readonly kind: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly note?: string;
}): void => {
  appendE2eCleanupLog({
    at: new Date().toISOString(),
    kind: input.kind,
    email: input.email,
    entityType: input.entityType,
    entityId: input.entityId,
    note: input.note,
  });
};
