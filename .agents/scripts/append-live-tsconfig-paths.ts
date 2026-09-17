import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../..",
);

const slugs = [
  "local-server",
  "shell",
  "home",
  "tasks",
  "projects",
  "harness",
  "knowledge",
  "memory",
  "writer-settings",
  "status-health",
  "diagnostics",
  "automations",
];

const livePaths: Record<string, string[]> = {};
for (const slug of slugs) {
  const base = `./apps/live/features/${slug}/public-api`;
  livePaths[`@agent-witch/live-${slug}`] = [`${base}/infrastructure.ts`];
  livePaths[`@agent-witch/live-${slug}/types`] = [`${base}/types.ts`];
  livePaths[`@agent-witch/live-${slug}/presentation`] = [
    `${base}/presentation.ts`,
  ];
}

const tsconfigPath = path.join(ROOT, "tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8")) as {
  compilerOptions: { paths: Record<string, string[]> };
};
tsconfig.compilerOptions.paths = {
  ...tsconfig.compilerOptions.paths,
  ...livePaths,
};
fs.writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);

const vitestPath = path.join(ROOT, "vitest.resolveAlias.ts");
let vitestSource = fs.readFileSync(vitestPath, "utf8");
const insertMarker = '  "@": path.resolve(ROOT, "./src"),';
const liveVitestEntries = slugs
  .flatMap((slug) => {
    const featureRoot = path.join(
      ROOT,
      `apps/live/features/${slug}/public-api`,
    );
    return [
      `  "@agent-witch/live-${slug}": path.resolve(ROOT, "./apps/live/features/${slug}/public-api/infrastructure.ts"),`,
      `  "@agent-witch/live-${slug}/types": path.resolve(ROOT, "./apps/live/features/${slug}/public-api/types.ts"),`,
      `  "@agent-witch/live-${slug}/presentation": path.resolve(ROOT, "./apps/live/features/${slug}/public-api/presentation.ts"),`,
    ];
  })
  .join("\n");

if (!vitestSource.includes("@agent-witch/live-local-server")) {
  vitestSource = vitestSource.replace(
    insertMarker,
    `${liveVitestEntries}\n${insertMarker}`,
  );
  fs.writeFileSync(vitestPath, vitestSource);
}

process.stdout.write("Updated tsconfig + vitest live paths\n");
