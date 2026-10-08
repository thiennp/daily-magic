#!/usr/bin/env bash
# Reproducible AgentWitchLocal.app + UDZO dmg (macOS only).
#
# Signing (scripts/mac/signing/, docs/agent-witch/awl-mac-signing-notarization.md):
#   default / AWL_MAC_SIGNING=auto  Loads ~/.agentwitch-signing/signing.env when
#                                   present; Developer ID + notarize + staple when
#                                   creds exist; otherwise logged ad-hoc fallback.
#                                   If signing.env loaded but incomplete: fail.
#   --adhoc  / AWL_MAC_SIGNING=adhoc         force ad-hoc (local dev only).
#   AWL_MAC_SIGNING=developer-id             fail unless credentials exist.
#   --dry-run  real ad-hoc build + hardened-runtime ad-hoc sign + local verify;
#              prints the Developer ID / notarytool / stapler commands (masked).
set -euo pipefail
set +x

AWL_MAC_SIGNING_REQUESTED="${AWL_MAC_SIGNING:-auto}"
AWL_SIGN_DRY_RUN=0
for arg in "$@"; do
  case "${arg}" in
    --dry-run) AWL_SIGN_DRY_RUN=1 ;;
    --adhoc) AWL_MAC_SIGNING_REQUESTED="adhoc" ;;
    -h | --help)
      sed -n '2,12p' "${BASH_SOURCE[0]}"
      exit 0
      ;;
    *)
      echo "Unknown argument: ${arg} (use --dry-run, --adhoc or --help)." >&2
      exit 1
      ;;
  esac
done
export AWL_SIGN_DRY_RUN

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

# shellcheck source=signing/runAwlMacSigningPipeline.sh
source "${ROOT_DIR}/scripts/mac/signing/runAwlMacSigningPipeline.sh"
awl_sign_init "${ROOT_DIR}" "${AWL_MAC_SIGNING_REQUESTED}"

VERSION="$(node -p "require('${ROOT_DIR}/package.json').version" 2>/dev/null || echo "0.2.7")"
# GITHUB_RUN_NUMBER is a leftover from the removed mac-app.yml workflow; local builds get 1 unless it is exported.
BUILD_NUMBER="${GITHUB_RUN_NUMBER:-1}"

echo "Building ${APP_NAME} ${VERSION} (${BUILD_NUMBER})…"
rm -rf "${DIST_DIR}"
mkdir -p "${MACOS_DIR}" "${RESOURCES_DIR}"

swift build -c release --package-path "${PACKAGE_DIR}" --arch arm64 --arch x86_64

BIN_PATH="$(swift build -c release --package-path "${PACKAGE_DIR}" --arch arm64 --arch x86_64 --show-bin-path)/${APP_NAME}"
if [[ ! -f "${BIN_PATH}" ]]; then
  echo "Release binary missing at ${BIN_PATH}" >&2
  exit 1
fi

LIPO_INFO="$(lipo -info "${BIN_PATH}" 2>/dev/null || true)"
if [[ "${LIPO_INFO}" != *"arm64"* ]] || [[ "${LIPO_INFO}" != *"x86_64"* ]]; then
  echo "Universal binary missing arm64 and/or x86_64 (lipo -info: ${LIPO_INFO})" >&2
  exit 1
fi
echo "Universal binary OK: ${LIPO_INFO}"

cp "${BIN_PATH}" "${MACOS_DIR}/${APP_NAME}"
chmod +x "${MACOS_DIR}/${APP_NAME}"

# Menu-bar template PNGs live in apps/mac/Resources/ (outside the Swift
# target Sources) and are copied straight into Contents/Resources. Loaded via
# Bundle.main — not SPM Bundle.module (which fatalErrors when missing).
MENUBAR_RES_DIR="${PACKAGE_DIR}/Resources"
for menubar_png in MenuBarIconTemplate.png "MenuBarIconTemplate@2x.png"; do
  if [[ ! -f "${MENUBAR_RES_DIR}/${menubar_png}" ]]; then
    echo "Missing menu-bar template ${MENUBAR_RES_DIR}/${menubar_png}" >&2
    exit 1
  fi
  cp "${MENUBAR_RES_DIR}/${menubar_png}" "${RESOURCES_DIR}/${menubar_png}"
done

ICONSET_DIR="${PACKAGE_DIR}/AppIcon.iconset"
ICNS_PATH="${PACKAGE_DIR}/AppIcon.icns"
if [[ ! -f "${ICNS_PATH}" ]]; then
  if [[ -d "${ICONSET_DIR}" ]] && command -v iconutil >/dev/null 2>&1; then
    echo "Building AppIcon.icns via iconutil…"
    iconutil -c icns -o "${ICNS_PATH}" "${ICONSET_DIR}"
  else
    echo "Missing ${ICNS_PATH} (and cannot run iconutil)." >&2
    exit 1
  fi
fi
cp "${ICNS_PATH}" "${RESOURCES_DIR}/AppIcon.icns"

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
  <key>CFBundleIconFile</key>
  <string>AppIcon</string>
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

# Ad-hoc (legacy) or Developer ID inside-out sign; Developer ID also
# notarizes + staples the app before it goes into the DMG.
awl_sign_stage_app "${APP_DIR}" "${DIST_DIR}"

DMG_PATH="${DIST_DIR}/${DMG_NAME}"
rm -f "${DMG_PATH}" "${DMG_PATH}.sha256"

hdiutil create \
  -volname "Agent Witch Local" \
  -srcfolder "${STAGE_DIR}" \
  -ov \
  -format UDZO \
  "${DMG_PATH}"

# Developer ID: sign + notarize + staple the DMG (dry-run prints these steps).
awl_sign_dmg "${DMG_PATH}"

# Deterministic checksum files next to the artifacts (after stapling).
(
  cd "${DIST_DIR}"
  shasum -a 256 "${DMG_NAME}" | awk '{print $1 "  " $2}' > "${DMG_NAME}.sha256"
  if [[ -f AgentWitchLocal.zip ]]; then
    shasum -a 256 AgentWitchLocal.zip | awk '{print $1 "  " $2}' > AgentWitchLocal.zip.sha256
  fi
)

echo "Wrote ${DMG_PATH}"
echo "Wrote ${DMG_PATH}.sha256"
cat "${DMG_PATH}.sha256"
if [[ -f "${DIST_DIR}/AgentWitchLocal.zip" ]]; then
  echo "Wrote ${DIST_DIR}/AgentWitchLocal.zip"
  cat "${DIST_DIR}/AgentWitchLocal.zip.sha256"
fi
awl_log "Signing mode used: ${AWL_SIGN_MODE}."
if [[ "${AWL_SIGN_MODE}" == "dry-run" ]]; then
  awl_log "Dry-run artifacts are ad-hoc signed and NOT notarized: do not publish them."
fi
