#!/usr/bin/env bash
# Derive every Agent Witch Local desktop icon from the live-site logo SVG.
# Source of truth: src/app/icon.svg (matches https://www.agentwitch.com/icon.svg).
# Full-color app icons use src/app/apple-icon.svg (same mark + existing light tile).
# Menu-bar / tray glyphs use apps/desktop/assets/icon-mark-mono.svg
# (same plus+slash path data; diamond omitted + tighter viewBox for 16–24px legibility).
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MARK_SVG="${ROOT_DIR}/src/app/icon.svg"
APP_SVG="${ROOT_DIR}/src/app/apple-icon.svg"
DESKTOP_ASSETS="${ROOT_DIR}/apps/desktop/assets"
MONO_SVG="${DESKTOP_ASSETS}/icon-mark-mono.svg"
MAC_RESOURCES="${ROOT_DIR}/apps/mac/Sources/AgentWitchLocal/Resources"
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

mkdir -p "${DESKTOP_ASSETS}" "${MAC_RESOURCES}" "${MAC_ICONSET}"

render_svg() {
  rsvg-convert -w "$2" -h "$2" "$1" -o "$3"
}

# Force pure black + alpha (drop near-transparent haze).
to_template() {
  python3 - "$1" "$2" "${3:-8}" <<'PY'
import sys
from PIL import Image

src, dest, min_alpha_s = sys.argv[1], sys.argv[2], sys.argv[3]
min_alpha = int(min_alpha_s)
im = Image.open(src).convert("RGBA")
out = Image.new("RGBA", im.size, (0, 0, 0, 0))
px_in, px_out = im.load(), out.load()
w, h = im.size
for y in range(h):
    for x in range(w):
        r, g, b, a = px_in[x, y]
        if a < min_alpha:
            continue
        px_out[x, y] = (0, 0, 0, a)
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

echo "Rendering mono tray / menu-bar templates from icon-mark-mono.svg…"
for size in 16 18 22 24 32 36 48 64; do
  render_svg "${MONO_SVG}" "${size}" "${TMP_DIR}/mark-${size}.png"
  to_template "${TMP_DIR}/mark-${size}.png" "${TMP_DIR}/mono-${size}.png" 8
done

cp "${TMP_DIR}/mono-32.png" "${DESKTOP_ASSETS}/icon.png"
cp "${TMP_DIR}/mono-22.png" "${DESKTOP_ASSETS}/tray-22.png"
cp "${TMP_DIR}/mono-24.png" "${DESKTOP_ASSETS}/tray-24.png"

cp "${TMP_DIR}/mono-18.png" "${MAC_RESOURCES}/MenuBarIconTemplate.png"
cp "${TMP_DIR}/mono-36.png" "${MAC_RESOURCES}/MenuBarIconTemplate@2x.png"
cp "${TMP_DIR}/mono-16.png" "${MAC_RESOURCES}/MenuBarIconTemplate16.png"
cp "${TMP_DIR}/mono-32.png" "${MAC_RESOURCES}/MenuBarIconTemplate16@2x.png"

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

// IconPNG is the Linux tray glyph: monochrome (black + alpha) derived from
// src/app/icon.svg (same mark as https://www.agentwitch.com/icon.svg).
// Full-color packaging icons live beside this file as icon-{32,48,64,128,256}.png.
//
//go:embed icon.png
var IconPNG []byte
GO

echo "Done."
echo "  Linux assets: ${DESKTOP_ASSETS}"
echo "  Mac menu bar: ${MAC_RESOURCES}"
echo "  Mac iconset:  ${MAC_ICONSET}"
echo "  Windows ico:  ${DESKTOP_ASSETS}/icon.ico"
echo "Next on macOS: iconutil -c icns -o apps/mac/AppIcon.icns apps/mac/AppIcon.iconset"
