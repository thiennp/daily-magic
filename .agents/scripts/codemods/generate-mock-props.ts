import path from "node:path";
import { fileURLToPath } from "node:url";

import { generateMockPropScenarios, getProps } from "./write-component-test";

function getRepoRoot(): string {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
  );
}

const componentPath = process.argv[2];
if (!componentPath) {
  console.error(
    "Usage: npx tsx .agents/scripts/codemods/generate-mock-props.ts <path-to-component.tsx>",
  );
  process.exit(1);
}

const repoRoot = getRepoRoot();
const resolved = path.isAbsolute(componentPath)
  ? componentPath
  : path.resolve(repoRoot, componentPath);

const propsTree = getProps(resolved);
const scenarios = generateMockPropScenarios(propsTree);
console.log(JSON.stringify({ propsTree, scenarios }, null, 2));
