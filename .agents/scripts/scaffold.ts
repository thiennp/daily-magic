import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");

type ScaffoldKind =
  | "component"
  | "constant"
  | "enum"
  | "hook"
  | "layout"
  | "mock"
  | "store"
  | "style"
  | "test"
  | "type"
  | "utility";

const KINDS: readonly ScaffoldKind[] = [
  "component",
  "constant",
  "enum",
  "hook",
  "layout",
  "mock",
  "store",
  "style",
  "test",
  "type",
  "utility",
] as const;

const USAGE = `Usage: pnpm scaffold <kind> <name> [options]

Options:
  --base <dir>   Directory relative to repo root (overrides default for this kind)
  --dry-run      Print paths and contents; do not write files
  --force        Overwrite existing files
  --list-kinds   Print supported kinds and exit

Examples:
  pnpm scaffold component TariffBadge
  pnpm scaffold hook useTariffScroll --base app/pages/Result/features/Tariff/hooks
  pnpm scaffold store FilterState
  pnpm scaffold enum SortDirection
  pnpm scaffold test TariffBadge --base app/components/TariffBadge
`;

function printKinds(): void {
  console.log("Supported kinds:");
  for (const k of KINDS) {
    console.log(`  - ${k}`);
  }
}

function toPascalCase(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  if (cleaned.length === 0) {
    throw new Error("Name must contain letters or numbers.");
  }
  return cleaned
    .split(/\s+/)
    .map((part) =>
      part.length === 0 ? "" : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join("");
}

function ensureHookName(raw: string): string {
  const stripped = raw.replace(/^use/i, "");
  const pascal = toPascalCase(stripped);
  return `use${pascal}`;
}

function storeFolderName(pascal: string): string {
  return `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}Store`;
}

function storeHookName(pascal: string): string {
  return `use${pascal}Store`;
}

function storeStateName(pascal: string): string {
  return `${pascal}StoreState`;
}

function setterName(pascal: string): string {
  return `set${pascal}Items`;
}

interface WritePlan {
  readonly relativePath: string;
  readonly contents: string;
}

function planComponent(pascal: string, baseDir: string): WritePlan[] {
  const block = pascal;
  const tsx = `import classNames from "classnames";
import type { ReactElement } from "react";

import styles from "./${pascal}.module.scss";

interface ${pascal}Props {
  readonly className?: string;
}

export default function ${pascal}(props: ${pascal}Props): ReactElement {
  return <div className={classNames(styles.${block}, props.className)} />;
}
`;
  const scss = `.${block} {
}
`;
  const test = `import { render } from "@testing-library/react";
import { createSnapshotRootElm } from "test-utils/createSnapshotRootElm";
import { describe, expect, it } from "vitest";

import ${pascal} from "./${pascal}";

describe("${pascal}", () => {
  it("renders correctly", (): void => {
    render(<${pascal} />);
    expect(createSnapshotRootElm()).toMatchSnapshot();
  });
});
`;
  return [
    { relativePath: path.join(baseDir, `${pascal}.tsx`), contents: tsx },
    {
      relativePath: path.join(baseDir, `${pascal}.module.scss`),
      contents: scss,
    },
    { relativePath: path.join(baseDir, `${pascal}.test.tsx`), contents: test },
  ];
}

function planHook(hookName: string, baseDir: string): WritePlan[] {
  const contents = `import { useState } from "react";

export const ${hookName} = (): string => {
  const [value] = useState("");
  return value;
};
`;
  return [{ relativePath: path.join(baseDir, `${hookName}.ts`), contents }];
}

function toScreamingSnakeFromPascal(pascal: string): string {
  return pascal
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();
}

function planConstant(pascal: string, baseDir: string): WritePlan[] {
  const key = toScreamingSnakeFromPascal(pascal);
  const contents = `export const ${key} = "";
`;
  const fileName = `${pascal}.constant.ts`;
  return [{ relativePath: path.join(baseDir, fileName), contents }];
}

function planEnum(pascal: string, baseDir: string): WritePlan[] {
  const enumName = `${pascal}Enum`;
  const contents = `export enum ${enumName} {
  PLACEHOLDER = "placeholder",
}
`;
  const fileName = `${pascal}.enum.ts`;
  return [{ relativePath: path.join(baseDir, fileName), contents }];
}

function planStore(pascal: string, baseDir: string): WritePlan[] {
  const hook = storeHookName(pascal);
  const state = storeStateName(pascal);
  const setter = setterName(pascal);
  const contents = `import { create } from "zustand";

interface ${state} {
  readonly items: readonly string[];
}

export const ${hook} = create<${state}>(() => ({
  items: [],
}));

export const ${setter} = (items: readonly string[]): void => {
  ${hook}.setState({ items });
};
`;
  return [{ relativePath: path.join(baseDir, `${hook}.ts`), contents }];
}

function planLayout(pascal: string, baseDir: string): WritePlan[] {
  const name = pascal.endsWith("Layout") ? pascal : `${pascal}Layout`;
  const block = name;
  const tsx = `import type { ReactElement, ReactNode } from "react";

import styles from "./${name}.module.scss";

interface ${name}Props {
  readonly children: ReactNode;
}

export default function ${name}(props: ${name}Props): ReactElement {
  return <div className={styles.${block}}>{props.children}</div>;
}
`;
  const scss = `.${block} {
}
`;
  return [
    { relativePath: path.join(baseDir, `${name}.tsx`), contents: tsx },
    { relativePath: path.join(baseDir, `${name}.module.scss`), contents: scss },
  ];
}

function planType(pascal: string, baseDir: string): WritePlan[] {
  const contents = `export interface ${pascal} {
  readonly id: string;
}
`;
  const fileName = `${pascal}.type.ts`;
  return [{ relativePath: path.join(baseDir, fileName), contents }];
}

function planMock(pascal: string, baseDir: string): WritePlan[] {
  const constName = `MOCK_${pascal.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase()}`;
  const contents = `export const ${constName} = {} as const;
`;
  const fileName = `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}.mock.ts`;
  return [{ relativePath: path.join(baseDir, fileName), contents }];
}

function planUtility(camelName: string, baseDir: string): WritePlan[] {
  const contents = `const ${camelName} = (): string => "";

export default ${camelName};
`;
  return [{ relativePath: path.join(baseDir, `${camelName}.ts`), contents }];
}

function planStyle(pascal: string, baseDir: string): WritePlan[] {
  const block = pascal;
  const scss = `.${block} {
}
`;
  return [
    {
      relativePath: path.join(baseDir, `${pascal}.module.scss`),
      contents: scss,
    },
  ];
}

function planTest(pascal: string, baseDir: string): WritePlan[] {
  const test = `import { render } from "@testing-library/react";
import { createSnapshotRootElm } from "test-utils/createSnapshotRootElm";
import { describe, expect, it } from "vitest";

import ${pascal} from "./${pascal}";

describe("${pascal}", () => {
  it("renders correctly", (): void => {
    render(<${pascal} />);
    expect(createSnapshotRootElm()).toMatchSnapshot();
  });
});
`;
  return [
    { relativePath: path.join(baseDir, `${pascal}.test.tsx`), contents: test },
  ];
}

function defaultBase(kind: ScaffoldKind, pascal: string): string {
  const table: Record<ScaffoldKind, string> = {
    component: path.join("app", "components", pascal),
    constant: path.join("app", "constants"),
    enum: path.join("app", "enums"),
    hook: path.join("app", "hooks"),
    layout: path.join("app", "layouts"),
    mock: path.join("app", "mocks"),
    store: path.join("app", "stores", storeFolderName(pascal)),
    style: path.join("app", "components", pascal),
    test: path.join("app", "components", pascal),
    type: path.join("app", "types"),
    utility: path.join("app", "utils"),
  };
  return table[kind];
}

function parseArgs(argv: readonly string[]): {
  readonly listKinds: boolean;
  readonly kind?: ScaffoldKind;
  readonly name?: string;
  readonly base?: string;
  readonly dryRun: boolean;
  readonly force: boolean;
} {
  const listKinds = argv.includes("--list-kinds");
  const dryRun = argv.includes("--dry-run");
  const force = argv.includes("--force");
  const tokens = argv.filter(
    (a) => a !== "--dry-run" && a !== "--force" && a !== "--list-kinds",
  );
  let base: string | undefined;
  const baseIdx = tokens.indexOf("--base");
  const rest = [...tokens];
  if (baseIdx >= 0) {
    const next = rest[baseIdx + 1];
    if (!next || next.startsWith("--")) {
      throw new Error("--base requires a directory path.");
    }
    base = next;
    rest.splice(baseIdx, 2);
  }
  const positional = rest.filter((a) => !a.startsWith("--"));
  const kind = positional[0] as ScaffoldKind | undefined;
  const name = positional[1];
  return { listKinds, kind, name, base, dryRun, force };
}

function assertKind(k: string): asserts k is ScaffoldKind {
  if (!KINDS.includes(k as ScaffoldKind)) {
    throw new Error(`Unknown kind "${k}". Use --list-kinds.`);
  }
}

function writePlans(
  plans: readonly WritePlan[],
  options: { readonly dryRun: boolean; readonly force: boolean },
): void {
  for (const plan of plans) {
    const abs = path.join(REPO_ROOT, plan.relativePath);
    if (existsSync(abs) && !options.force) {
      throw new Error(
        `Refusing to overwrite existing file (use --force): ${plan.relativePath}`,
      );
    }
  }
  if (options.dryRun) {
    for (const plan of plans) {
      console.log(`--- ${plan.relativePath} ---`);
      console.log(plan.contents);
    }
    return;
  }
  for (const plan of plans) {
    const abs = path.join(REPO_ROOT, plan.relativePath);
    mkdirSync(path.dirname(abs), { recursive: true });
    writeFileSync(abs, plan.contents, "utf8");
    console.log(`Wrote ${plan.relativePath}`);
  }
}

function main(): void {
  const argv = process.argv.slice(2);
  const parsed = parseArgs(argv);
  if (parsed.listKinds) {
    printKinds();
    process.exit(0);
  }
  if (parsed.kind === undefined || parsed.name === undefined) {
    console.error(USAGE);
    process.exit(1);
  }
  assertKind(parsed.kind);
  const rawName = parsed.name;
  const kind = parsed.kind;

  if (kind === "hook") {
    const hookName = ensureHookName(rawName);
    const base = parsed.base ?? defaultBase(kind, "");
    const plans = planHook(hookName, base);
    writePlans(plans, { dryRun: parsed.dryRun, force: parsed.force });
    return;
  }

  const pascal = toPascalCase(rawName);

  if (kind === "utility") {
    const camel = `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}`;
    const base = parsed.base ?? defaultBase(kind, pascal);
    const plans = planUtility(camel, base);
    writePlans(plans, { dryRun: parsed.dryRun, force: parsed.force });
    return;
  }

  const base = parsed.base ?? defaultBase(kind, pascal);

  const plans = ((): WritePlan[] => {
    switch (kind) {
      case "component":
        return planComponent(pascal, base);
      case "constant":
        return planConstant(pascal, base);
      case "enum":
        return planEnum(pascal, base);
      case "store":
        return planStore(pascal, base);
      case "layout":
        return planLayout(pascal, base);
      case "type":
        return planType(pascal, base);
      case "mock":
        return planMock(pascal, base);
      case "style":
        return planStyle(pascal, base);
      case "test":
        return planTest(pascal, base);
      default: {
        const _exhaustive: never = kind;
        return _exhaustive;
      }
    }
  })();

  writePlans(plans, { dryRun: parsed.dryRun, force: parsed.force });
}

main();
