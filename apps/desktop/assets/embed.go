package assets

import _ "embed"

// IconPNG is the Linux tray glyph: monochrome (black + alpha) derived from
// src/app/icon.svg (same mark as https://www.agentwitch.com/icon.svg).
// Full-color packaging icons live beside this file as icon-{32,48,64,128,256}.png.
//
//go:embed icon.png
var IconPNG []byte
