import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const SOCKET_DIR = "agent-pty";

/** Short on purpose: unix socket paths are limited to ~104 bytes on macOS. */
export const agentTerminalSocketPath = (
  installDir: string,
  shellSessionId: string,
): string => path.join(installDir, SOCKET_DIR, `${shellSessionId}.sock`);

/**
 * Daemon side: hand bytes to an agent terminal owned by an `agent run`
 * launcher process. Optimistic: true when the socket file exists.
 */
export const writeToAgentTerminalSocket = (
  installDir: string,
  shellSessionId: string,
  data: string,
): boolean => {
  const socketPath = agentTerminalSocketPath(installDir, shellSessionId);
  if (!fs.existsSync(socketPath)) return false;
  const connection = net.createConnection(socketPath);
  connection.on("error", () => undefined);
  connection.end(data);
  return true;
};

/** Launcher side: receive typed input from the daemon and forward it to the PTY. */
export const listenAgentTerminalSocket = (
  installDir: string,
  shellSessionId: string,
  onInput: (data: string) => void,
): { readonly close: () => void } => {
  const socketPath = agentTerminalSocketPath(installDir, shellSessionId);
  fs.mkdirSync(path.dirname(socketPath), { recursive: true, mode: 0o700 });
  fs.rmSync(socketPath, { force: true });
  const server = net.createServer((connection) => {
    connection.setEncoding("utf8");
    connection.on("data", (chunk) => onInput(String(chunk)));
    connection.on("error", () => undefined);
  });
  server.listen(socketPath, () => fs.chmodSync(socketPath, 0o600));
  return {
    close: () => {
      server.close();
      fs.rmSync(socketPath, { force: true });
    },
  };
};
