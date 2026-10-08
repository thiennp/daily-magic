import { join } from "node:path";
import { readFileSync, rmSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { appendAgentWitchHostServicesMigrationLog } from "./appendAgentWitchHostServicesMigrationLog";

describe("appendAgentWitchHostServicesMigrationLog", () => {
  it("appends to log and never throws", () => {
    const tmpDir = join(__dirname, ".tmp-log-" + Date.now());
    rmSync(tmpDir, { recursive: true, force: true });

    try {
      const now = new Date("2024-01-01T12:00:00Z");
      appendAgentWitchHostServicesMigrationLog(tmpDir, "Hello world", now);

      const logContent = readFileSync(
        join(tmpDir, "logs", "host-services-migration.log"),
        "utf8",
      );
      expect(logContent).toBe("2024-01-01T12:00:00.000Z Hello world\n");

      appendAgentWitchHostServicesMigrationLog(tmpDir, "Again", now);
      const logContent2 = readFileSync(
        join(tmpDir, "logs", "host-services-migration.log"),
        "utf8",
      );
      expect(logContent2).toBe(
        "2024-01-01T12:00:00.000Z Hello world\n2024-01-01T12:00:00.000Z Again\n",
      );
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
