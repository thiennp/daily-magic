/**
 * Runs rule-verification scripts. Use after code changes and before commit.
 * Run: pnpm run cursor:verify [--all] [--skip-architecture]
 *
 * Default: architecture checks on changed app/ files only (fast; safe for hooks/CI).
 * --all: full-repo barrel and utility naming audit (legacy; slow).
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../..");
const SCRIPTS_DIR = path.join(APP_ROOT, ".agents", "scripts");

const argv = new Set(process.argv.slice(2));

const run = (script: string, args: readonly string[] = []): boolean => {
  const argString = args.length > 0 ? ` ${args.join(" ")}` : "";
  try {
    execSync(`pnpm exec tsx "${path.join(SCRIPTS_DIR, script)}"${argString}`, {
      stdio: "inherit",
      cwd: APP_ROOT,
    });
    return true;
  } catch {
    return false;
  }
};

function main(): void {
  let ok = true;

  if (!argv.has("--skip-architecture")) {
    const architectureArgs = argv.has("--all")
      ? ["--all"]
      : argv.has("--staged")
        ? ["--staged"]
        : argv.has("--base")
          ? [...process.argv.slice(2).filter((arg) => arg.startsWith("--base"))]
          : [];
    ok = run("architecture-check.ts", architectureArgs) && ok;
  }

  if (argv.has("--all")) {
    ok = run("barrel-allowlist.ts") && ok;
    ok = run("utility-naming.ts") && ok;
  }

  if (!ok) {
    process.exit(1);
  }
}

main();
