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
