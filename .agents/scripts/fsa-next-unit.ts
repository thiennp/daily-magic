/**
 * FSA loop driver. One unit per round, chosen deterministically.
 *
 *   npm run fsa:next                     -> JSON for the next unit (or done / needs-human)
 *   npm run fsa:next -- status           -> progress summary
 *   npm run fsa:next -- done <unit> <sha>
 *   npm run fsa:next -- block <unit> "<reason>"
 *
 * State lives in .agents/fsa/state.json (committed, so every round is reviewable).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import {
  type FsaFileGraph,
  type FsaState,
  pickNextUnit,
  resolveImport,
} from "./lib/fsaUnits";
import { parseImportStatements } from "./lib/parseImportStatements";

const STATE_PATH = ".agents/fsa/state.json";
const BASELINE_PATH = ".agents/fsa/depcruise-baseline.json";
const SOURCE_FILE = /\.(ts|tsx)$/;
const TEST_FILE = /\.(test|spec|stories)\.(ts|tsx)$|\/__tests__\//;

const readState = (): FsaState => {
  const raw: Partial<FsaState> = existsSync(STATE_PATH)
    ? JSON.parse(readFileSync(STATE_PATH, "utf8"))
    : {};
  return {
    completed: raw.completed ?? [],
    blocked: raw.blocked ?? {},
    rounds: raw.rounds ?? [],
  };
};

const writeState = (state: FsaState): void =>
  writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);

const listFeatureFiles = (): readonly string[] =>
  execFileSync("git", ["ls-files", "src/features"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
    .split("\n")
    .filter((file) => SOURCE_FILE.test(file) && !TEST_FILE.test(file));

const cycleCounts = (): Record<string, number> => {
  if (!existsSync(BASELINE_PATH)) return {};
  const counts: Record<string, number> = {};
  const baseline: {
    rule?: { name?: string };
    cycle?: { name: string }[];
    from?: string;
  }[] = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
  for (const entry of baseline) {
    if (entry.rule?.name !== "no-circular") continue;
    for (const hop of entry.cycle ?? [{ name: entry.from ?? "" }])
      counts[hop.name] = (counts[hop.name] ?? 0) + 1;
  }
  return counts;
};

const buildGraph = (): FsaFileGraph => {
  const files = listFeatureFiles();
  const edges: Record<string, string[]> = {};
  for (const file of files) {
    const targets = new Set<string>();
    for (const { specifier } of parseImportStatements(
      readFileSync(file, "utf8"),
    )) {
      const resolved = resolveImport(file, specifier);
      if (resolved === null) continue;
      const match = files.find(
        (candidate) =>
          candidate === `${resolved}.ts` ||
          candidate === `${resolved}.tsx` ||
          candidate.startsWith(`${resolved}/index.`),
      );
      if (match) targets.add(match);
    }
    edges[file] = [...targets];
  }
  return { files, edges, cycleCounts: cycleCounts() };
};

const [command = "next", unit, extra] = process.argv.slice(2);
const state = readState();

if (command === "done" && unit) {
  writeState({
    ...state,
    completed: [...state.completed, unit],
    rounds: [
      ...state.rounds,
      { unit, sha: extra ?? "", at: new Date().toISOString() },
    ],
  });
  console.log(`marked done: ${unit}`);
} else if (command === "block" && unit) {
  writeState({
    ...state,
    blocked: { ...state.blocked, [unit]: extra ?? "no reason given" },
  });
  console.log(`marked blocked: ${unit}`);
} else {
  const pick = pickNextUnit(buildGraph(), state);
  if (command === "status") {
    console.log(
      JSON.stringify(
        {
          completed: state.completed.length,
          blocked: Object.keys(state.blocked).length,
          next: pick,
        },
        null,
        2,
      ),
    );
  } else {
    console.log(JSON.stringify(pick, null, 2));
  }
}
