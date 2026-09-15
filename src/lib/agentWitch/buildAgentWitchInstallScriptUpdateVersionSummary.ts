import { buildAgentWitchInstallVersionUrl } from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";

const readBundleVersionFromJsonFileNode = `
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (typeof parsed.bundleVersion === 'string' && parsed.bundleVersion.trim().length > 0) {
    process.stdout.write(parsed.bundleVersion.trim());
  }
} catch {}
`;

const readBundleVersionFromJsonStdinNode = `
const fs = require('node:fs');
try {
  const parsed = JSON.parse(fs.readFileSync(0, 'utf8'));
  if (typeof parsed.bundleVersion === 'string' && parsed.bundleVersion.trim().length > 0) {
    process.stdout.write(parsed.bundleVersion.trim());
  }
} catch {}
`;

export const buildAgentWitchInstallScriptUpdateVersionSummary = (
  appOrigin: string,
): string => `
agent_witch_print_update_version_summary() {
  local current_version="unknown"
  local target_version="unknown"

  if [[ -f "\${INSTALL_DIR}/install-version.json" ]]; then
    current_version="\$( "\${NODE_BIN}" -e "${readBundleVersionFromJsonFileNode.trim()}" "\${INSTALL_DIR}/install-version.json" )"
    if [[ -z "\${current_version}" ]]; then
      current_version="unknown"
    fi
  fi

  target_version="\$( "\${CURL_BIN}" -fsSL "${buildAgentWitchInstallVersionUrl(appOrigin)}" | "\${NODE_BIN}" -e "${readBundleVersionFromJsonStdinNode.trim()}" )"
  if [[ -z "\${target_version}" ]]; then
    target_version="unknown"
  fi

  echo "Current version: \${current_version}"
  echo "Updating to: \${target_version}"
}
`;
