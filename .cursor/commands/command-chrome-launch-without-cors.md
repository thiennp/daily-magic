---
name: command-chrome-launch-without-cors
description: >-
  Chrome only — web security disabled (isolated profile). Prefer command-dev-environment-notes for pnpm dev + Chrome.
---

# Chrome without dev server (macOS)

**Preferred:** **`command-dev-environment-notes.md`** — starts **`pnpm dev`** and opens Chrome without web security.

For **Chrome only** (you already have a server running):

```text
open -n -a "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

Use a dedicated **`--user-data-dir`** (never your normal profile). Adjust the application path if Chrome is installed elsewhere. See **`command-dev-environment-notes.md`** for Linux/Windows patterns.
