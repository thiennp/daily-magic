import {
  exitUnlessActiveMacOsConsoleUser,
  isAgentWitchBundled,
  isAgentWitchScriptEntryPoint,
  startActiveMacOsConsoleUserGuard,
} from "../adapters/legacyScripts";
import { startBridgeServer } from "../features/server/public-api/infrastructure";

export {
  startAgentWitchWakeServer,
  startBridgeServer,
} from "../features/server/public-api/infrastructure";

if (!isAgentWitchBundled() && isAgentWitchScriptEntryPoint(import.meta.url)) {
  void (async () => {
    exitUnlessActiveMacOsConsoleUser("agent-witch-wake-server");

    const server = await startBridgeServer();

    const stopConsoleUserGuard = startActiveMacOsConsoleUserGuard(() => {
      process.stdout.write(
        "[agent-witch-wake-server] Active macOS console user changed — shutting down.\n",
      );
      server.close(() => {
        process.exit(0);
      });
    });

    const shutdown = (): void => {
      stopConsoleUserGuard();
      server.close(() => {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })();
}
