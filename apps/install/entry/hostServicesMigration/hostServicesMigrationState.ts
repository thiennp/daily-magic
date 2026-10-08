import fs from "node:fs";
import path from "node:path";

export const AGENT_WITCH_HOST_SERVICES_MIGRATION_STATE_FILE_NAME =
  "host-services-migration.json";
const MAX_ATTEMPTS = 20;

export interface AgentWitchHostServicesMigrationAttempt {
  readonly at: string;
  readonly bundleVersion: string;
  readonly result: "migrated" | "rolled_back";
  readonly reason?: string;
  readonly backupDir?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseAttempt = (
  value: unknown,
): AgentWitchHostServicesMigrationAttempt | null => {
  if (
    !isRecord(value) ||
    typeof value.at !== "string" ||
    typeof value.bundleVersion !== "string" ||
    (value.result !== "migrated" && value.result !== "rolled_back")
  ) {
    return null;
  }
  return {
    at: value.at,
    bundleVersion: value.bundleVersion,
    result: value.result,
    ...(typeof value.reason === "string" ? { reason: value.reason } : {}),
    ...(typeof value.backupDir === "string"
      ? { backupDir: value.backupDir }
      : {}),
  };
};

const resolveStatePath = (installDir: string): string =>
  path.join(installDir, AGENT_WITCH_HOST_SERVICES_MIGRATION_STATE_FILE_NAME);

export const readAgentWitchHostServicesMigrationAttempts = (
  installDir: string,
): readonly AgentWitchHostServicesMigrationAttempt[] => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(resolveStatePath(installDir), "utf8"),
    );
    if (!isRecord(parsed) || !Array.isArray(parsed.attempts)) {
      return [];
    }
    return parsed.attempts.flatMap((entry) => {
      const attempt = parseAttempt(entry);
      return attempt === null ? [] : [attempt];
    });
  } catch {
    return [];
  }
};

export const readLastAgentWitchHostServicesMigrationAttempt = (
  installDir: string,
): AgentWitchHostServicesMigrationAttempt | null =>
  readAgentWitchHostServicesMigrationAttempts(installDir).at(-1) ?? null;

export const appendAgentWitchHostServicesMigrationAttempt = (
  installDir: string,
  attempt: AgentWitchHostServicesMigrationAttempt,
): void => {
  const attempts = [
    ...readAgentWitchHostServicesMigrationAttempts(installDir),
    attempt,
  ].slice(-MAX_ATTEMPTS);
  const filePath = resolveStatePath(installDir);
  const tmpPath = `${filePath}.${String(process.pid)}.${String(Date.now())}.tmp`;
  fs.mkdirSync(installDir, { recursive: true });
  fs.writeFileSync(
    tmpPath,
    `${JSON.stringify({ attempts }, null, 2)}\n`,
    "utf8",
  );
  fs.renameSync(tmpPath, filePath);
};
