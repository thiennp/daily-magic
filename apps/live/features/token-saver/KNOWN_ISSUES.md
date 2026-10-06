# token-saver — known issues

## TS-OPEN-001 — Pitfall cache is off on Node older than 22.13

The registry uses `node:sqlite` (unflagged from Node 22.13 / 23.4). `loadNodeSqlite` loads it at
first use through `process.getBuiltinModule`, so AWL still starts on Node 20 (bundle 266+;
bundle 265 crashed at load). Without it:

- `check_context` (MCP tool, `POST /api/local/check-context`, Claude hook) answers `none`, and
  logs `Pitfall cache unavailable: …`.
- The AWL Projects pitfalls tab is cloud only (no local cache, no hit counts).
- The local app logs one line at start: `Pitfall cache (check_context) is off: …`.

Fix on the machine: install Node 22.13+ (https://nodejs.org/en/download, or on macOS
`brew install node@22`), then restart AWL.
