#!/usr/bin/env bash
# Builds Agent Witch Installer.app + AgentWitch.dmg (no Terminal copy-paste required).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_DIR="${ROOT_DIR}/scripts/agent-witch-dmg"
OUT_DIR="${AGENT_WITCH_DMG_OUT_DIR:-${ROOT_DIR}/dist/agent-witch-dmg}"
STAGING_DIR="${OUT_DIR}/staging"
APP_NAME="Agent Witch Installer.app"
DMG_NAME="${AGENT_WITCH_DMG_NAME:-AgentWitch.dmg}"
ORIGIN="${AGENT_WITCH_DMG_ORIGIN:-https://www.agentwitch.com}"
BUNDLE_VERSION="${AGENT_WITCH_DMG_VERSION:-1.1.0}"

ORIGIN="${ORIGIN%/}"

# Match resolveAgentWitchAppHome(): localhost → .local-agent-witch, else .agent-witch
INSTALL_DIR_NAME=".agent-witch"
if [[ "${ORIGIN}" == *"localhost"* ]] || [[ "${ORIGIN}" == *"127.0.0.1"* ]]; then
  INSTALL_DIR_NAME=".local-agent-witch"
fi

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "error: DMG packaging requires macOS (hdiutil)." >&2
  exit 1
fi

echo "Building Agent Witch DMG"
echo "  origin:  ${ORIGIN}"
echo "  home:    ~/${INSTALL_DIR_NAME}"
echo "  version: ${BUNDLE_VERSION}"
echo "  out:     ${OUT_DIR}/${DMG_NAME}"

rm -rf "${OUT_DIR}"
mkdir -p "${STAGING_DIR}/${APP_NAME}/Contents/MacOS"
mkdir -p "${STAGING_DIR}/${APP_NAME}/Contents/Resources"

sed \
  -e "s|__AGENT_WITCH_ORIGIN__|${ORIGIN}|g" \
  -e "s|__AGENT_WITCH_INSTALL_DIR_NAME__|${INSTALL_DIR_NAME}|g" \
  "${TEMPLATE_DIR}/MacOS/install-agent-witch.template" \
  >"${STAGING_DIR}/${APP_NAME}/Contents/MacOS/install-agent-witch"
chmod +x "${STAGING_DIR}/${APP_NAME}/Contents/MacOS/install-agent-witch"

sed \
  -e "s|__BUNDLE_VERSION__|${BUNDLE_VERSION}|g" \
  "${TEMPLATE_DIR}/Info.plist.template" \
  >"${STAGING_DIR}/${APP_NAME}/Contents/Info.plist"

# Welcome text: swap localhost origin notes when building a local DMG.
if [[ "${ORIGIN}" == *"localhost"* ]] || [[ "${ORIGIN}" == *"127.0.0.1"* ]]; then
  cat >"${STAGING_DIR}/Welcome.txt" <<EOF
Agent Witch for Mac (local)
===========================

1. Double-click "Agent Witch Installer"
2. Click Install (or Update if already installed)
3. Open ${ORIGIN} and link this Mac to your account

Installs to ~/.local-agent-witch (separate from production).
EOF
else
  sed "s|https://www.agentwitch.com|${ORIGIN}|g" \
    "${TEMPLATE_DIR}/Resources/Welcome.txt" \
    >"${STAGING_DIR}/Welcome.txt"
fi

DMG_PATH="${OUT_DIR}/${DMG_NAME}"
hdiutil create \
  -volname "Agent Witch" \
  -srcfolder "${STAGING_DIR}" \
  -ov \
  -format UDZO \
  "${DMG_PATH}"

# Keep the .app beside the DMG for local testing without mounting.
cp -R "${STAGING_DIR}/${APP_NAME}" "${OUT_DIR}/${APP_NAME}"

# Publish path used by GET /install/agent-witch.dmg
PUBLIC_INSTALL_DIR="${ROOT_DIR}/public/install"
mkdir -p "${PUBLIC_INSTALL_DIR}"
cp "${DMG_PATH}" "${PUBLIC_INSTALL_DIR}/AgentWitch.dmg"

echo
echo "Done."
echo "  DMG: ${DMG_PATH}"
echo "  App: ${OUT_DIR}/${APP_NAME}"
echo "  Web: ${PUBLIC_INSTALL_DIR}/AgentWitch.dmg"
echo
echo "Test: open \"${OUT_DIR}/${APP_NAME}\""
echo "Download URL: ${ORIGIN}/install/agent-witch.dmg"
echo "Sign/notarize before public distribution (Apple Developer ID)."
