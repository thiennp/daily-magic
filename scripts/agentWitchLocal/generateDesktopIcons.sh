#!/usr/bin/env bash
# Derive every AgentWitch Local desktop icon from the live-site logo SVG.
# Source of truth: src/app/icon.svg (matches https://www.agentwitch.com/icon.svg).
# Full-color app icons use src/app/apple-icon.svg (same mark + existing light tile).
# Menu-bar / tray glyphs use apps/desktop/assets/icon-mark-mono.svg
# (same plus+slash path data; diamond omitted + tighter viewBox for 16–24px legibility).
#
# Color convention:
#   - macOS menu-bar templates: black + alpha (system tints them).
#   - Linux tray embed (icon.png / tray-22/24): white + alpha (visible on dark panels;
#     Linux systray does not tint like macOS templates).
#   - tray-dark-glyph-*.png: black + alpha kept for a future light-theme switch (unwired).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MARK_SVG="${ROOT_DIR}/src/app/icon.svg"
APP_SVG="${ROOT_DIR}/src/app/apple-icon.svg"
DESKTOP_ASSETS="${ROOT_DIR}/apps/desktop/assets"
MONO_SVG="${DESKTOP_ASSETS}/icon-mark-mono.svg"
MAC_RESOURCES="${ROOT_DIR}/apps/mac/Resources"
MAC_ICONSET="${ROOT_DIR}/apps/mac/AppIcon.iconset"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

need() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required tool: $1" >&2
    exit 1
  }
}

need rsvg-convert
need python3

for f in "${MARK_SVG}" "${APP_SVG}" "${MONO_SVG}"; do
  if [[ ! -f "${f}" ]]; then
    echo "Missing SVG: ${f}" >&2
    exit 1
  fi
done

# Keep mono mark paths in lockstep with the live-site logo SVG (plus + slash).
python3 - "${MARK_SVG}" "${MONO_SVG}" <<'PY'
import re
import sys
from pathlib import Path

mark = Path(sys.argv[1]).read_text()
mono = Path(sys.argv[2]).read_text()


def path_ds(svg: str):
    return re.findall(r'\bd="([^"]+)"', svg)


mark_ds = path_ds(mark)
mono_ds = path_ds(mono)
# icon.svg: diamond, plus, slash — mono keeps plus + slash only.
if len(mark_ds) < 3:
    raise SystemExit(f"expected >=3 path d= in {sys.argv[1]}, got {mark_ds!r}")
plus, slash = mark_ds[1], mark_ds[2]
if mono_ds != [plus, slash]:
    raise SystemExit(
        "icon-mark-mono.svg path d= drifted from src/app/icon.svg plus/slash:\n"
        f"  icon.svg plus/slash = {[plus, slash]!r}\n"
        f"  mono.svg paths      = {mono_ds!r}"
    )
print("OK: icon-mark-mono.svg plus/slash paths match src/app/icon.svg")
PY

mkdir -p "${DESKTOP_ASSETS}" "${MAC_RESOURCES}" "${MAC_ICONSET}"

render_svg() {
  rsvg-convert -w "$2" -h "$2" "$1" -o "$3"
}

# Force pure RGB + alpha (drop near-transparent haze).
# Usage: to_mono_glyph SRC DEST R G B [min_alpha]
to_mono_glyph() {
  python3 - "$1" "$2" "$3" "$4" "$5" "${6:-8}" <<'PY'
import sys
from PIL import Image

src, dest = sys.argv[1], sys.argv[2]
r0, g0, b0 = int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
min_alpha = int(sys.argv[6])
im = Image.open(src).convert("RGBA")
out = Image.new("RGBA", im.size, (0, 0, 0, 0))
px_in, px_out = im.load(), out.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        _r, _g, _b, a = px_in[x, y]
        if a < min_alpha:
            continue
        px_out[x, y] = (r0, g0, b0, a)
out.save(dest, format="PNG", optimize=True)
PY
}

echo "Rendering full-color app icons from apple-icon.svg…"
for size in 16 24 32 48 64 128 256 512 1024; do
  render_svg "${APP_SVG}" "${size}" "${TMP_DIR}/app-${size}.png"
done

cp "${TMP_DIR}/app-32.png" "${DESKTOP_ASSETS}/icon-32.png"
cp "${TMP_DIR}/app-48.png" "${DESKTOP_ASSETS}/icon-48.png"
cp "${TMP_DIR}/app-64.png" "${DESKTOP_ASSETS}/icon-64.png"
cp "${TMP_DIR}/app-128.png" "${DESKTOP_ASSETS}/icon-128.png"
cp "${TMP_DIR}/app-256.png" "${DESKTOP_ASSETS}/icon-256.png"

echo "Rendering mono tray / menu-bar glyphs from icon-mark-mono.svg…"
for size in 16 18 22 24 32 36 48 64; do
  render_svg "${MONO_SVG}" "${size}" "${TMP_DIR}/mark-${size}.png"
  to_mono_glyph "${TMP_DIR}/mark-${size}.png" "${TMP_DIR}/black-${size}.png" 0 0 0 8
  to_mono_glyph "${TMP_DIR}/mark-${size}.png" "${TMP_DIR}/white-${size}.png" 255 255 255 8
done

# Linux tray embed: WHITE on transparency (dark GNOME/Ubuntu panels).
cp "${TMP_DIR}/white-32.png" "${DESKTOP_ASSETS}/icon.png"
cp "${TMP_DIR}/white-22.png" "${DESKTOP_ASSETS}/tray-22.png"
cp "${TMP_DIR}/white-24.png" "${DESKTOP_ASSETS}/tray-24.png"

# Black glyphs kept for a future light-theme tray (not wired).
cp "${TMP_DIR}/black-22.png" "${DESKTOP_ASSETS}/tray-dark-glyph-22.png"
cp "${TMP_DIR}/black-24.png" "${DESKTOP_ASSETS}/tray-dark-glyph-24.png"
cp "${TMP_DIR}/black-32.png" "${DESKTOP_ASSETS}/tray-dark-glyph-32.png"

# macOS menu-bar templates: BLACK (system tints). Staged into the .app by
# build-awl-mac-dmg.sh from apps/mac/Resources/ (not SPM Bundle.module).
mkdir -p "${MAC_RESOURCES}"
cp "${TMP_DIR}/black-18.png" "${MAC_RESOURCES}/MenuBarIconTemplate.png"
cp "${TMP_DIR}/black-36.png" "${MAC_RESOURCES}/MenuBarIconTemplate@2x.png"
rm -f "${MAC_RESOURCES}/MenuBarIconTemplate16.png" \
      "${MAC_RESOURCES}/MenuBarIconTemplate16@2x.png"

echo "Building macOS AppIcon.iconset PNGs…"
cp "${TMP_DIR}/app-16.png"   "${MAC_ICONSET}/icon_16x16.png"
cp "${TMP_DIR}/app-32.png"   "${MAC_ICONSET}/diana.p@example.org"
cp "${TMP_DIR}/app-32.png"   "${MAC_ICONSET}/icon_32x32.png"
cp "${TMP_DIR}/app-64.png"   "${MAC_ICONSET}/ivan.p@example.net"
cp "${TMP_DIR}/app-128.png"  "${MAC_ICONSET}/icon_128x128.png"
cp "${TMP_DIR}/app-256.png"  "${MAC_ICONSET}/wendy.h@example.net"
cp "${TMP_DIR}/app-256.png"  "${MAC_ICONSET}/icon_256x256.png"
cp "${TMP_DIR}/app-512.png"  "${MAC_ICONSET}/wendy.h@example.net"
cp "${TMP_DIR}/app-512.png"  "${MAC_ICONSET}/icon_512x512.png"
cp "${TMP_DIR}/app-1024.png" "${MAC_ICONSET}/walt.e@example.net"

echo "Building Windows .ico (16/24/32/48/64/256)…"
ICO_INPUTS=(
  "${TMP_DIR}/app-16.png"
  "${TMP_DIR}/app-24.png"
  "${TMP_DIR}/app-32.png"
  "${TMP_DIR}/app-48.png"
  "${TMP_DIR}/app-64.png"
  "${TMP_DIR}/app-256.png"
)
if command -v convert >/dev/null 2>&1; then
  convert "${ICO_INPUTS[@]}" "${DESKTOP_ASSETS}/icon.ico"
elif command -v magick >/dev/null 2>&1; then
  magick "${ICO_INPUTS[@]}" "${DESKTOP_ASSETS}/icon.ico"
elif command -v icotool >/dev/null 2>&1; then
  icotool -c -o "${DESKTOP_ASSETS}/icon.ico" "${ICO_INPUTS[@]}"
else
  echo "Need convert, magick, or icotool to build icon.ico" >&2
  exit 1
fi

cat > "${DESKTOP_ASSETS}/embed.go" <<'GO'
package assets

import _ "embed"

// IconPNG is the Linux tray glyph: white + alpha (same main mark as
// src/app/icon.svg / https://www.agentwitch.com/icon.svg). White so it reads
// on dark GNOME/Ubuntu panels; Linux systray does not tint like macOS templates.
// Black variants live beside this as tray-dark-glyph-{22,24,32}.png (unwired).
// Full-color packaging icons: icon-{32,48,64,128,256}.png.
//
//go:embed icon.png
var IconPNG []byte
GO

echo "Done."
echo "  Linux tray (white): ${DESKTOP_ASSETS}/icon.png tray-22/24.png"
echo "  Linux dark-glyph (black, unwired): tray-dark-glyph-{22,24,32}.png"
echo "  Mac menu bar (black template → apps/mac/Resources): ${MAC_RESOURCES}"
echo "  Mac iconset:  ${MAC_ICONSET}"
echo "  Windows ico:  ${DESKTOP_ASSETS}/icon.ico"
echo "Next on macOS: iconutil -c icns -o apps/mac/AppIcon.icns apps/mac/AppIcon.iconset"
