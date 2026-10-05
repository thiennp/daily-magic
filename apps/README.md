# Apps layout (AWC, AWL, AWB, AWI)

Target home for the four Agent Witch **deployables**. Code still lives mostly under `src/` and `scripts/` until migration PRs land.

| Abbr | Folder                 | Name                |
| ---- | ---------------------- | ------------------- |
| AWC  | [`console/`](console/) | Agent Witch Cloud   |
| AWL  | [`live/`](live/)       | Agent Witch Local   |
| AWB  | [`bridge/`](bridge/)   | Agent Witch Bridge  |
| AWI  | [`install/`](install/) | Agent Witch Install |

Canonical doc: [docs/product/agent-witch-deployables.md](../docs/product/agent-witch-deployables.md).  
Registry: [`deployables.registry.json`](deployables.registry.json).

## Companion surfaces

| Folder | Purpose |
| ------ | ------- |
| [`mac/`](mac/) | Unsigned SwiftUI menu bar app that starts/stops the existing AWI LaunchAgent (not a fifth deployable id). |
