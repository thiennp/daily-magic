export const buildAgentWitchInstallScriptClientBlock = (): string => `
echo "Downloading Agent Witch client from \${CLIENT_SCRIPT_URL}…"
"\${CURL_BIN}" -fsSL "\${CLIENT_SCRIPT_URL}" -o "\${INSTALL_DIR}/agent-witch.ts"
"\${CURL_BIN}" -fsSL "\${RESOLVE_LAYOUT_SCRIPT_URL}" -o "\${INSTALL_DIR}/resolveAgentWitchLocalLayout.ts"
"\${CURL_BIN}" -fsSL "\${READ_HARNESS_EXPORT_SCRIPT_URL}" -o "\${INSTALL_DIR}/readHarnessExportSets.ts"

cat > "\${INSTALL_DIR}/package.json" <<EOF
{
  "name": "agent-witch",
  "private": true,
  "type": "module",
  "dependencies": {
    "ws": "^8.18.3"
  },
  "devDependencies": {
    "tsx": "^4.20.3",
    "typescript": "^5"
  }
}
EOF

echo "Installing Agent Witch dependencies in \${INSTALL_DIR}…"
(
  cd "\${INSTALL_DIR}"
  npm install --no-fund --no-audit
)

cat > "\${RUN_PATH}" <<EOF
#!/usr/bin/env bash
set -euo pipefail
export PATH="\${NODE_DIR}:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
cd "\${INSTALL_DIR}"
exec "\${NODE_BIN}" "\${TSX_CLI}" "\${INSTALL_DIR}/agent-witch.ts"
EOF
chmod +x "\${RUN_PATH}"
`;
