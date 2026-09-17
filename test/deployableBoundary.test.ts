import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { collectTypeScriptImportStrings } from "./lib/collectTypeScriptImportStrings";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const SHARED_SRC = path.join(APP_ROOT, "packages/shared/src");
const AWI_FEATURES = path.join(APP_ROOT, "apps/install/features");
const AWB_FEATURES = path.join(APP_ROOT, "apps/bridge/features");
const AWB_ADAPTERS = path.join(APP_ROOT, "apps/bridge/adapters");

const isForbiddenAwiImport = (specifier: string): boolean => {
  if (specifier.startsWith("@/features/")) {
    return true;
  }
  if (specifier.includes("src/features/")) {
    return true;
  }
  if (specifier.startsWith("@/") && !specifier.startsWith("@agent-witch/")) {
    return true;
  }
  if (/agentWitchLocalApp|agent-witch-wake-server/.test(specifier)) {
    return true;
  }
  return false;
};

const isForbiddenAwbFeatureImport = (specifier: string): boolean => {
  if (specifier.startsWith("@/features/")) {
    return true;
  }
  if (specifier.includes("src/features/")) {
    return true;
  }
  if (specifier.startsWith("@/") && !specifier.startsWith("@agent-witch/")) {
    return true;
  }
  if (/^src\//.test(specifier)) {
    return true;
  }
  if (
    /\/scripts\//.test(specifier) ||
    specifier.startsWith("../../../scripts")
  ) {
    return true;
  }
  return false;
};

const isForbiddenSharedImport = (specifier: string): boolean => {
  if (specifier.startsWith("@/")) {
    return true;
  }
  if (specifier.startsWith("src/")) {
    return true;
  }
  if (/^\.\.\/\.\.\/\.\.\/src\//.test(specifier)) {
    return true;
  }
  return false;
};

describe("deployable import boundaries", () => {
  it("packages/shared does not import from src/ or @/", () => {
    const imports = collectTypeScriptImportStrings(SHARED_SRC);
    const violations = imports.filter(isForbiddenSharedImport);
    expect(violations).toEqual([]);
  });

  it("apps/install/features does not import AWC feature UI (src/features)", () => {
    const imports = collectTypeScriptImportStrings(AWI_FEATURES);
    const violations = imports.filter(isForbiddenAwiImport);
    expect(violations).toEqual([]);
  });

  it("AWI starter slices only depend on @agent-witch/shared or relative paths", () => {
    const imports = collectTypeScriptImportStrings(AWI_FEATURES);
    const external = imports.filter(
      (specifier) =>
        specifier.startsWith("@") && !specifier.startsWith("@agent-witch/"),
    );
    expect(external).toEqual([]);
  });

  it("apps/bridge/features does not import AWC or scripts/ directly", () => {
    const imports = collectTypeScriptImportStrings(AWB_FEATURES);
    const violations = imports.filter(isForbiddenAwbFeatureImport);
    expect(violations).toEqual([]);
  });

  it("apps/bridge/adapters may import scripts/ but not src/features", () => {
    const imports = collectTypeScriptImportStrings(AWB_ADAPTERS);
    const violations = imports.filter(
      (specifier) =>
        specifier.startsWith("@/features/") ||
        specifier.includes("src/features/") ||
        (specifier.startsWith("@/") && !specifier.startsWith("@agent-witch/")),
    );
    expect(violations).toEqual([]);
  });
});
