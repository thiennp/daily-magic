export type DocReferenceProbe = {
  /** True when the path exists under the project folder. */
  readonly exists: (relPath: string) => boolean;
  /** True when the folder has this top-level entry (a directory or file). */
  readonly hasTopLevel: (name: string) => boolean;
  /** Script names from the folder's package.json, or null when it has none. */
  readonly scripts: ReadonlySet<string> | null;
};

const SPAN = /`([^`\n]+)`/g;
const LINK = /\]\(([^)\s#]+)(?:#[^)]*)?\)/g;
const PLACEHOLDER = /[<>*{}$|\s]/;
const FILE_PATH = /^[\w.@[\]-]+(?:\/[\w.@[\]-]+)+\.\w{1,5}$/;
const NPM_RUN = /\bnpm run ([\w][\w:.-]*[\w])/g;

const matches = (text: string, re: RegExp): readonly string[] =>
  [...text.matchAll(re)].map((m) => m[1] ?? "");

/**
 * Concrete references in a generated skill that no longer exist in the folder:
 * file paths (in backticks or links) and `npm run <script>` names. Only paths
 * whose first folder exists at the project root are checked, so a path that
 * is relative to some other folder, a placeholder or a glob is never flagged.
 */
export const findBrokenDocReferences = (
  markdown: string,
  probe: DocReferenceProbe,
): readonly string[] => {
  const paths = [
    ...matches(markdown, SPAN).filter((t) => FILE_PATH.test(t)),
    ...matches(markdown, LINK).filter((t) => !/^[a-z]+:/i.test(t)),
  ]
    .filter((p) => !PLACEHOLDER.test(p))
    .map((p) => p.replace(/^\.\//, ""))
    .filter((p) => probe.hasTopLevel(p.split("/")[0] ?? ""))
    .filter((p) => !probe.exists(p));
  const missingScripts =
    probe.scripts === null
      ? []
      : matches(markdown, NPM_RUN)
          .filter((name) => !probe.scripts?.has(name))
          .map((name) => `npm run ${name}`);
  return [...new Set([...paths, ...missingScripts])];
};
