/**
 * One-off: fix broken `./resolveAgentWitchLocalLayout` and writerApi paths under apps/live.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../..",
);
const LIVE_FEATURES = path.join(ROOT, "apps/live/features");

const walk = (dir: string): string[] => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(full);
    }
    if (entry.name.endsWith(".ts")) {
      return [full];
    }
    return [];
  });
};

const replacements: Array<[RegExp, string]> = [
  [
    /from "\.\/resolveAgentWitchLocalLayout"/g,
    'from "@agent-witch/install-layout/types"',
  ],
  [
    /from "\.\.\/resolveAgentWitchLocalLayout"/g,
    'from "@agent-witch/install-layout/types"',
  ],
  [
    /from "\.\/buildAgentWitchLocalHeartbeatElapsedMarkup"/g,
    'from "@agent-witch/live-status-health/presentation"',
  ],
  [
    /from "\.\/buildAgentWitchLocalStatusTraceSection"/g,
    'from "@agent-witch/live-status-health/presentation"',
  ],
];

for (const filePath of walk(LIVE_FEATURES)) {
  let source = fs.readFileSync(filePath, "utf8");
  let next = source;
  for (const [pattern, replacement] of replacements) {
    next = next.replace(pattern, replacement);
  }
  if (next !== source) {
    fs.writeFileSync(filePath, next);
  }
}
