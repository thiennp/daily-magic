import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/** More specific `@agent-witch/shared/*` keys must come before the package root. */
export const vitestResolveAlias: Record<string, string> = {
  "@agent-witch/shared/network": path.resolve(
    ROOT,
    "./packages/shared/src/network/index.ts",
  ),
  "@agent-witch/shared/protocol": path.resolve(
    ROOT,
    "./packages/shared/src/protocol/index.ts",
  ),
  "@agent-witch/shared/deployables": path.resolve(
    ROOT,
    "./packages/shared/src/deployables/index.ts",
  ),
  "@agent-witch/shared": path.resolve(ROOT, "./packages/shared/src/index.ts"),
  "@agent-witch/install-layout/types": path.resolve(
    ROOT,
    "./apps/install/features/install-layout/public-api/types.ts",
  ),
  "@agent-witch/install-layout": path.resolve(
    ROOT,
    "./apps/install/features/install-layout/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-bundle/types": path.resolve(
    ROOT,
    "./apps/install/features/bundle/public-api/types.ts",
  ),
  "@agent-witch/install-bundle": path.resolve(
    ROOT,
    "./apps/install/features/bundle/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-macos-launch/types": path.resolve(
    ROOT,
    "./apps/install/features/macos-launch/public-api/types.ts",
  ),
  "@agent-witch/install-macos-launch": path.resolve(
    ROOT,
    "./apps/install/features/macos-launch/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-watchdog/types": path.resolve(
    ROOT,
    "./apps/install/features/watchdog/public-api/types.ts",
  ),
  "@agent-witch/install-watchdog": path.resolve(
    ROOT,
    "./apps/install/features/watchdog/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-runtime-client/types": path.resolve(
    ROOT,
    "./apps/install/features/runtime-client/public-api/types.ts",
  ),
  "@agent-witch/install-runtime-client": path.resolve(
    ROOT,
    "./apps/install/features/runtime-client/public-api/infrastructure.ts",
  ),
  "@": path.resolve(ROOT, "./src"),
};
