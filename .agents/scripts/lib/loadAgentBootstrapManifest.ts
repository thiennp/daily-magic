import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { AgentBootstrapManifest } from "./agentBootstrapManifest.type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../../..");
const MANIFEST_PATH = path.join(
  APP_ROOT,
  ".cursor/harness/agent-bootstrap.manifest.json",
);

export const getAgentBootstrapManifestPath = (): string => MANIFEST_PATH;

export const loadAgentBootstrapManifest = (): AgentBootstrapManifest => {
  const raw = readFileSync(MANIFEST_PATH, "utf8");
  return JSON.parse(raw) as AgentBootstrapManifest;
};

export const matchRoutingRow = (
  manifest: AgentBootstrapManifest,
  userText: string,
): AgentBootstrapRoutingRow | null => {
  const normalized = userText.toLowerCase();
  const sorted = [...manifest.routing].sort((a, b) => a.priority - b.priority);

  const matched = sorted.find((row) =>
    row.signals.some((signal) => normalized.includes(signal.toLowerCase())),
  );

  return matched ?? null;
};
