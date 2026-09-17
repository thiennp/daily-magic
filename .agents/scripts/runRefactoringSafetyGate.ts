/**
 * Refactoring safety gate — tiered tests + static checks before AWC/AWL/AWB/AWI moves.
 *
 * npm run test:safety
 * npm run test:safety -- --tier=standard
 * npm run test:safety -- --deployable=AWL
 * npm run test:safety -- --list
 */
import { spawnSync } from "node:child_process";

import {
  getAppRoot,
  loadRefactoringSafetyManifest,
  type RefactoringSafetyTierName,
} from "./lib/loadRefactoringSafetyManifest";

const argv = process.argv.slice(2);

const readFlag = (name: string): string | null => {
  const eq = argv.find((arg) => arg.startsWith(`${name}=`));
  if (eq) {
    return eq.slice(name.length + 1);
  }
  const idx = argv.indexOf(name);
  if (idx >= 0 && argv[idx + 1] && !argv[idx + 1].startsWith("--")) {
    return argv[idx + 1];
  }
  return null;
};

const hasFlag = (name: string): boolean => argv.includes(name);

const runCommand = (command: string): void => {
  process.stdout.write(`\n▶ ${command}\n`);
  const result = spawnSync(command, {
    cwd: getAppRoot(),
    shell: true,
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const runVitestConfig = (configFile: string, env?: NodeJS.ProcessEnv): void => {
  process.stdout.write(`\n▶ vitest run --config ${configFile}\n`);
  const result = spawnSync("npx", ["vitest", "run", "--config", configFile], {
    cwd: getAppRoot(),
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const printList = (): void => {
  const manifest = loadRefactoringSafetyManifest();
  process.stdout.write(`${manifest.description}\n\n`);
  for (const [key, tier] of Object.entries(manifest.tiers)) {
    process.stdout.write(`## tier:${key} — ${tier.label}\n${tier.when}\n`);
    if (tier.vitestConfig) {
      process.stdout.write(`vitest: ${tier.vitestConfig}\n`);
    } else {
      process.stdout.write("vitest: (full npm test via npmScripts)\n");
    }
    tier.npmScripts.forEach((s) => process.stdout.write(`  - ${s}\n`));
    process.stdout.write("\n");
  }
  process.stdout.write(
    "## deployable filters (--deployable=AWC|AWL|AWB|AWI)\n",
  );
  Object.entries(manifest.deployables).forEach(([id, block]) => {
    process.stdout.write(`${id}:\n`);
    block.vitest.forEach((p) => process.stdout.write(`  - ${p}\n`));
  });
};

const main = (): void => {
  if (hasFlag("--list")) {
    printList();
    return;
  }

  const deployable = readFlag("--deployable");
  const tierRaw = readFlag("--tier") ?? "fast";
  const tier = tierRaw as RefactoringSafetyTierName;

  const manifest = loadRefactoringSafetyManifest();

  if (deployable) {
    if (!manifest.deployables[deployable]) {
      process.stderr.write(
        `Unknown deployable ${deployable}. Use AWC, AWL, AWB, or AWI.\n`,
      );
      process.exit(1);
    }
    runVitestConfig("vitest.refactoring-safety.deployable.config.ts", {
      REFACTORING_SAFETY_DEPLOYABLE: deployable,
    });
    return;
  }

  const tierConfig = manifest.tiers[tier];
  if (!tierConfig) {
    process.stderr.write(
      `Unknown tier: ${tierRaw}. Use fast, standard, or full.\n`,
    );
    process.exit(1);
  }

  process.stdout.write(
    `Refactoring safety gate — ${tier} (${tierConfig.label})\n`,
  );

  if (tier === "fast") {
    runVitestConfig("vitest.refactoring-safety.fast.config.ts");
  } else if (tier === "standard") {
    runVitestConfig("vitest.refactoring-safety.standard.config.ts");
  }

  tierConfig.npmScripts.forEach((script) => runCommand(script));

  process.stdout.write("\n✅ Refactoring safety gate passed.\n");
};

main();
