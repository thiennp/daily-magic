#!/usr/bin/env bash
# Stage Agent Witch Local Windows/WSL packaging into dist/windows/*.zip.
# Mirrors scripts/linux/build-awl-linux-packages.sh (manual release only).
#
# Current apps/desktop is linux-only (platform_linux.go / platform_stub.go).
# A GOOS=windows binary from today's tree exits immediately with:
#   "this build only supports Linux (use the Linux package)"
# Do NOT ship that stub as a release asset. This script:
#   1) Documents the intended zip layout (WSL-oriented .exe + icon + README)
#   2) Cross-compiles when ALLOW_STUB_EXE=1 (dev probe only)
#   3) Always writes the zip scaffolding + release notes that CAN ship once a
#      real windows/WSL backend exists
#
# Real .exe build host (when windows backend lands):
#   - Preferred: Windows 10/11 + Go 1.24+ + WSL2 (Ubuntu) with AWL installed
#   - Alternate: any host with GOOS=windows GOARCH=amd64 CGO_ENABLED=0 if
#     fyne.io/systray stays pure-Go for windows; otherwise build ON Windows
#     (CGO / Windows SDK as required by the systray backend)
#   - Mac alone is not required for the .exe; Mac is for suite/CI lock + push
#
# Tag plan (do not create until Arch SHIP + suite green + Lead GO):
#   awl-windows-v0.1.0
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DESKTOP_DIR="${ROOT_DIR}/apps/desktop"
DIST_DIR="${ROOT_DIR}/dist/windows"
VERSION="0.1.0"
APP_NAME="agent-witch-local"
DISPLAY_NAME="Agent Witch Local"
EXE_NAME="AgentWitchLocal.exe"
ZIP_NAME="AgentWitchLocal-windows-amd64-v${VERSION}.zip"
STAGE_DIR="${DIST_DIR}/stage"
ALLOW_STUB_EXE="${ALLOW_STUB_EXE:-0}"

export GOFLAGS="${GOFLAGS:--p=1}"
export GOMAXPROCS="${GOMAXPROCS:-2}"
export GOMEMLIMIT="${GOMEMLIMIT:-700MiB}"
export CGO_ENABLED=0

if ! command -v go >/dev/null 2>&1; then
  echo "go is required." >&2
  exit 1
fi

zip_dir() {
  local src="$1" dest="$2"
  if command -v zip >/dev/null 2>&1; then
    ( cd "${src}" && zip -9 -r "${dest}" . )
  else
    python3 - "${src}" "${dest}" <<'PYZIP'
import sys, zipfile
from pathlib import Path
src, dest = Path(sys.argv[1]), Path(sys.argv[2])
with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
    for p in sorted(src.rglob("*")):
        if p.is_file():
            zf.write(p, p.relative_to(src).as_posix())
print(f"Wrote {dest} via python zipfile")
PYZIP
  fi
}
if ! command -v zip >/dev/null 2>&1 && ! command -v python3 >/dev/null 2>&1; then
  echo "zip or python3 is required." >&2
  exit 1
fi

ICON_ICO="${DESKTOP_DIR}/assets/icon.ico"
if [[ ! -f "${ICON_ICO}" ]]; then
  echo "Missing ${ICON_ICO} (run scripts/agentWitchLocal/generateDesktopIcons.sh)." >&2
  exit 1
fi

echo "Staging ${DISPLAY_NAME} Windows/WSL ${VERSION}…"
rm -rf "${DIST_DIR}"
mkdir -p "${STAGE_DIR}" "${DIST_DIR}/bin"

HAVE_EXE=0
if [[ "${ALLOW_STUB_EXE}" == "1" ]]; then
  echo "ALLOW_STUB_EXE=1 — cross-compiling stub .exe (NOT for release)…"
  (
    cd "${DESKTOP_DIR}"
    GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" \
      -o "${DIST_DIR}/bin/${EXE_NAME}" \
      ./cmd/agent-witch-local
  )
  cp "${DIST_DIR}/bin/${EXE_NAME}" "${STAGE_DIR}/${EXE_NAME}"
  HAVE_EXE=1
else
  echo "Skipping .exe build (set ALLOW_STUB_EXE=1 to probe today's linux-only stub)."
  echo "Real .exe needs apps/desktop windows/WSL backend (see README in stage)."
fi

cp "${ICON_ICO}" "${STAGE_DIR}/icon.ico"

cat > "${STAGE_DIR}/README.txt" <<README
${DISPLAY_NAME} — Windows / WSL companion (v${VERSION})

Status
------
This zip is the packaging stage for tag awl-windows-v0.1.0.
The Linux tray lives in apps/desktop (systemd --user). Windows is not wired yet:
cmd/agent-witch-local/platform_stub.go rejects non-Linux builds.

Intended use (once a real .exe ships)
-------------------------------------
1. Install Agent Witch Local inside WSL2 (Ubuntu recommended):
     curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
2. Keep WSL running.
3. Run AgentWitchLocal.exe on the Windows host (unsigned; SmartScreen may warn).
   The tray will drive the WSL install via wsl.exe (planned), same role as the
   Linux tray vs systemd.

Assets
------
- icon.ico — staged Windows icon (from apps/desktop/assets/icon.ico)
- AgentWitchLocal.exe — present only when built with a real windows backend
  (or ALLOW_STUB_EXE=1 for a non-functional stub that prints a Linux-only error)

Build host for a real .exe
--------------------------
Windows 10/11 amd64 with Go 1.24+, after a windows/WSL Platform backend lands
in apps/desktop. Cross-compile from Linux/macOS may work with
  GOOS=windows GOARCH=amd64 CGO_ENABLED=0
when systray stays pure-Go; otherwise build on Windows.

Do not create the GitHub release/tag until Arch SHIP + suite green + Lead GO.
README

cat > "${STAGE_DIR}/WSL-RUNNER.txt" <<'WSL'
WSL runner (no Windows .exe required)
=====================================
Until the Windows tray exists, run the Linux tray INSIDE WSL after installing
AWL there, or use systemctl --user directly:

  # Inside WSL
  curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
  systemctl --user enable --now agent-witch.service
  systemctl --user status agent-witch.service

Optional: download the Linux AppImage/deb from awl-linux-v0.1.0 and run that
tray inside WSL (needs a desktop/WSLg session for the icon).

From Windows PowerShell, without a tray:

  wsl.exe -e bash -lc 'systemctl --user is-active agent-witch.service'
  wsl.exe -e bash -lc 'systemctl --user enable --now agent-witch.service'
  wsl.exe -e bash -lc 'systemctl --user disable --now agent-witch.service'
WSL

# Optional notes file for the GitHub release body
cp "${ROOT_DIR}/docs/release-notes-awl-windows-v0.1.0.md" \
  "${STAGE_DIR}/RELEASE-NOTES.md" 2>/dev/null || true

zip_dir "${STAGE_DIR}" "${DIST_DIR}/${ZIP_NAME}"

(
  cd "${DIST_DIR}"
  sha256sum "${ZIP_NAME}" | awk '{print $1 "  " $2}' > "${ZIP_NAME}.sha256"
)

echo "Wrote ${DIST_DIR}/${ZIP_NAME}"
echo "Wrote ${DIST_DIR}/${ZIP_NAME}.sha256"
if [[ "${HAVE_EXE}" -eq 1 ]]; then
  echo "Included stub ${EXE_NAME} (ALLOW_STUB_EXE=1) — do not attach to a public release."
else
  echo "Zip has icon + docs only (no .exe). Expected until windows backend lands."
fi
cat "${DIST_DIR}/${ZIP_NAME}.sha256"
