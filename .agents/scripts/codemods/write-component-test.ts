import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export interface PropNode {
  readonly name: string;
  readonly optional: boolean;
  readonly type: string;
  readonly children?: readonly PropNode[];
}

export interface PropsTree {
  readonly propsTypeName: string | null;
  readonly props: readonly PropNode[];
}

const CHILDREN_ARRAY_PLACEHOLDER = "__CHILDREN_ARRAY_PLACEHOLDER__" as const;
const NOOP_FN_PLACEHOLDER = "__NOOP_FN_PLACEHOLDER__" as const;

function isFunctionType(prop: PropNode): boolean {
  const t = prop.type.trim();
  return /\([^)]*\)\s*=>/.test(t) || /\bFunction\b/.test(t);
}

function getExampleValueForType(
  typeStr: string,
  prop?: PropNode,
  variant: "default" | "alt" = "default",
): unknown {
  const t = typeStr.trim();
  const name = prop?.name ?? "";
  if (/\bstring\b/.test(t)) {
    return variant === "alt"
      ? `Alternative value for ${name || "prop"}`
      : name
        ? `${name}: Lorem ipsum`
        : "Lorem ipsum dolor sit amet.";
  }
  if (/\bnumber\b/.test(t) || /PositiveNumber|NegativeNumber/.test(t)) {
    return variant === "alt" ? 1 : 0;
  }
  if (/\bboolean\b/.test(t)) return true;
  if (/\bReactNode\b|\bReactElement\b|JSX\.Element/.test(t)) {
    if (name === "children") return CHILDREN_ARRAY_PLACEHOLDER;
    return null;
  }
  if (/\([^)]*\)\s*=>/.test(t) || /\bFunction\b/.test(t))
    return NOOP_FN_PLACEHOLDER;
  if (/\bvoid\b/.test(t)) return undefined;
  if (/\[\]|Array\s*</.test(t)) return variant === "alt" ? ["item"] : [];
  if (/\bobject\b|\bRecord\s*</.test(t))
    return variant === "alt" ? { key: "value" } : {};
  if (/\bDTO\b|\bProps\b/.test(t))
    return variant === "alt" ? { key: "value" } : {};
  if (prop?.children?.length) {
    const obj: Record<string, unknown> = {};
    for (const c of prop.children) {
      obj[c.name] = getExampleValueForType(c.type, c, variant);
    }
    return obj;
  }
  return null;
}

function getValueCasesForProp(prop: PropNode): unknown[] {
  if (isFunctionType(prop)) {
    return [NOOP_FN_PLACEHOLDER];
  }
  const typeStr = prop.type;
  const optional = prop.optional;
  const isNullable = /\|\s*null\b|\bnull\s*\|/.test(typeStr);
  const isUndefined = /\|\s*undefined\b|\bundefined\s*\|/.test(typeStr);
  const isBoolean = /\bboolean\b/.test(typeStr);
  const example = getExampleValueForType(typeStr, prop, "default");
  const altExample = getExampleValueForType(typeStr, prop, "alt");
  const cases: unknown[] = [];
  if ((optional || isUndefined) && !isObjectOrArrayType(prop))
    cases.push(undefined);
  if (isBoolean) {
    cases.push(true);
    cases.push(false);
  }
  const needDefinedValue =
    (optional || isNullable || isUndefined) && !isBoolean
      ? true
      : !optional && !isNullable && !isBoolean;
  if (needDefinedValue && example !== undefined && !cases.includes(example)) {
    cases.push(example);
    if (
      altExample !== undefined &&
      altExample !== example &&
      JSON.stringify(altExample) !== JSON.stringify(example) &&
      !cases.includes(altExample)
    ) {
      cases.push(altExample);
    }
  }
  return cases.length ? cases : [null];
}

function scenarioKey(
  scenario: Record<string, unknown>,
  propOrder: readonly string[],
): string {
  const parts: string[] = [];
  for (const key of propOrder) {
    const value = scenario[key];
    if (value === undefined) continue;
    if (value === CHILDREN_ARRAY_PLACEHOLDER) {
      parts.push(`${key}=childrenArray`);
      continue;
    }
    if (value === NOOP_FN_PLACEHOLDER) {
      parts.push(`${key}=fn`);
      continue;
    }
    if (typeof value === "string") {
      parts.push(`${key}=${JSON.stringify(value)}`);
    } else if (typeof value === "number" || typeof value === "boolean") {
      parts.push(`${key}=${String(value)}`);
    } else if (value === null) {
      parts.push(`${key}=null`);
    } else if (Array.isArray(value)) {
      parts.push(`${key}=${JSON.stringify(value)}`);
    } else if (typeof value === "object" && value !== null) {
      parts.push(`${key}=${JSON.stringify(value)}`);
    }
  }
  return parts.join("|");
}

const OBJECT_LIKE_TYPE_PATTERN =
  /\b(DTO|Record|Props)\b|(?:DTO|Record|Props|Params|Config|Key|Options|Data)\b|\[\]|Array\s*</;

function isObjectOrArrayType(prop: PropNode): boolean {
  if (prop.children?.length) return true;
  const t = prop.type;
  return (
    OBJECT_LIKE_TYPE_PATTERN.test(t) || (/\bobject\b/.test(t) && !prop.optional)
  );
}

export function generateMockPropScenarios(
  propsTree: PropsTree,
): Record<string, unknown>[] {
  const { props } = propsTree;
  if (props.length === 0) return [{}];
  const propNames = props.map((p) => p.name);
  const defaultValues = new Map<string, unknown>();
  for (const p of props) {
    const cases = getValueCasesForProp(p);
    const first = cases[0];
    const useObjectDefault =
      isObjectOrArrayType(p) &&
      (first === null ||
        first === undefined ||
        (typeof first === "object" &&
          Object.keys(first as object).length === 0));
    defaultValues.set(
      p.name,
      useObjectDefault
        ? (getExampleValueForType(p.type, p, "default") ??
            (Array.isArray(first) ? [] : {}))
        : first,
    );
  }
  const baseline: Record<string, unknown> = {};
  for (const p of props) {
    baseline[p.name] = defaultValues.get(p.name);
  }
  const seen = new Set<string>();
  const scenarios: Record<string, unknown>[] = [];
  const addIfNew = (scenario: Record<string, unknown>): void => {
    const key = scenarioKey(scenario, propNames);
    if (seen.has(key)) return;
    seen.add(key);
    scenarios.push(scenario);
  };
  addIfNew(baseline);
  for (const prop of props) {
    const cases = getValueCasesForProp(prop);
    const defaultValue = defaultValues.get(prop.name);
    for (const value of cases) {
      if (value === defaultValue) continue;
      if (isObjectOrArrayType(prop) && (value === null || value === undefined))
        continue;
      const scenario: Record<string, unknown> = {};
      for (const p of props) {
        scenario[p.name] =
          p.name === prop.name ? value : defaultValues.get(p.name);
      }
      addIfNew(scenario);
    }
  }
  return scenarios.length ? scenarios : [baseline];
}

function scenarioToJsxPropsString(scenario: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(scenario)) {
    if (value === undefined) continue;
    if (key === "children" && value === CHILDREN_ARRAY_PLACEHOLDER) continue;
    if (value === NOOP_FN_PLACEHOLDER) {
      parts.push(key + "={(): void => {}}");
      continue;
    }
    if (typeof value === "string") {
      parts.push(`${key}={${JSON.stringify(value)}}`);
    } else if (typeof value === "number" || typeof value === "boolean") {
      parts.push(`${key}={${String(value)}}`);
    } else if (value === null) {
      parts.push(`${key}={null}`);
    } else if (Array.isArray(value)) {
      parts.push(`${key}={${JSON.stringify(value)}}`);
    } else if (typeof value === "object" && value !== null) {
      parts.push(`${key}={${JSON.stringify(value)}}`);
    }
  }
  return parts.join(" ");
}

function scenarioToDescriptionString(
  scenario: Record<string, unknown>,
  maxLength = 80,
): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(scenario)) {
    if (value === undefined) continue;
    if (key === "children" && value === CHILDREN_ARRAY_PLACEHOLDER) continue;
    if (value === NOOP_FN_PLACEHOLDER) {
      parts.push(`${key}: fn`);
      continue;
    }
    const valueStr =
      typeof value === "string"
        ? JSON.stringify(value)
        : typeof value === "number" || typeof value === "boolean"
          ? String(value)
          : value === null
            ? "null"
            : JSON.stringify(value);
    parts.push(`${key}: ${valueStr}`);
  }
  const raw = parts.length ? `(${parts.join(", ")})` : "()";
  return raw.length > maxLength ? `${raw.slice(0, maxLength - 3)}...)` : raw;
}

function getRepoRoot(): string {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "..",
    "..",
  );
}

function getPropsTypeReference(
  typeNode: ts.TypeNode | undefined,
  sourceFile: ts.SourceFile,
): ts.TypeReferenceNode | null {
  if (!typeNode) return null;
  if (ts.isTypeReferenceNode(typeNode)) return typeNode;
  if (
    ts.isIntersectionTypeNode(typeNode) &&
    typeNode.types[0] &&
    ts.isTypeReferenceNode(typeNode.types[0])
  ) {
    return typeNode.types[0];
  }
  return null;
}

function getPropNodesFromMembers(
  members: readonly ts.TypeElement[],
  sourceFile: ts.SourceFile,
): readonly PropNode[] {
  const nodes: PropNode[] = [];
  for (const member of members) {
    if (!ts.isPropertySignature(member)) continue;
    const memberFile = (member as ts.Node).getSourceFile?.() ?? sourceFile;
    const name = member.name;
    const nameText = ts.isIdentifier(name)
      ? name.text
      : ts.isComputedPropertyName(name)
        ? `[${name.expression.getText(memberFile)}]`
        : "";
    const optional = !!member.questionToken;
    const typeNode = member.type;
    const typeText = typeNode ? typeNode.getText(memberFile) : "unknown";
    if (typeNode && ts.isTypeLiteralNode(typeNode)) {
      const children = getPropNodesFromMembers(typeNode.members, memberFile);
      nodes.push({ name: nameText, optional, type: typeText, children });
    } else {
      nodes.push({ name: nameText, optional, type: typeText });
    }
  }
  return nodes;
}

function resolveImportedTypePath(
  sourceFile: ts.SourceFile,
  typeName: string,
  currentFilePath: string,
): string | null {
  const dir = path.dirname(currentFilePath);
  for (const stmt of sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const specifier = stmt.moduleSpecifier;
    if (!ts.isStringLiteral(specifier)) continue;
    const specifierText = specifier.text;
    if (!specifierText.startsWith(".")) continue;
    const clause = stmt.importClause;
    if (!clause) continue;
    let found = false;
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const el of clause.namedBindings.elements) {
        const name = el.propertyName
          ? el.propertyName.getText(sourceFile)
          : el.name.getText(sourceFile);
        if (name === typeName) {
          found = true;
          break;
        }
      }
    } else if (clause.name && clause.name.getText(sourceFile) === typeName) {
      found = true;
    }
    if (!found) continue;
    const base = path.resolve(dir, specifierText);
    if (fs.existsSync(`${base}.ts`) && fs.statSync(`${base}.ts`).isFile())
      return `${base}.ts`;
    if (fs.existsSync(`${base}.tsx`) && fs.statSync(`${base}.tsx`).isFile())
      return `${base}.tsx`;
    if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
      const indexTs = path.join(base, "index.ts");
      const indexTsx = path.join(base, "index.tsx");
      if (fs.existsSync(indexTs) && fs.statSync(indexTs).isFile())
        return indexTs;
      if (fs.existsSync(indexTsx) && fs.statSync(indexTsx).isFile())
        return indexTsx;
    }
    return null;
  }
  return null;
}

function getMergedMembersIncludingExtends(
  interfaceNode: ts.InterfaceDeclaration,
  sourceFile: ts.SourceFile,
  currentFilePath: string,
  resolvePath: (
    source: ts.SourceFile,
    typeName: string,
    filePath: string,
  ) => string | null,
): ts.TypeElement[] {
  const extendsClause = interfaceNode.heritageClauses?.find(
    (c) => c.token === ts.SyntaxKind.ExtendsKeyword,
  );
  if (!extendsClause?.types?.[0]) {
    return [...interfaceNode.members];
  }
  const firstBase = extendsClause.types[0];
  const baseTypeNameRaw = firstBase.getText(sourceFile).trim();
  const baseTypeName = baseTypeNameRaw.split("<")[0].trim() || null;
  if (!baseTypeName) return [...interfaceNode.members];
  const basePath = resolvePath(sourceFile, baseTypeName, currentFilePath);
  if (!basePath || !fs.existsSync(basePath)) return [...interfaceNode.members];
  const baseSource = fs.readFileSync(basePath, "utf8");
  const baseFile = ts.createSourceFile(
    path.basename(basePath),
    baseSource,
    ts.ScriptTarget.Latest,
    true,
    basePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  let baseMembers: readonly ts.TypeElement[] = [];
  baseFile.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === baseTypeName) {
      baseMembers = node.members;
    }
  });
  return [...baseMembers, ...interfaceNode.members];
}

type TypeDef = {
  members: readonly ts.TypeElement[];
  interfaceNode?: ts.InterfaceDeclaration;
};

function getPropsFromSource(
  source: string,
  currentFilePath?: string,
): PropsTree {
  const sourceFile = ts.createSourceFile(
    "component.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const typeByName = new Map<string, TypeDef>();
  let propsTypeName: string | null = null;

  function collectTypes(node: ts.Node): void {
    if (ts.isInterfaceDeclaration(node)) {
      typeByName.set(node.name.text, {
        members: node.members,
        interfaceNode: node,
      });
    }
    if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
      typeByName.set(node.name.text, { members: node.type.members });
    }
    ts.forEachChild(node, collectTypes);
  }
  sourceFile.forEachChild(collectTypes);

  function findPropsTypeName(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node) && node.parameters[0]) {
      const mods = ts.getModifiers(node);
      const hasExport = mods?.some(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword,
      );
      const hasDefault = mods?.some(
        (m) => m.kind === ts.SyntaxKind.DefaultKeyword,
      );
      if (hasExport && hasDefault) {
        const ref = getPropsTypeReference(node.parameters[0].type, sourceFile);
        if (ref) {
          propsTypeName = ref.typeName.getText(sourceFile);
          return;
        }
      }
    }
    if (ts.isExportAssignment(node)) {
      const expr = node.expression;
      if (ts.isIdentifier(expr)) {
        const targetName = expr.text;
        const stmts = sourceFile.statements;
        for (const stmt of stmts) {
          if (
            ts.isFunctionDeclaration(stmt) &&
            stmt.name?.getText(sourceFile) === targetName &&
            stmt.parameters[0]
          ) {
            const ref = getPropsTypeReference(
              stmt.parameters[0].type,
              sourceFile,
            );
            if (ref) {
              propsTypeName = ref.typeName.getText(sourceFile);
              return;
            }
          }
          if (ts.isVariableStatement(stmt)) {
            for (const decl of stmt.declarationList.declarations) {
              if (
                ts.isIdentifier(decl.name) &&
                decl.name.text === targetName &&
                decl.initializer
              ) {
                const init = decl.initializer;
                const innerFn =
                  ts.isArrowFunction(init) || ts.isFunctionExpression(init)
                    ? init
                    : ts.isCallExpression(init) && init.arguments[0]
                      ? ts.isArrowFunction(init.arguments[0]) ||
                        ts.isFunctionExpression(init.arguments[0])
                        ? init.arguments[0]
                        : null
                      : null;
                const ref = innerFn
                  ? getPropsTypeReference(
                      innerFn.parameters[0]?.type,
                      sourceFile,
                    )
                  : null;
                if (ref) {
                  propsTypeName = ref.typeName.getText(sourceFile);
                  return;
                }
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, findPropsTypeName);
  }
  sourceFile.forEachChild(findPropsTypeName);

  let typeDef = propsTypeName ? typeByName.get(propsTypeName) : null;
  let typeDefSourceFile = sourceFile;
  if (!typeDef && propsTypeName && currentFilePath) {
    const importedPath = resolveImportedTypePath(
      sourceFile,
      propsTypeName,
      currentFilePath,
    );
    if (importedPath && fs.existsSync(importedPath)) {
      const importedSource = fs.readFileSync(importedPath, "utf8");
      const importedFile = ts.createSourceFile(
        path.basename(importedPath),
        importedSource,
        ts.ScriptTarget.Latest,
        true,
        importedPath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const importedTypes = new Map<string, TypeDef>();
      function collectImportedTypes(node: ts.Node): void {
        if (ts.isInterfaceDeclaration(node)) {
          importedTypes.set(node.name.text, {
            members: node.members,
            interfaceNode: node,
          });
        }
        if (
          ts.isTypeAliasDeclaration(node) &&
          ts.isTypeLiteralNode(node.type)
        ) {
          importedTypes.set(node.name.text, { members: node.type.members });
        }
        ts.forEachChild(node, collectImportedTypes);
      }
      importedFile.forEachChild(collectImportedTypes);
      typeDef = importedTypes.get(propsTypeName) ?? null;
      typeDefSourceFile = importedFile;
      if (typeDef?.interfaceNode) {
        const merged = getMergedMembersIncludingExtends(
          typeDef.interfaceNode,
          importedFile,
          importedPath,
          resolveImportedTypePath,
        );
        if (merged.length > 0) {
          typeDef = { members: merged };
        }
      }
    }
  }
  const props = typeDef
    ? getPropNodesFromMembers(typeDef.members, typeDefSourceFile)
    : [];

  return { propsTypeName, props };
}

export function getProps(componentPath: string): PropsTree {
  const repoRoot = getRepoRoot();
  const resolved = path.isAbsolute(componentPath)
    ? path.resolve(componentPath)
    : path.resolve(repoRoot, componentPath);
  const source = fs.readFileSync(resolved, "utf8");
  return getPropsFromSource(source, resolved);
}

export function writeComponentTest(
  componentPath: string,
  options?: { readonly dryRun?: boolean },
): void {
  const repoRoot = getRepoRoot();
  const resolved = path.isAbsolute(componentPath)
    ? componentPath
    : path.resolve(repoRoot, componentPath);

  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    throw new Error(`File not found: ${componentPath}`);
  }

  if (!resolved.endsWith(".tsx")) {
    throw new Error(`Input must be a .tsx file: ${componentPath}`);
  }

  const componentDir = path.dirname(resolved);
  const componentBasename = path.basename(resolved, ".tsx");
  const componentIdentifier = componentBasename.includes(".")
    ? componentBasename
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
    : componentBasename;

  if (
    componentBasename.endsWith(".test") ||
    componentBasename.endsWith(".spec")
  ) {
    throw new Error(`Input appears to be a test file: ${componentPath}`);
  }

  const source = fs.readFileSync(resolved, "utf8");
  if (!/\bexport\s+default\b/.test(source)) {
    throw new Error(`No default export, skip snapshot test: ${componentPath}`);
  }

  const testPath = path.join(componentDir, `${componentBasename}.test.tsx`);
  const propsTree = getPropsFromSource(source, resolved);
  if (propsTree.props.some((p) => p.name === "form")) {
    throw new Error(`Has form prop, skip snapshot test: ${componentPath}`);
  }
  if (propsTree.props.some((p) => isObjectOrArrayType(p))) {
    throw new Error(
      `Has object/array props (cannot fill safely), skip snapshot test: ${componentPath}`,
    );
  }
  const scenarios = generateMockPropScenarios(propsTree);

  const hasChildrenProp = propsTree.props.some((p) => p.name === "children");
  const childrenContent = '{[<span key="0">placeholder</span>]}';
  const testCases = scenarios
    .map((scenario) => {
      const propsStr = scenarioToJsxPropsString(scenario);
      const propsAttr = propsStr ? ` ${propsStr}` : "";
      const propsDesc = scenarioToDescriptionString(scenario);
      const testName = `renders correctly ${propsDesc}`;
      const escapedTestName = testName
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');
      const componentJsx = hasChildrenProp
        ? `(\n      <${componentIdentifier}${propsAttr}>\n        ${childrenContent}\n      </${componentIdentifier}>\n    )`
        : `<${componentIdentifier}${propsAttr} />`;
      return `  it("${escapedTestName}", (): void => {
    render(${componentJsx});
    expect(createSnapshotRootElm()).toMatchSnapshot();
  });`;
    })
    .join("\n\n");

  const content = `/** @generated-by write-component-test.ts - do not edit by hand */\nimport { render } from "@testing-library/react";
import { createSnapshotRootElm } from "test-utils/createSnapshotRootElm";
import { describe, expect, it } from "vitest";
import React from "react";

import ${componentIdentifier} from "./${componentBasename}";

describe("${componentIdentifier}", () => {
${testCases}
});
`;

  if (options?.dryRun === true) {
    console.log(`[dry-run] would write: ${testPath}`);
    return;
  }
  fs.writeFileSync(testPath, content, "utf8");
  console.log(`Wrote: ${testPath}`);
}

const isEntry =
  process.argv[1] &&
  path.resolve(process.cwd(), process.argv[1]) ===
    fileURLToPath(import.meta.url);
if (isEntry) {
  const argv = process.argv.slice(2).filter((a) => a !== "--dry-run");
  const dryRun = process.argv.includes("--dry-run");
  const componentPath = argv[0];
  if (!componentPath) {
    console.error(
      "Usage: npx tsx .agents/scripts/codemods/write-component-test.ts <path-to-component.tsx> [--dry-run]",
    );
    process.exit(1);
  }
  try {
    const propsTree = getProps(componentPath);
    console.error("Props tree:", JSON.stringify(propsTree, null, 2));
    writeComponentTest(componentPath, { dryRun });
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
