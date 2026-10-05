#!/usr/bin/env bash
# Reproducible unsigned AgentWitchLocal.app + UDZO dmg (macOS only).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PACKAGE_DIR="${ROOT_DIR}/apps/mac"
DIST_DIR="${ROOT_DIR}/dist/mac"
APP_NAME="AgentWitchLocal"
BUNDLE_ID="com.agent-witch.local-app"
DMG_NAME="AgentWitchLocal.dmg"
STAGE_DIR="${DIST_DIR}/stage"
APP_DIR="${STAGE_DIR}/${APP_NAME}.app"
CONTENTS_DIR="${APP_DIR}/Contents"
MACOS_DIR="${CONTENTS_DIR}/MacOS"
RESOURCES_DIR="${CONTENTS_DIR}/Resources"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "build-awl-mac-dmg.sh must run on macOS (found $(uname -s))." >&2
  exit 1
fi

if ! command -v swift >/dev/null 2>&1; then
  echo "swift is required." >&2
  exit 1
fi

VERSION="$(node -p "require('${ROOT_DIR}/package.json').version" 2>/dev/null || echo "0.1.0")"
BUILD_NUMBER="${GITHUB_RUN_NUMBER:-1}"

echo "Building ${APP_NAME} ${VERSION} (${BUILD_NUMBER})…"
rm -rf "${DIST_DIR}"
mkdir -p "${MACOS_DIR}" "${RESOURCES_DIR}"

swift build -c release --package-path "${PACKAGE_DIR}"

BIN_PATH="$(swift build -c release --package-path "${PACKAGE_DIR}" --show-bin-path)/${APP_NAME}"
if [[ ! -f "${BIN_PATH}" ]]; then
  echo "Release binary missing at ${BIN_PATH}" >&2
  exit 1
fi

cp "${BIN_PATH}" "${MACOS_DIR}/${APP_NAME}"
chmod +x "${MACOS_DIR}/${APP_NAME}"

cat > "${CONTENTS_DIR}/Info.plist" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>en</string>
  <key>CFBundleExecutable</key>
  <string>${APP_NAME}</string>
  <key>CFBundleIdentifier</key>
  <string>${BUNDLE_ID}</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>Agent Witch Local</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>${VERSION}</string>
  <key>CFBundleVersion</key>
  <string>${BUILD_NUMBER}</string>
  <key>LSMinimumSystemVersion</key>
  <string>13.0</string>
  <key>LSUIElement</key>
  <true/>
  <key>NSHighResolutionCapable</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>com.agent-witch.local-app.install</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>agentwitch-local</string>
      </array>
    </dict>
  </array>
</dict>
</plist>
EOF

# Ad-hoc sign (no Developer ID).
codesign --force --deep --sign - "${APP_DIR}"

DMG_PATH="${DIST_DIR}/${DMG_NAME}"
rm -f "${DMG_PATH}" "${DMG_PATH}.sha256"

hdiutil create \
  -volname "Agent Witch Local" \
  -srcfolder "${STAGE_DIR}" \
  -ov \
  -format UDZO \
  "${DMG_PATH}"

# Deterministic checksum file next to the dmg.
(
  cd "${DIST_DIR}"
  shasum -a 256 "${DMG_NAME}" | awk '{print $1 "  " $2}' > "${DMG_NAME}.sha256"
)

echo "Wrote ${DMG_PATH}"
echo "Wrote ${DMG_PATH}.sha256"
cat "${DMG_PATH}.sha256"
