# Apps layout (AWC, AWL, AWB, AWI)

Target home for the four AgentWitch **deployables**. Code still lives mostly under `src/` and `scripts/` until migration PRs land.

| Abbr | Folder                 | Name                |
| ---- | ---------------------- | ------------------- |
| AWC  | [`console/`](console/) | AgentWitch Cloud   |
| AWL  | [`live/`](live/)       | AgentWitch Local   |
| AWB  | [`bridge/`](bridge/)   | AgentWitch Bridge  |
| AWI  | [`install/`](install/) | AgentWitch Install |

Canonical doc: [docs/product/agent-witch-deployables.md](../docs/product/agent-witch-deployables.md).  
Registry: [`deployables.registry.json`](deployables.registry.json).

## Companion surfaces

| Folder | Purpose |
| ------ | ------- |
| [`mac/`](mac/) | Unsigned SwiftUI menu bar app that starts/stops the existing AWI LaunchAgent (not a fifth deployable id). |
