import { LOCAL_WAKE_RECEIVER_SOURCE } from "@/lib/agentWitch/localWake/localWakeReceiverSource";

/** `§{` stands for a shell `${` so the template literal does not interpolate it. */
const shell = (template: string): string => template.replaceAll("§{", "${");

const INSTALLER_TEMPLATE = `#!/usr/bin/env bash
# AgentWitch local wake receiver — wakes THIS agent on a Mac instead of polling list_project_inbox.
# Usage: curl -fsSL <origin>/install/agent-witch-local-wake.sh | bash -s -- \\
#          --project-id <id> --wake-command '<command>' [--token-file <path>]
#        ... | bash -s -- --project-id <id> --uninstall
# The agent-access token is read from --token-file or $AGENTWITCH_TOKEN. It is never a CLI argument.
# $AGENTWITCH_WAKE_PROMPT_FILE holds the wake prompt when the wake command runs, e.g.
#   --wake-command 'cursor-agent -p "$(cat "$AGENTWITCH_WAKE_PROMPT_FILE")"'
#   --wake-command 'claude -p "$(cat "$AGENTWITCH_WAKE_PROMPT_FILE")"'
set -euo pipefail

APP_ORIGIN='__APP_ORIGIN__'
PROJECT_ID=""
WAKE_COMMAND=""
TOKEN_FILE=""
UNINSTALL=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --project-id) PROJECT_ID="$2"; shift 2 ;;
    --wake-command) WAKE_COMMAND="$2"; shift 2 ;;
    --token-file) TOKEN_FILE="$2"; shift 2 ;;
    --uninstall) UNINSTALL=1; shift ;;
    *) echo "Unknown argument: $1" >&2; exit 2 ;;
  esac
done

[[ -n "$PROJECT_ID" ]] || { echo "--project-id is required" >&2; exit 2; }
[[ "$PROJECT_ID" =~ ^[A-Za-z0-9_-]+$ ]] || { echo "invalid --project-id" >&2; exit 2; }

DIR="$HOME/.agent-witch/local-wake/$PROJECT_ID"
LABEL="com.agentwitch.local-wake.$PROJECT_ID"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
DOMAIN="gui/$(id -u)"

if [[ "$UNINSTALL" == 1 ]]; then
  launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
  rm -f "$PLIST"
  rm -rf "$DIR"
  echo "Removed local wake receiver for $PROJECT_ID."
  exit 0
fi

[[ "$(uname -s)" == "Darwin" ]] || { echo "macOS only (launchd)." >&2; exit 1; }
[[ -n "$WAKE_COMMAND" ]] || { echo "--wake-command is required" >&2; exit 2; }
NODE_BIN="$(command -v node || true)"
[[ -n "$NODE_BIN" ]] || { echo "Node.js 18+ is required." >&2; exit 1; }
if ! command -v cloudflared >/dev/null 2>&1 && ! command -v docker >/dev/null 2>&1; then
  echo "Install cloudflared (brew install cloudflared) or Docker first." >&2
  exit 1
fi

TOKEN="§{AGENTWITCH_TOKEN:-}"
if [[ -z "$TOKEN" && -n "$TOKEN_FILE" ]]; then
  TOKEN="$(tr -d '\\n' <"$TOKEN_FILE")"
fi
[[ -n "$TOKEN" ]] || { echo "Provide the agent-access token via --token-file or AGENTWITCH_TOKEN." >&2; exit 1; }

mkdir -p "$DIR"
chmod 700 "$DIR"
umask 077
printf '%s\\n' "$TOKEN" >"$DIR/token.env"

PORT=$((39000 + RANDOM % 1000))
"$NODE_BIN" -e '
  const [file, projectId, appOrigin, wakeCommand, port] = process.argv.slice(1);
  require("node:fs").writeFileSync(file, JSON.stringify({ projectId, appOrigin, wakeCommand, port: Number(port) }, null, 2));
' "$DIR/config.json" "$PROJECT_ID" "$APP_ORIGIN" "$WAKE_COMMAND" "$PORT"

cat >"$DIR/receiver.mjs" <<'AGENTWITCH_RECEIVER_EOF'
__RECEIVER_SOURCE__
AGENTWITCH_RECEIVER_EOF

mkdir -p "$HOME/Library/LaunchAgents"
cat >"$PLIST" <<PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key><array><string>$NODE_BIN</string><string>$DIR/receiver.mjs</string></array>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$(dirname "$NODE_BIN")</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>30</integer>
  <key>StandardOutPath</key><string>$DIR/launchd.out.log</string>
  <key>StandardErrorPath</key><string>$DIR/launchd.err.log</string>
</dict></plist>
PLIST_EOF

launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
launchctl bootstrap "$DOMAIN" "$PLIST"

echo "Local wake receiver installed for project $PROJECT_ID."
echo "It registers its own tunnel URL with AgentWitch on every start. Check: tail $DIR/receiver.log"
echo "Stop polling list_project_inbox on a timer. Remove with --uninstall."
`;

export const renderLocalWakeInstallScript = (origin: string): string =>
  shell(INSTALLER_TEMPLATE)
    .replace("__APP_ORIGIN__", origin.replace(/\/$/, ""))
    .replace("__RECEIVER_SOURCE__", () => LOCAL_WAKE_RECEIVER_SOURCE.trimEnd());
