/** Served at GET /install/agent-witch-local-wake.sh — legacy URL, no longer installs a receiver. */
export const LOCAL_WAKE_INSTALLER_DEPRECATED_MESSAGE =
  "The AgentWitch local wake receiver (cloudflared tunnel) is deprecated. " +
  "Use inbox polling instead: delivery_mode poll (Checks on demand) — poll list_project_inbox about every 60s after Approve; see your project join prompt step 7.";

export const renderLocalWakeDeprecatedInstallScript = (): string =>
  `#!/usr/bin/env bash
set -euo pipefail
echo "${LOCAL_WAKE_INSTALLER_DEPRECATED_MESSAGE}" >&2
exit 1
`;
