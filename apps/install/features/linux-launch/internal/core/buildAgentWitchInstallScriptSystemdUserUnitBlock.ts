import {
  AGENT_WITCH_EXTERNAL_BRIDGE_ENV,
  AGENT_WITCH_EXTERNAL_LIVE_ENV,
} from "@agent-witch/install-process-host/types";

import { AGENT_WITCH_SYSTEMD_USER_UNIT_NAME } from "../../public-api/types";

/** Writes and enables a systemd user unit (v1 default); foreground when AGENT_WITCH_FOREGROUND=1. */
export const buildAgentWitchInstallScriptSystemdUserUnitBlock = (): string => `
agent_witch_install_linux_systemd_user_unit() {
  if [[ "\$(uname -s)" != "Linux" ]]; then
    return 0
  fi

  if [[ -n "\${AGENT_WITCH_FOREGROUND:-}" ]]; then
    echo "AGENT_WITCH_FOREGROUND is set — skipping systemd user unit." >&2
    nohup "\${RUN_PATH}" >/dev/null 2>&1 &
    return 0
  fi

  if ! command -v systemctl >/dev/null 2>&1; then
    echo "systemctl not found — run foreground client: \${RUN_PATH}" >&2
    return 0
  fi

  local unit_dir="\${HOME}/.config/systemd/user"
  local unit_path="\${unit_dir}/${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME}"
  mkdir -p "\${unit_dir}"

  cat > "\${unit_path}" <<EOF
[Unit]
Description=Agent Witch client
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=\${INSTALL_DIR}
Environment=HOME=\${HOME}
Environment=AGENT_WITCH_HOME=\${INSTALL_DIR}
Environment=AGENT_WITCH_WAKE_PORT=\${AGENT_WITCH_WAKE_PORT}
EOF

  if agent_witch_is_truthy_env "\${AGENT_WITCH_INSTALL_EXTERNAL_BRIDGE}"; then
    cat >> "\${unit_path}" <<EOF
Environment=${AGENT_WITCH_EXTERNAL_BRIDGE_ENV}=1
EOF
  fi
  if agent_witch_is_truthy_env "\${AGENT_WITCH_INSTALL_EXTERNAL_LIVE}"; then
    cat >> "\${unit_path}" <<EOF
Environment=${AGENT_WITCH_EXTERNAL_LIVE_ENV}=1
EOF
  fi

  cat >> "\${unit_path}" <<EOF
ExecStart=\${RUN_PATH}
Restart=on-failure
RestartSec=10

[Install]
WantedBy=default.target
EOF

  systemctl --user daemon-reload
  systemctl --user enable --now "${AGENT_WITCH_SYSTEMD_USER_UNIT_NAME}" || true
}
`;
