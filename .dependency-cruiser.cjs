/**
 * Import-graph guard for Fractal Slice Architecture (ADR 0007).
 * Cycles + boundary rules. Known pre-existing violations live in
 * .agents/fsa/depcruise-baseline.json and are tolerated; anything new fails.
 *
 * Run: npm run fsa:deps          (new violations only)
 *      npm run fsa:deps:baseline (regenerate baseline; only after a round pays debt down)
 */
const completed = (() => {
  try {
    // CommonJS config file: require() is the only synchronous JSON read here.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./.agents/fsa/state.json").completed ?? [];
  } catch {
    return [];
  }
})();

/** Ratchet: once a unit is migrated, nobody may deep-import its non-public files again. */
const ratchetRules = completed
  .filter((unit) => !unit.includes("#"))
  .map((unit) => ({
    name: `fsa-ratchet-${unit.replace(/[^a-z0-9]+/gi, "-")}`,
    comment: `${unit} is FSA-migrated: import it only through its public-api/.`,
    severity: "error",
    from: { pathNot: `^${unit}/` },
    to: { path: `^${unit}/`, pathNot: `^${unit}/public-api/` },
  }));

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      comment: "Import cycles make slices impossible to extract or delete.",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "fsa-no-cross-feature-internal",
      comment:
        "Feature A must not import feature B's internal/. Use B's public-api/.",
      severity: "error",
      from: { path: "^src/features/([^/]+)/" },
      to: {
        path: "^src/features/([^/]+)/.*internal/",
        pathNot: "^src/features/$1/",
      },
    },
    {
      name: "fsa-shared-must-not-import-features",
      comment:
        "src/lib, src/components, src/hubs are below features (hub never depends on a feature).",
      severity: "error",
      from: { path: "^src/(lib|components|hubs)/" },
      to: { path: "^src/features/" },
    },
    {
      name: "fsa-public-api-infra-not-in-client",
      comment:
        "Client code must not pull in public-api/infrastructure (server-only).",
      severity: "error",
      from: {
        path: "^src/(features|components|app)/.*\\.tsx$",
        pathNot:
          "\\.(test|spec)\\.tsx?$|/page\\.tsx$|/layout\\.tsx$|/route\\.ts$",
      },
      to: { path: "/public-api/infrastructure\\.ts$" },
    },
    ...ratchetRules,
  ],
  options: {
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(\\.test\\.|\\.stories\\.|/__tests__/|\\.d\\.ts$)" },
    includeOnly: "^(src|apps|packages)/",
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
    cache: {
      folder: "node_modules/.cache/dependency-cruiser",
      strategy: "content",
    },
  },
};
