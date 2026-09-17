import {
  exitUnlessActiveMacOsConsoleUser,
  startActiveMacOsConsoleUserGuard,
} from "../../../scripts/guardMacOsConsoleUser";
import { startBridgeServer } from "../../bridge/features/server/public-api/infrastructure";

export const runAgentWitchBridgeCli = async (): Promise<void> => {
  exitUnlessActiveMacOsConsoleUser("agent-witch-bridge");

  const server = await startBridgeServer();

  const stopConsoleUserGuard = startActiveMacOsConsoleUserGuard(() => {
    process.stdout.write(
      "[agent-witch-bridge] Active macOS console user changed — shutting down.\n",
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
};
