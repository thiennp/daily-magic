import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING,
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR,
  AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE,
  AGENT_WITCH_LOCAL_PORT_RANGE_FILE_NAME,
} from "./agentWitchLocalAppPortRange.constants";
import type { AgentWitchLocalAppPortRange } from "./agentWitchLocalAppPortRange.types";
import { isValidAgentWitchLocalAppPortRange } from "./isValidAgentWitchLocalAppPortRange";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchLocalPortRangeFilePath = (
  profileDir: string,
): string => path.join(profileDir, AGENT_WITCH_LOCAL_PORT_RANGE_FILE_NAME);

export const readAgentWitchLocalAppPortRangeFile = (
  profileDir: string,
): AgentWitchLocalAppPortRange | null => {
  const filePath = resolveAgentWitchLocalPortRangeFilePath(profileDir);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (isValidAgentWitchLocalAppPortRange(parsed)) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
};

export const writeAgentWitchLocalAppPortRangeFile = (
  profileDir: string,
  range: AgentWitchLocalAppPortRange,
): void => {
  fs.mkdirSync(profileDir, { recursive: true });
  const filePath = resolveAgentWitchLocalPortRangeFilePath(profileDir);
  fs.writeFileSync(
    filePath,
    `${JSON.stringify({ start: range.start, end: range.end }, null, 2)}\n`,
    "utf8",
  );
};

export const listTakenAgentWitchLocalAppPortRangeStarts = (
  profilesDir: string,
): ReadonlySet<number> => {
  const taken = new Set<number>();
  if (!fs.existsSync(profilesDir)) {
    return taken;
  }
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(profilesDir);
  } catch {
    return taken;
  }
  for (const entry of entries) {
    const range = readAgentWitchLocalAppPortRangeFile(
      path.join(profilesDir, entry),
    );
    if (range !== null) {
      taken.add(range.start);
    }
  }
  return taken;
};

export const portRangeBlockCount = (): number =>
  Math.floor(
    (AGENT_WITCH_LOCAL_APP_PORT_RANGE_CEILING -
      AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR +
      1) /
      AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE,
  );

export const portRangeForBlockIndex = (
  blockIndex: number,
): AgentWitchLocalAppPortRange => {
  const start =
    AGENT_WITCH_LOCAL_APP_PORT_RANGE_FLOOR +
    blockIndex * AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE;
  return {
    start,
    end: start + AGENT_WITCH_LOCAL_APP_PORT_RANGE_SIZE - 1,
  };
};

/**
 * Stable random range for this account: reuse persisted file; otherwise pick a
 * free 16-port block in 49152–65535 that no other profile on this computer uses.
 */
export const allocateOrLoadAgentWitchLocalAppPortRange = (input: {
  readonly profileDir: string;
  readonly profilesDir: string;
  readonly random?: () => number;
}): AgentWitchLocalAppPortRange => {
  const existing = readAgentWitchLocalAppPortRangeFile(input.profileDir);
  if (existing !== null) {
    return existing;
  }

  const taken = listTakenAgentWitchLocalAppPortRangeStarts(input.profilesDir);
  const blocks = portRangeBlockCount();
  const random = input.random ?? Math.random;
  const startIndex = Math.floor(random() * blocks) % blocks;

  for (let offset = 0; offset < blocks; offset += 1) {
    const blockIndex = (startIndex + offset) % blocks;
    const range = portRangeForBlockIndex(blockIndex);
    if (!taken.has(range.start)) {
      writeAgentWitchLocalAppPortRangeFile(input.profileDir, range);
      return range;
    }
  }

  // Every block taken (extreme): still persist a deterministic fallback block 0
  // so Settings has a range; bind will surface "Ports for this account are in use."
  const fallback = portRangeForBlockIndex(0);
  writeAgentWitchLocalAppPortRangeFile(input.profileDir, fallback);
  return fallback;
};

export const parseAgentWitchLocalAppPortRangeUnknown = (
  value: unknown,
): AgentWitchLocalAppPortRange | null => {
  if (!isRecord(value)) {
    return null;
  }
  if (isValidAgentWitchLocalAppPortRange(value)) {
    return value;
  }
  return null;
};
