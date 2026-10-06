/**
 * Production Windows (WSL) update/repair one-liner for Product docs and UI.
 * Paste into PowerShell or cmd; it runs /install/agent-witch-update.sh inside the
 * default WSL distro, the same way the Windows tray drives WSL (wsl.exe -e bash -lc).
 */
export const AGENT_WITCH_REPAIR_WINDOWS_COMMAND =
  'wsl.exe -e bash -lc "set -o pipefail; curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash"';
