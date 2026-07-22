import fs from "node:fs";
import path from "node:path";

export const AGENT_WITCH_WAKE_PORT_FILE_NAME = "wake-port.json";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidWakePort = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value > 0 &&
  value <= 65535;

export const resolveAgentWitchWakePortFilePath = (installDir: string): string =>
  path.join(installDir, AGENT_WITCH_WAKE_PORT_FILE_NAME);

export const readAgentWitchWakePortFromFile = (
  installDir: string,
): number | null => {
  const portFilePath = resolveAgentWitchWakePortFilePath(installDir);

  if (!fs.existsSync(portFilePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(portFilePath, "utf8"));
    if (isRecord(parsed) && isValidWakePort(parsed.wakePort)) {
      return parsed.wakePort;
    }
  } catch {
    return null;
  }

  return null;
};

export const writeAgentWitchWakePortFile = (
  installDir: string,
  wakePort: number,
): void => {
  if (!isValidWakePort(wakePort)) {
    throw new Error(`Invalid wake port: ${String(wakePort)}`);
  }

  const portFilePath = resolveAgentWitchWakePortFilePath(installDir);
  fs.writeFileSync(
    portFilePath,
    `${JSON.stringify({ wakePort }, null, 2)}\n`,
    "utf8",
  );
};
