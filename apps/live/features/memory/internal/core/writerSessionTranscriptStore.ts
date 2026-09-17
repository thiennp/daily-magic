import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { buildWriterSessionContinuationInjectionBody } from "./buildWriterSessionContinuationInjection";
import type {
  WriterSessionActiveIndex,
  WriterSessionActiveIndexEntry,
  WriterSessionCanonicalRecord,
  WriterSessionContinuationRecord,
  WriterSessionTranscriptTurn,
  WriterSessionWriterAgentId,
} from "./writerSessionTranscript.types";

const WRITER_SESSIONS_DIR_NAME = "writer-sessions";
const ACTIVE_INDEX_FILE_NAME = "active-index.json";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isWriterSessionWriterAgentId = (
  value: string,
): value is WriterSessionWriterAgentId =>
  value === "claude-cli" ||
  value === "codex" ||
  value === "cursor" ||
  value === "antigravity";

const normalizeProjectFolderPath = (
  projectFolderPath: string | undefined,
): string | null => {
  if (projectFolderPath === undefined) {
    return null;
  }

  const trimmed = projectFolderPath.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const resolveWriterSessionsDir = (layout: AgentWitchLocalLayout): string => {
  const dir = path.join(layout.installDir, WRITER_SESSIONS_DIR_NAME);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const resolveActiveIndexPath = (layout: AgentWitchLocalLayout): string =>
  path.join(resolveWriterSessionsDir(layout), ACTIVE_INDEX_FILE_NAME);

const resolveCanonicalPath = (
  layout: AgentWitchLocalLayout,
  sessionId: string,
): string =>
  path.join(resolveWriterSessionsDir(layout), `${sessionId}.canonical.json`);

const resolveContinuationPath = (
  layout: AgentWitchLocalLayout,
  sessionId: string,
): string =>
  path.join(resolveWriterSessionsDir(layout), `${sessionId}.continuation.json`);

const activeIndexKey = (input: {
  readonly writerAgent: WriterSessionWriterAgentId;
  readonly projectFolderPath: string | null;
}): string => `${input.writerAgent}\0${input.projectFolderPath ?? ""}`;

const readActiveIndex = (
  layout: AgentWitchLocalLayout,
): WriterSessionActiveIndex => {
  const indexPath = resolveActiveIndexPath(layout);
  if (!fs.existsSync(indexPath)) {
    return { entries: [] };
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    if (!isRecord(parsed) || !Array.isArray(parsed.entries)) {
      return { entries: [] };
    }

    const entries: WriterSessionActiveIndexEntry[] = [];
    for (const entry of parsed.entries) {
      if (!isRecord(entry) || typeof entry.sessionId !== "string") {
        continue;
      }

      const writerAgent =
        typeof entry.writerAgent === "string" ? entry.writerAgent : "";
      if (!isWriterSessionWriterAgentId(writerAgent)) {
        continue;
      }

      const projectFolderPath =
        typeof entry.projectFolderPath === "string"
          ? entry.projectFolderPath
          : entry.projectFolderPath === null
            ? null
            : null;

      entries.push({
        writerAgent,
        projectFolderPath,
        sessionId: entry.sessionId,
      });
    }

    return { entries };
  } catch {
    return { entries: [] };
  }
};

const writeActiveIndex = (
  layout: AgentWitchLocalLayout,
  index: WriterSessionActiveIndex,
): void => {
  fs.writeFileSync(
    resolveActiveIndexPath(layout),
    JSON.stringify(index, null, 2),
  );
};

const writeCanonical = (
  layout: AgentWitchLocalLayout,
  record: WriterSessionCanonicalRecord,
): void => {
  fs.writeFileSync(
    resolveCanonicalPath(layout, record.sessionId),
    JSON.stringify(record, null, 2),
  );
};

const writeContinuation = (
  layout: AgentWitchLocalLayout,
  record: WriterSessionContinuationRecord,
): void => {
  fs.writeFileSync(
    resolveContinuationPath(layout, record.sessionId),
    JSON.stringify(record, null, 2),
  );
};

const rebuildContinuationFromCanonical = (
  layout: AgentWitchLocalLayout,
  canonical: WriterSessionCanonicalRecord,
): void => {
  const injectionBody = buildWriterSessionContinuationInjectionBody({
    turns: canonical.turns,
  });
  writeContinuation(layout, {
    sessionId: canonical.sessionId,
    injectionBody,
    updatedAt: canonical.updatedAt,
  });
};

export const loadWriterSessionCanonical = (
  layout: AgentWitchLocalLayout,
  sessionId: string,
): WriterSessionCanonicalRecord | null => {
  const canonicalPath = resolveCanonicalPath(layout, sessionId);
  if (!fs.existsSync(canonicalPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(canonicalPath, "utf8"));
    if (!isRecord(parsed) || typeof parsed.sessionId !== "string") {
      return null;
    }

    return parsed as unknown as WriterSessionCanonicalRecord;
  } catch {
    return null;
  }
};

export const listWriterSessionCanonicalRecords = (
  layout: AgentWitchLocalLayout,
  limit = 20,
): readonly WriterSessionCanonicalRecord[] => {
  const dir = resolveWriterSessionsDir(layout);
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) => entry.isFile() && entry.name.endsWith(".canonical.json"),
    );

  const records: WriterSessionCanonicalRecord[] = [];
  for (const file of files) {
    const sessionId = file.name.replace(/\.canonical\.json$/, "");
    const record = loadWriterSessionCanonical(layout, sessionId);
    if (record !== null) {
      records.push(record);
    }
  }

  return records
    .toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, limit);
};

export const resolveActiveWriterSessionId = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath: string | undefined,
): string | null => {
  const projectKey = normalizeProjectFolderPath(projectFolderPath);
  const index = readActiveIndex(layout);
  const match = index.entries.find(
    (entry) =>
      activeIndexKey(entry) ===
      activeIndexKey({ writerAgent, projectFolderPath: projectKey }),
  );

  return match?.sessionId ?? null;
};

const setActiveWriterSessionId = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath: string | null,
  sessionId: string,
): void => {
  const index = readActiveIndex(layout);
  const key = activeIndexKey({ writerAgent, projectFolderPath });
  const nextEntries = [
    ...index.entries.filter((entry) => activeIndexKey(entry) !== key),
    { writerAgent, projectFolderPath, sessionId },
  ];
  writeActiveIndex(layout, { entries: nextEntries });
};

export const startNewWriterTranscriptSession = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath: string | undefined,
): string => {
  const sessionId = randomUUID();
  const now = new Date().toISOString();
  const projectKey = normalizeProjectFolderPath(projectFolderPath);
  const record: WriterSessionCanonicalRecord = {
    sessionId,
    writerAgent,
    projectFolderPath: projectKey,
    turns: [],
    createdAt: now,
    updatedAt: now,
  };

  writeCanonical(layout, record);
  rebuildContinuationFromCanonical(layout, record);
  setActiveWriterSessionId(layout, writerAgent, projectKey, sessionId);
  return sessionId;
};

export const ensureActiveWriterTranscriptSession = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath: string | undefined,
): string => {
  const existing = resolveActiveWriterSessionId(
    layout,
    writerAgent,
    projectFolderPath,
  );
  if (existing !== null) {
    return existing;
  }

  return startNewWriterTranscriptSession(
    layout,
    writerAgent,
    projectFolderPath,
  );
};

export const endActiveWriterTranscriptSession = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath?: string,
): void => {
  const projectKey = normalizeProjectFolderPath(projectFolderPath);
  const index = readActiveIndex(layout);
  if (projectKey === null && projectFolderPath === undefined) {
    writeActiveIndex(layout, {
      entries: index.entries.filter(
        (entry) => entry.writerAgent !== writerAgent,
      ),
    });
    return;
  }

  const key = activeIndexKey({ writerAgent, projectFolderPath: projectKey });
  writeActiveIndex(layout, {
    entries: index.entries.filter((entry) => activeIndexKey(entry) !== key),
  });
};

export const appendWriterTranscriptTurn = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly writerAgent: WriterSessionWriterAgentId;
  readonly projectFolderPath: string | undefined;
  readonly userPrompt: string;
  readonly assistantOutput: string;
  readonly agentRunId?: string;
}): void => {
  const sessionId = ensureActiveWriterTranscriptSession(
    input.layout,
    input.writerAgent,
    input.projectFolderPath,
  );
  const canonical = loadWriterSessionCanonical(input.layout, sessionId);
  if (canonical === null) {
    return;
  }

  const turn: WriterSessionTranscriptTurn = {
    id: randomUUID(),
    ...(input.agentRunId !== undefined ? { agentRunId: input.agentRunId } : {}),
    userPrompt: input.userPrompt,
    assistantOutput: input.assistantOutput,
    createdAt: new Date().toISOString(),
  };

  const updated: WriterSessionCanonicalRecord = {
    ...canonical,
    turns: [...canonical.turns, turn],
    updatedAt: turn.createdAt,
  };

  writeCanonical(input.layout, updated);
  rebuildContinuationFromCanonical(input.layout, updated);
};

export const loadActiveWriterContinuationInjectionBody = (
  layout: AgentWitchLocalLayout,
  writerAgent: WriterSessionWriterAgentId,
  projectFolderPath: string | undefined,
): string | null => {
  const sessionId = resolveActiveWriterSessionId(
    layout,
    writerAgent,
    projectFolderPath,
  );
  if (sessionId === null) {
    return null;
  }

  const continuationPath = resolveContinuationPath(layout, sessionId);
  if (!fs.existsSync(continuationPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(continuationPath, "utf8"),
    );
    if (
      !isRecord(parsed) ||
      typeof parsed.injectionBody !== "string" ||
      parsed.injectionBody.length === 0
    ) {
      return null;
    }

    return parsed.injectionBody;
  } catch {
    return null;
  }
};
