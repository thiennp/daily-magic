import { describe, expect, it } from "vitest";

import { findLayerImportViolations } from "./appLayerImportRules";
import { parseImportStatements } from "./parseImportStatements";

describe("parseImportStatements", () => {
  it("parses value and type-only imports", () => {
    const content = `
import { memo } from "react";
import type { ResultDTO } from "pages/Result/types/ResultDTO/ResultDTO.type";
import useReloadResult from "pages/Result/features/ReloadResult/hooks/useReloadResult";
`;

    expect(parseImportStatements(content)).toEqual([
      { specifier: "react", line: 2, isTypeOnly: false },
      {
        specifier: "pages/Result/types/ResultDTO/ResultDTO.type",
        line: 3,
        isTypeOnly: true,
      },
      {
        specifier: "pages/Result/features/ReloadResult/hooks/useReloadResult",
        line: 4,
        isTypeOnly: false,
      },
    ]);
  });
});

describe("findLayerImportViolations", () => {
  it("flags feature imports of page-local features", () => {
    const imports = parseImportStatements(
      'import { mergeUrlAndRedisParams } from "pages/Result/features/GetTariffDetails/utils/mergeUrlAndRedisParams";',
    );

    const violations = findLayerImportViolations(
      "app/features/GetTariffDetails/utils/getMergedParams/getMergedParams.ts",
      imports,
    );

    expect(violations).toHaveLength(1);
    expect(violations[0]?.ruleId).toBe("features-no-page-local-features");
  });

  it("allows type-only imports from page types when configured", () => {
    const imports = parseImportStatements(
      'import type { ResultDTO } from "pages/Result/types/ResultDTO/ResultDTO.type";',
    );

    const violations = findLayerImportViolations(
      "app/features/Chronicle/stores/useSetInitialChronicle.ts",
      imports,
    );

    expect(violations).toHaveLength(0);
  });

  it("flags shared components importing page-local UI", () => {
    const imports = parseImportStatements(
      'import TariffTileBoxDesktopLayout from "pages/Result/features/TariffsOverview/components/TariffTile/layouts/desktop/TariffTileBoxDesktopLayout";',
    );

    const violations = findLayerImportViolations(
      "app/components/TariffScore/TariffScoreDesktop/TariffScoreDesktop.tsx",
      imports,
    );

    expect(
      violations.some(
        (violation) => violation.ruleId === "components-no-page-local-ui",
      ),
    ).toBe(true);
  });
});
