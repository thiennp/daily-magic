#!/usr/bin/env bash
# Reproducible unsigned Agent Witch Local Linux packages (.deb + AppImage).
# linux/amd64 only (matches the Linux installer). Memory-friendly defaults.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESKTOP_DIR="${ROOT_DIR}/apps/desktop"
DIST_DIR="${ROOT_DIR}/dist/linux"
VERSION="0.1.0"
APP_NAME="agent-witch-local"
DISPLAY_NAME="Agent Witch Local"
DEB_NAME="${APP_NAME}_${VERSION}_amd64.deb"
APPIMAGE_NAME="AgentWitchLocal-x86_64.AppImage"
CACHE_DIR="${HOME}/.cache/agent-witch-desktop"
APPIMAGETOOL_URL="https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-x86_64.AppImage"

export GOFLAGS="${GOFLAGS:--p=1}"
export GOMAXPROCS="${GOMAXPROCS:-2}"
export GOMEMLIMIT="${GOMEMLIMIT:-700MiB}"
export CGO_ENABLED=0

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "build-awl-linux-packages.sh must run on Linux (found $(uname -s))." >&2
  exit 1
fi

if ! command -v go >/dev/null 2>&1; then
  echo "go is required." >&2
  exit 1
fi

if ! command -v dpkg-deb >/dev/null 2>&1; then
  echo "dpkg-deb is required." >&2
  exit 1
fi

echo "Building ${DISPLAY_NAME} ${VERSION} (linux/amd64, CGO_ENABLED=0)…"
rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}/bin" "${CACHE_DIR}"

(
  cd "${DESKTOP_DIR}"
  GOOS=linux GOARCH=amd64 go build -trimpath -ldflags "-s -w" \
    -o "${DIST_DIR}/bin/${APP_NAME}" \
    ./cmd/agent-witch-local
)

BIN_PATH="${DIST_DIR}/bin/${APP_NAME}"
if [[ ! -f "${BIN_PATH}" ]]; then
  echo "Release binary missing at ${BIN_PATH}" >&2
  exit 1
fi
chmod +x "${BIN_PATH}"

ICON_SRC_48="${DESKTOP_DIR}/assets/icon-48.png"
ICON_SRC_256="${DESKTOP_DIR}/assets/icon-256.png"
if [[ ! -f "${ICON_SRC_48}" ]]; then
  echo "Missing icon ${ICON_SRC_48}" >&2
  exit 1
fi

DESKTOP_FILE_CONTENT=$(cat <<DESKTOP
[Desktop Entry]
Type=Application
Name=${DISPLAY_NAME}
Comment=Menu tray companion for Agent Witch Local
Exec=${APP_NAME}
Icon=${APP_NAME}
Terminal=false
Categories=Utility;
StartupNotify=false
DESKTOP
)

# --- .deb ---
DEB_ROOT="${DIST_DIR}/deb-root"
rm -rf "${DEB_ROOT}"
mkdir -p \
  "${DEB_ROOT}/DEBIAN" \
  "${DEB_ROOT}/usr/bin" \
  "${DEB_ROOT}/usr/share/applications" \
  "${DEB_ROOT}/usr/share/icons/hicolor/48x48/apps" \
  "${DEB_ROOT}/usr/share/icons/hicolor/256x256/apps" \
  "${DEB_ROOT}/usr/share/doc/${APP_NAME}"

cp "${BIN_PATH}" "${DEB_ROOT}/usr/bin/${APP_NAME}"
chmod 0755 "${DEB_ROOT}/usr/bin/${APP_NAME}"
printf '%s\n' "${DESKTOP_FILE_CONTENT}" > "${DEB_ROOT}/usr/share/applications/${APP_NAME}.desktop"
cp "${ICON_SRC_48}" "${DEB_ROOT}/usr/share/icons/hicolor/48x48/apps/${APP_NAME}.png"
cp "${ICON_SRC_256}" "${DEB_ROOT}/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"

cat > "${DEB_ROOT}/DEBIAN/control" <<CONTROL
Package: ${APP_NAME}
Version: ${VERSION}
Section: utils
Priority: optional
Architecture: amd64
Maintainer: Agent Witch <hello@agentwitch.com>
Description: Tray companion for Agent Witch Local on Linux
 Starts and stops the same Agent Witch install from the system tray.
 Requires the terminal install first, and AppIndicator on stock GNOME.
Recommends: xdg-utils
CONTROL

cat > "${DEB_ROOT}/usr/share/doc/${APP_NAME}/README" <<'README'
Agent Witch Local (Linux tray)

1. Install Agent Witch via:
   curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
2. Install this package, then start agent-witch-local from the app menu.
3. On stock GNOME, enable the AppIndicator extension so the tray icon appears.

Launch-at-login for the Agent Witch service is controlled from the tray menu
(systemctl --user enable/disable). Tray autostart (~/.config/autostart) is not
wired yet — add a desktop entry there manually if you want the tray itself at login.
README

dpkg-deb --build --root-owner-group "${DEB_ROOT}" "${DIST_DIR}/${DEB_NAME}"

# --- AppImage ---
APPDIR="${DIST_DIR}/AgentWitchLocal.AppDir"
rm -rf "${APPDIR}"
mkdir -p \
  "${APPDIR}/usr/bin" \
  "${APPDIR}/usr/share/applications" \
  "${APPDIR}/usr/share/icons/hicolor/256x256/apps"

cp "${BIN_PATH}" "${APPDIR}/usr/bin/${APP_NAME}"
chmod 0755 "${APPDIR}/usr/bin/${APP_NAME}"
# AppImage desktop Exec must be the binary name relative to AppDir
printf '%s\n' "${DESKTOP_FILE_CONTENT}" | sed "s|^Exec=.*|Exec=${APP_NAME}|" \
  > "${APPDIR}/${APP_NAME}.desktop"
cp "${APPDIR}/${APP_NAME}.desktop" "${APPDIR}/usr/share/applications/${APP_NAME}.desktop"
cp "${ICON_SRC_256}" "${APPDIR}/${APP_NAME}.png"
cp "${ICON_SRC_256}" "${APPDIR}/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"

cat > "${APPDIR}/AppRun" <<'APPRUN'
#!/bin/sh
HERE="$(dirname "$(readlink -f "$0")")"
exec "${HERE}/usr/bin/agent-witch-local" "$@"
APPRUN
chmod 0755 "${APPDIR}/AppRun"

APPIMAGETOOL="${APPIMAGETOOL:-}"
if [[ -z "${APPIMAGETOOL}" ]]; then
  APPIMAGETOOL="${CACHE_DIR}/appimagetool-x86_64.AppImage"
  if [[ ! -x "${APPIMAGETOOL}" ]]; then
    echo "Downloading appimagetool…"
    curl -fsSL -o "${APPIMAGETOOL}" "${APPIMAGETOOL_URL}"
    chmod +x "${APPIMAGETOOL}"
  fi
fi

ARCH=x86_64 "${APPIMAGETOOL}" --appimage-extract-and-run "${APPDIR}" "${DIST_DIR}/${APPIMAGE_NAME}"
chmod +x "${DIST_DIR}/${APPIMAGE_NAME}"

# --- checksums ---
(
  cd "${DIST_DIR}"
  sha256sum "${DEB_NAME}" | awk '{print $1 "  " $2}' > "${DEB_NAME}.sha256"
  sha256sum "${APPIMAGE_NAME}" | awk '{print $1 "  " $2}' > "${APPIMAGE_NAME}.sha256"
)

echo "Wrote ${DIST_DIR}/${DEB_NAME}"
echo "Wrote ${DIST_DIR}/${DEB_NAME}.sha256"
echo "Wrote ${DIST_DIR}/${APPIMAGE_NAME}"
echo "Wrote ${DIST_DIR}/${APPIMAGE_NAME}.sha256"
cat "${DIST_DIR}/${DEB_NAME}.sha256"
cat "${DIST_DIR}/${APPIMAGE_NAME}.sha256"
