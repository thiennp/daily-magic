/**
 * Cycle burn-down driver: one runtime import cycle per round.
 *
 *   npm run fsa:cycle                    -> shortest unblocked cycle (JSON) or {"kind":"done"}
 *   npm run fsa:cycle -- count           -> remaining / blocked counts
 *   npm run fsa:cycle -- block <key> "<reason>"
 *
 * Cycles come from dependency-cruiser with the baseline ignored; blocked keys live in .agents/fsa/cycles.json.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const BLOCKED_PATH = ".agents/fsa/cycles.json";

type Blocked = Record<string, string>;
type Cycle = { readonly key: string; readonly files: readonly string[] };

const readBlocked = (): Blocked =>
  existsSync(BLOCKED_PATH)
    ? JSON.parse(readFileSync(BLOCKED_PATH, "utf8"))
    : {};

const listCycles = (): readonly Cycle[] => {
  const raw = execFileSync(
    "npx",
    [
      "depcruise",
      "src",
      "--config",
      ".dependency-cruiser.cjs",
      "--no-ignore-known",
      "--output-type",
      "json",
    ],
    {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    },
  ).toString();
  const violations: { rule: { name: string }; cycle?: { name: string }[] }[] =
    JSON.parse(raw.slice(raw.indexOf("{"))).summary.violations;
  const byKey = new Map<string, Cycle>();
  for (const violation of violations) {
    if (violation.rule.name !== "no-circular" || !violation.cycle) continue;
    const files = violation.cycle.map((hop) => hop.name);
    const key = [...files].sort().join("|");
    if (!byKey.has(key)) byKey.set(key, { key, files });
  }
  return [...byKey.values()].sort(
    (a, b) => a.files.length - b.files.length || a.key.localeCompare(b.key),
  );
};

const [command = "next", key, reason] = process.argv.slice(2);
const blocked = readBlocked();

if (command === "block" && key) {
  writeFileSync(
    BLOCKED_PATH,
    `${JSON.stringify({ ...blocked, [key]: reason ?? "no reason given" }, null, 2)}\n`,
  );
  console.log(`blocked cycle ${key}`);
} else {
  const cycles = listCycles();
  const open = cycles.filter((cycle) => !(cycle.key in blocked));
  if (command === "count")
    console.log(
      JSON.stringify({
        total: cycles.length,
        open: open.length,
        blocked: cycles.length - open.length,
      }),
    );
  else
    console.log(
      JSON.stringify(
        open[0]
          ? { kind: "cycle", ...open[0], remaining: open.length }
          : { kind: "done" },
        null,
        2,
      ),
    );
}
