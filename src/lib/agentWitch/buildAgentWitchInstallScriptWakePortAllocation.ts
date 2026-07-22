export const buildAgentWitchInstallScriptWakePortAllocation = (): string => `
AGENT_WITCH_WAKE_PORT="$("\${NODE_BIN}" -e "
const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');
const installDir = process.argv[1];
const portFile = path.join(installDir, 'wake-port.json');
const readSaved = () => {
  try {
    const parsed = JSON.parse(fs.readFileSync(portFile, 'utf8'));
    if (typeof parsed.wakePort === 'number' && parsed.wakePort > 0 && parsed.wakePort <= 65535) {
      return parsed.wakePort;
    }
  } catch {}
  return null;
};
const saved = readSaved();
if (saved !== null) {
  process.stdout.write(String(saved));
  process.exit(0);
}
const allocate = () => new Promise((resolve, reject) => {
  const server = net.createServer();
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    if (address === null || typeof address === 'string') {
      server.close(() => reject(new Error('Failed to allocate wake port')));
      return;
    }
    const port = address.port;
    server.close((error) => (error ? reject(error) : resolve(port)));
  });
  server.on('error', reject);
});
allocate()
  .then((port) => {
    fs.writeFileSync(portFile, JSON.stringify({ wakePort: port }, null, 2) + '\\n');
    process.stdout.write(String(port));
  })
  .catch(() => process.exit(1));
" "\${INSTALL_DIR}")"
`;
