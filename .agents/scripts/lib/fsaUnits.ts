import path from "node:path";

/** One FSA migration unit: a directory under src/features (or a container's loose files). */
export type FsaUnitMetrics = {
  readonly unit: string;
  readonly files: number;
  readonly importers: number;
  readonly outbound: number;
  readonly cycles: number;
};

export type FsaState = {
  readonly completed: readonly string[];
  readonly blocked: Readonly<Record<string, string>>;
  readonly rounds: readonly {
    readonly unit: string;
    readonly sha: string;
    readonly at: string;
  }[];
};

export type FsaLimits = {
  readonly maxFiles: number;
  readonly maxImporters: number;
};

export const DEFAULT_LIMITS: FsaLimits = { maxFiles: 60, maxImporters: 25 };

export type FsaFileGraph = {
  /** every non-test source file under src/features, repo-relative */
  readonly files: readonly string[];
  /** repo-relative importer file -> repo-relative imported files (resolved, inside src/features only) */
  readonly edges: Readonly<Record<string, readonly string[]>>;
  /** repo-relative file -> number of baseline cycles it participates in */
  readonly cycleCounts: Readonly<Record<string, number>>;
};

export type FsaPick =
  | {
      readonly kind: "unit";
      readonly metrics: FsaUnitMetrics;
      readonly pending: number;
    }
  | {
      readonly kind: "needs-human";
      readonly unit: string;
      readonly reason: string;
      readonly pending: number;
    }
  | { readonly kind: "done" };

const FEATURES_ROOT = "src/features";

export const resolveImport = (
  fromFile: string,
  specifier: string,
): string | null => {
  const base = specifier.startsWith("@/")
    ? path.posix.join("src", specifier.slice(2))
    : specifier.startsWith(".")
      ? path.posix.join(path.posix.dirname(fromFile), specifier)
      : null;
  return base !== null && base.startsWith(`${FEATURES_ROOT}/`) ? base : null;
};

const isInside = (file: string, dir: string): boolean =>
  file.startsWith(`${dir}/`);

const childDirs = (
  files: readonly string[],
  dir: string,
): readonly string[] => {
  const names = new Set<string>();
  for (const file of files) {
    if (!isInside(file, dir)) continue;
    const rest = file.slice(dir.length + 1);
    const slash = rest.indexOf("/");
    if (slash > 0) names.add(rest.slice(0, slash));
  }
  return [...names]
    .filter(
      (name) =>
        name !== "public-api" && name !== "internal" && !name.startsWith("_"),
    )
    .sort()
    .map((name) => `${dir}/${name}`);
};

const looseFiles = (files: readonly string[], dir: string): readonly string[] =>
  files.filter(
    (file) => isInside(file, dir) && !file.slice(dir.length + 1).includes("/"),
  );

const metricsFor = (
  unit: string,
  members: readonly string[],
  graph: FsaFileGraph,
): FsaUnitMetrics => {
  const memberSet = new Set(members);
  const importers = new Set<string>();
  let outbound = 0;
  for (const [from, targets] of Object.entries(graph.edges)) {
    const fromIn = memberSet.has(from);
    for (const target of targets) {
      const targetIn = memberSet.has(target);
      if (!fromIn && targetIn) importers.add(from);
      if (fromIn && !targetIn) outbound += 1;
    }
  }
  const cycles = members.reduce(
    (sum, file) => sum + (graph.cycleCounts[file] ?? 0),
    0,
  );
  return {
    unit,
    files: members.length,
    importers: importers.size,
    outbound,
    cycles,
  };
};

/** Lower is safer. Importers and cycles weigh most: they are what a round has to touch or untangle. */
export const riskScore = (m: FsaUnitMetrics): number =>
  m.files + 2 * m.importers + 5 * m.outbound + 10 * m.cycles;

const hasPublicApi = (files: readonly string[], dir: string): boolean =>
  files.some((file) => isInside(file, `${dir}/public-api`));

type Candidate = {
  readonly metrics: FsaUnitMetrics;
  readonly isLoose: boolean;
};

const collectCandidates = (
  graph: FsaFileGraph,
  state: FsaState,
  limits: FsaLimits,
  dir: string,
  out: Candidate[],
  humanStops: { unit: string; reason: string }[],
): void => {
  if (
    state.completed.includes(dir) ||
    dir in state.blocked ||
    hasPublicApi(graph.files, dir)
  )
    return;
  const members = graph.files.filter((file) => isInside(file, dir));
  const metrics = metricsFor(dir, members, graph);
  const fits =
    metrics.files <= limits.maxFiles &&
    metrics.importers <= limits.maxImporters;
  const children = childDirs(graph.files, dir);
  if (fits || children.length === 0) {
    if (fits) out.push({ metrics, isLoose: false });
    else
      humanStops.push({
        unit: dir,
        reason: `${metrics.files} files / ${metrics.importers} importers, no sub-folders to split`,
      });
    return;
  }
  const before = out.length + humanStops.length;
  for (const child of children)
    collectCandidates(graph, state, limits, child, out, humanStops);
  const childrenPending = out.length + humanStops.length > before;
  const loose = looseFiles(graph.files, dir);
  const looseUnit = `${dir}#root`;
  if (
    !childrenPending &&
    loose.length > 0 &&
    !state.completed.includes(looseUnit) &&
    !(looseUnit in state.blocked)
  ) {
    const looseMetrics = metricsFor(`${dir}#root`, loose, graph);
    if (
      looseMetrics.files <= limits.maxFiles &&
      looseMetrics.importers <= limits.maxImporters
    )
      out.push({ metrics: looseMetrics, isLoose: true });
    else
      humanStops.push({
        unit: `${dir}#root`,
        reason: `${looseMetrics.files} loose files / ${looseMetrics.importers} importers: group them into a sub-folder first`,
      });
  }
};

/** Pick exactly one unit: the lowest-risk pending leaf. Containers are only reached by their children finishing. */
export const pickNextUnit = (
  graph: FsaFileGraph,
  state: FsaState,
  limits: FsaLimits = DEFAULT_LIMITS,
): FsaPick => {
  const candidates: Candidate[] = [];
  const humanStops: { unit: string; reason: string }[] = [];
  for (const slug of childDirs(graph.files, FEATURES_ROOT))
    collectCandidates(graph, state, limits, slug, candidates, humanStops);
  const ranked = [...candidates].sort(
    (a, b) =>
      riskScore(a.metrics) - riskScore(b.metrics) ||
      a.metrics.unit.localeCompare(b.metrics.unit),
  );
  const [best] = ranked;
  if (best)
    return { kind: "unit", metrics: best.metrics, pending: ranked.length };
  const [stop] = humanStops;
  return stop
    ? {
        kind: "needs-human",
        unit: stop.unit,
        reason: stop.reason,
        pending: humanStops.length,
      }
    : { kind: "done" };
};
