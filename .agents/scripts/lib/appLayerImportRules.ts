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
    id: "features-no-page-local-features",
    sourceLayer: /^features\//,
    forbiddenImport: /^pages\/[^/]+\/features\//,
    message:
      "app/features must not import page-local features (pages/.../features/). Lift shared logic to app/features or app/services.",
  },
  {
    id: "features-no-page-local-hooks",
    sourceLayer: /^features\//,
    forbiddenImport: /^pages\/[^/]+\/hooks\//,
    message:
      "app/features must not import page-local hooks under pages/.../hooks/.",
  },
  {
    id: "features-no-page-local-components",
    sourceLayer: /^features\//,
    forbiddenImport: /^pages\/[^/]+\/components\//,
    message:
      "app/features must not import page-local components under pages/.../components/.",
  },
  {
    id: "shared-no-page-local-features",
    sourceLayer:
      /^(components|stores|services|middleware|hooks|utils|subjects)\//,
    forbiddenImport: /^pages\/[^/]+\/features\//,
    message:
      "Shared app layers must not import page-local features (pages/.../features/).",
  },
  {
    id: "shared-no-page-local-components",
    sourceLayer:
      /^(components|stores|services|middleware|hooks|utils|subjects)\//,
    forbiddenImport: /^pages\/[^/]+\/components\//,
    message:
      "Shared app layers must not import page-local components (pages/.../components/).",
  },
  {
    id: "components-no-page-local-ui",
    sourceLayer: /^components\//,
    forbiddenImport: /^pages\/[^/]+\/(features|components)\//,
    message:
      "app/components must remain domain-agnostic; do not import page-local UI from pages/.../features or pages/.../components/.",
  },
];

const normalizeImportSpecifier = (specifier: string): string =>
  specifier.replace(/\\/g, "/");

export const findLayerImportViolations = (
  appRelativePath: string,
  imports: readonly ParsedImportStatement[],
): readonly LayerImportViolation[] => {
  const normalizedPath = appRelativePath
    .replace(/^app\//, "")
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
    return applicableRules.flatMap((rule) => {
      if (rule.allowTypeOnly === true && importStatement.isTypeOnly) {
        return [];
      }
      if (!rule.forbiddenImport.test(normalizedSpecifier)) {
        return [];
      }
      return [
        {
          file: appRelativePath,
          line: importStatement.line,
          specifier: importStatement.specifier,
          ruleId: rule.id,
          message: rule.message,
        },
      ];
    });
  });
};
