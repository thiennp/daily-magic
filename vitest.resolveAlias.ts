import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/** More specific `@agent-witch/shared/*` keys must come before the package root. */
export const vitestResolveAlias: Record<string, string> = {
  "@agent-witch/shared/ui": path.resolve(
    ROOT,
    "./packages/shared/src/ui/index.ts",
  ),
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
  "@agent-witch/install-layout/presentation": path.resolve(
    ROOT,
    "./apps/install/features/install-layout/public-api/presentation.ts",
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
  "@agent-witch/install-bundled-deps/types": path.resolve(
    ROOT,
    "./apps/install/features/bundled-deps/public-api/types.ts",
  ),
  "@agent-witch/install-bundled-deps": path.resolve(
    ROOT,
    "./apps/install/features/bundled-deps/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-connection-health/types": path.resolve(
    ROOT,
    "./apps/install/features/connection-health/public-api/types.ts",
  ),
  "@agent-witch/install-connection-health": path.resolve(
    ROOT,
    "./apps/install/features/connection-health/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-device-identity/types": path.resolve(
    ROOT,
    "./apps/install/features/device-identity/public-api/types.ts",
  ),
  "@agent-witch/install-device-identity": path.resolve(
    ROOT,
    "./apps/install/features/device-identity/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-self-update/types": path.resolve(
    ROOT,
    "./apps/install/features/self-update/public-api/types.ts",
  ),
  "@agent-witch/install-self-update": path.resolve(
    ROOT,
    "./apps/install/features/self-update/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-uninstall/types": path.resolve(
    ROOT,
    "./apps/install/features/uninstall/public-api/types.ts",
  ),
  "@agent-witch/install-uninstall": path.resolve(
    ROOT,
    "./apps/install/features/uninstall/public-api/infrastructure.ts",
  ),
  "@agent-witch/install-process-host/types": path.resolve(
    ROOT,
    "./apps/install/features/process-host/public-api/types.ts",
  ),
  "@agent-witch/install-process-host": path.resolve(
    ROOT,
    "./apps/install/features/process-host/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-local-server/types": path.resolve(
    ROOT,
    "./apps/live/features/local-server/public-api/types.ts",
  ),
  "@agent-witch/live-local-server/presentation": path.resolve(
    ROOT,
    "./apps/live/features/local-server/public-api/presentation.ts",
  ),
  "@agent-witch/live-local-server": path.resolve(
    ROOT,
    "./apps/live/features/local-server/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-shell/types": path.resolve(
    ROOT,
    "./apps/live/features/shell/public-api/types.ts",
  ),
  "@agent-witch/live-shell/presentation": path.resolve(
    ROOT,
    "./apps/live/features/shell/public-api/presentation.ts",
  ),
  "@agent-witch/live-shell": path.resolve(
    ROOT,
    "./apps/live/features/shell/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-home/types": path.resolve(
    ROOT,
    "./apps/live/features/home/public-api/types.ts",
  ),
  "@agent-witch/live-home/presentation": path.resolve(
    ROOT,
    "./apps/live/features/home/public-api/presentation.ts",
  ),
  "@agent-witch/live-home": path.resolve(
    ROOT,
    "./apps/live/features/home/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-tasks/types": path.resolve(
    ROOT,
    "./apps/live/features/tasks/public-api/types.ts",
  ),
  "@agent-witch/live-tasks/presentation": path.resolve(
    ROOT,
    "./apps/live/features/tasks/public-api/presentation.ts",
  ),
  "@agent-witch/live-tasks": path.resolve(
    ROOT,
    "./apps/live/features/tasks/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-projects/types": path.resolve(
    ROOT,
    "./apps/live/features/projects/public-api/types.ts",
  ),
  "@agent-witch/live-projects/presentation": path.resolve(
    ROOT,
    "./apps/live/features/projects/public-api/presentation.ts",
  ),
  "@agent-witch/live-projects": path.resolve(
    ROOT,
    "./apps/live/features/projects/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-harness/types": path.resolve(
    ROOT,
    "./apps/live/features/harness/public-api/types.ts",
  ),
  "@agent-witch/live-harness/presentation": path.resolve(
    ROOT,
    "./apps/live/features/harness/public-api/presentation.ts",
  ),
  "@agent-witch/live-harness": path.resolve(
    ROOT,
    "./apps/live/features/harness/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-knowledge/types": path.resolve(
    ROOT,
    "./apps/live/features/knowledge/public-api/types.ts",
  ),
  "@agent-witch/live-knowledge/presentation": path.resolve(
    ROOT,
    "./apps/live/features/knowledge/public-api/presentation.ts",
  ),
  "@agent-witch/live-knowledge": path.resolve(
    ROOT,
    "./apps/live/features/knowledge/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-memory/types": path.resolve(
    ROOT,
    "./apps/live/features/memory/public-api/types.ts",
  ),
  "@agent-witch/live-memory/presentation": path.resolve(
    ROOT,
    "./apps/live/features/memory/public-api/presentation.ts",
  ),
  "@agent-witch/live-memory": path.resolve(
    ROOT,
    "./apps/live/features/memory/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-writer-settings/types": path.resolve(
    ROOT,
    "./apps/live/features/writer-settings/public-api/types.ts",
  ),
  "@agent-witch/live-writer-settings/presentation": path.resolve(
    ROOT,
    "./apps/live/features/writer-settings/public-api/presentation.ts",
  ),
  "@agent-witch/live-writer-settings": path.resolve(
    ROOT,
    "./apps/live/features/writer-settings/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-status-health/types": path.resolve(
    ROOT,
    "./apps/live/features/status-health/public-api/types.ts",
  ),
  "@agent-witch/live-status-health/presentation": path.resolve(
    ROOT,
    "./apps/live/features/status-health/public-api/presentation.ts",
  ),
  "@agent-witch/live-status-health": path.resolve(
    ROOT,
    "./apps/live/features/status-health/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-diagnostics/types": path.resolve(
    ROOT,
    "./apps/live/features/diagnostics/public-api/types.ts",
  ),
  "@agent-witch/live-diagnostics/presentation": path.resolve(
    ROOT,
    "./apps/live/features/diagnostics/public-api/presentation.ts",
  ),
  "@agent-witch/live-diagnostics": path.resolve(
    ROOT,
    "./apps/live/features/diagnostics/public-api/infrastructure.ts",
  ),
  "@agent-witch/live-automations/types": path.resolve(
    ROOT,
    "./apps/live/features/automations/public-api/types.ts",
  ),
  "@agent-witch/live-automations/presentation": path.resolve(
    ROOT,
    "./apps/live/features/automations/public-api/presentation.ts",
  ),
  "@agent-witch/live-automations": path.resolve(
    ROOT,
    "./apps/live/features/automations/public-api/infrastructure.ts",
  ),
  "@": path.resolve(ROOT, "./src"),
};
