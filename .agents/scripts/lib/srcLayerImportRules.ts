import type { ParsedImportStatement } from "./parseImportStatements";

export interface LayerImportViolation {
  readonly file: string;
  readonly line: number;
  readonly specifier: string;
  readonly ruleId: string;
  readonly message: string;
}

interface LayerImportRule {
  readonly id: string;
  readonly sourceLayer: RegExp;
  readonly forbiddenImport: RegExp;
  readonly message: string;
  readonly allowTypeOnly?: boolean;
}

const LAYER_IMPORT_RULES: readonly LayerImportRule[] = [
  {
    id: "features-no-app-routes",
    sourceLayer: /^features\//,
    forbiddenImport: /^app\//,
    message:
      "src/features must not import Next.js route modules from src/app/. Keep route wiring in app/ and domain logic in features/.",
  },
  {
    id: "components-no-app-routes",
    sourceLayer: /^components\//,
    forbiddenImport: /^app\//,
    message:
      "src/components must remain reusable UI. Do not import route modules from src/app/.",
  },
  {
    id: "components-no-feature-pages",
    sourceLayer: /^components\//,
    forbiddenImport: /^features\//,
    message:
      "src/components must not import feature modules. Pass data via props from app/ or features/.",
  },
  {
    id: "lib-no-app-or-features",
    sourceLayer: /^lib\//,
    forbiddenImport: /^(app|features|components)\//,
    message:
      "src/lib must stay framework-agnostic. Do not import app routes, features, or UI components.",
  },
];

const normalizeImportSpecifier = (specifier: string): string =>
  specifier.replace(/\\/g, "/");

export const findLayerImportViolations = (
  srcRelativePath: string,
  imports: readonly ParsedImportStatement[],
): readonly LayerImportViolation[] => {
  const normalizedPath = srcRelativePath
    .replace(/^src\//, "")
    .replace(/\\/g, "/");
  const applicableRules = LAYER_IMPORT_RULES.filter((rule) =>
    rule.sourceLayer.test(normalizedPath),
  );

  if (applicableRules.length === 0) {
    return [];
  }

  return imports.flatMap((importStatement) => {
    const normalizedSpecifier = normalizeImportSpecifier(
      importStatement.specifier,
    );
    const resolvedSpecifier = normalizedSpecifier.startsWith("@/")
      ? normalizedSpecifier.replace(/^@\//, "")
      : normalizedSpecifier;

    return applicableRules.flatMap((rule) => {
      if (rule.allowTypeOnly === true && importStatement.isTypeOnly) {
        return [];
      }
      if (!rule.forbiddenImport.test(resolvedSpecifier)) {
        return [];
      }
      return [
        {
          file: srcRelativePath,
          line: importStatement.line,
          specifier: importStatement.specifier,
          ruleId: rule.id,
          message: rule.message,
        },
      ];
    });
  });
};
